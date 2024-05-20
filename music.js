document.addEventListener('DOMContentLoaded', () => {
    const audioElements = document.querySelectorAll('.audio');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progress = document.getElementById('progress');
    const volumeControl = document.getElementById('volume');

    let currentAudio = null;

    // Function to play the specified audio
    function playAudio(audio) {
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause(); // Pause the current audio if it's playing
        }
        currentAudio = audio;
        currentAudio.play();
        playButton.textContent = 'Pause';
    }

    // Play or pause audio when play button is clicked
    playButton.addEventListener('click', () => {
        if (currentAudio && currentAudio.paused) {
            playAudio(currentAudio);
        } else {
            pauseAudio();
        }
    });

    // Play the previous audio when prev button is clicked
    prevButton.addEventListener('click', () => {
        const currentIndex = Array.from(audioElements).indexOf(currentAudio);
        const prevIndex = (currentIndex - 1 + audioElements.length) % audioElements.length;
        const prevAudio = audioElements[prevIndex];
        playAudio(prevAudio);
    });

    // Play the next audio when next button is clicked
    nextButton.addEventListener('click', () => {
        const currentIndex = Array.from(audioElements).indexOf(currentAudio);
        const nextIndex = (currentIndex + 1) % audioElements.length;
        const nextAudio = audioElements[nextIndex];
        playAudio(nextAudio);
    });

    // Update progress bar as the audio plays
    audioElements.forEach(audio => {
        audio.addEventListener('timeupdate', () => {
            const { currentTime, duration } = audio;
            const progressPercent = (currentTime / duration) * 100;
            progress.value = progressPercent;
        });
    });

    // Seek to a specific position in the audio when progress bar is adjusted
    progress.addEventListener('input', () => {
        if (currentAudio) {
            const seekTime = (progress.value / 100) * currentAudio.duration;
            currentAudio.currentTime = seekTime;
        }
    });

    // Adjust volume when volume control is changed
    volumeControl.addEventListener('input', () => {
        if (currentAudio) {
            currentAudio.volume = volumeControl.value / 100;
        }
    });

    // Function to pause the current audio
    function pauseAudio() {
        if (currentAudio) {
            currentAudio.pause();
            playButton.textContent = 'Play';
        }
    }

    // Pause the currently playing audio when another audio is clicked
    audioElements.forEach(audio => {
        audio.addEventListener('play', () => {
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0; // Rewind to the beginning
            }
            currentAudio = audio;
            playButton.textContent = 'Pause';
        });
    });
});
