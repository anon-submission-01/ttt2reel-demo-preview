function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function dismissWarning() {
    var warning = document.getElementById('mobile-warning');
    if (warning) warning.style.display = 'none';
}

if (isMobileDevice()) {
    var warning = document.getElementById('mobile-warning');
    if (warning) warning.style.display = 'block';
}

// Playback-speed controls: each group controls every video in its section.
document.querySelectorAll('.speed-controls').forEach(function (group) {
    group.addEventListener('click', function (event) {
        var button = event.target.closest('.speed-btn');
        if (!button) return;

        var speed = parseFloat(button.dataset.speed || '1');
        group.querySelectorAll('.speed-btn').forEach(function (item) {
            item.classList.remove('active');
        });
        button.classList.add('active');

        var section = group.closest('section');
        if (!section) return;
        section.querySelectorAll('video').forEach(function (video) {
            try {
                video.playbackRate = speed;
            } catch (error) {
                // Some browsers reject playback-rate changes before metadata loads.
            }
        });
    });
});
