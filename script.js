const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const timestamp = document.getElementById('timestamp');
const progress = document.getElementById('progress');

// Toggle video play/pause status
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update play/pause icon based on video status
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play-circle"></i>'; // Play icon
    } else {
        play.innerHTML = '<i class="fa fa-pause-circle"></i>'; // Pause icon
    }
}

// Update video progress based on timeupdate event
function updateProgress() {
    const value = (video.currentTime / video.duration) * 100;
    progress.value = value;

    // Format and display timestamp (hh:mm:ss)
    const currentTime = video.currentTime;
    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);
    const seconds = Math.floor(currentTime % 60);

    timestamp.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Set video progress when the user interacts with the progress bar
function setVideoProgress() {
    const value = progress.value;
    const time = (value / 100) * video.duration;
    video.currentTime = time;
}

// Stop the video and reset to the beginning
function stopVideo() {
    video.pause();
    video.currentTime = 0;
}

// Format time to ensure two digits (e.g., 01, 02)
function pad(num) {
    return num < 10 ? '0' + num : num;
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
play.addEventListener('click', toggleVideoStatus);
progress.addEventListener('input', setVideoProgress); // Use 'input' instead of 'change'
stop.addEventListener('click', stopVideo);
