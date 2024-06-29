{
    document.addEventListener('DOMContentLoaded', () => {
        const videoPlayer = document.querySelector('.video-player video');
        const videoSource = videoPlayer.querySelector('source');
    
        const playPauseBtn = document.querySelector('.play-pause-btn');
        const rewindBtn = document.querySelector('.fa-undo-alt');
        const stepBackwardBtn = document.querySelector('.fa-step-backward');
        const stepForwardBtn = document.querySelector('.fa-step-forward');
        const forwardBtn = document.querySelector('.fa-redo-alt');
        const progressBar = document.querySelector('.progress-bar');
       const currentTimeDisplay = document.querySelector('.current-time');
const durationTimeDisplay = document.querySelector('.duration-time');
        const musicContainers = document.querySelectorAll('.music-container');
        const video = document.querySelector('video');
        const volumeSlider = document.querySelector('.volume-slider');

        let isPlaying = false;
        let currentVideoIndex = 0;
    
        // Update play/pause button
        const updatePlayPauseButton = () => {
            if (isPlaying) {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        };
        volumeSlider.addEventListener('input', (e) => {
            video.volume = e.target.value;
        });

        // Toggle play/pause
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                videoPlayer.pause();
            } else {
                videoPlayer.play();
            }
        });
    
        // Update play/pause status
        videoPlayer.addEventListener('play', () => {
            isPlaying = true;
            updatePlayPauseButton();
        });
    
        videoPlayer.addEventListener('pause', () => {
            isPlaying = false;
            updatePlayPauseButton();
        });
    
        // Rewind 10 seconds
        rewindBtn.addEventListener('click', () => {
            videoPlayer.currentTime -= 10;
        });
    
        // Play the previous video
        stepBackwardBtn.addEventListener('click', () => {
            if (currentVideoIndex > 0) {
                currentVideoIndex--;
                playVideoAtIndex(currentVideoIndex);
            }
        });
    
        // Play the next video
        stepForwardBtn.addEventListener('click', () => {
            if (currentVideoIndex < musicContainers.length - 1) {
                currentVideoIndex++;
                playVideoAtIndex(currentVideoIndex);
            }
        });
    
        // Forward 10 seconds
        forwardBtn.addEventListener('click', () => {
            videoPlayer.currentTime += 10;
        });
    
        // Update progress bar and time displays
        videoPlayer.addEventListener('timeupdate', () => {
            const currentTime = videoPlayer.currentTime;
            const duration = videoPlayer.duration;
            progressBar.value = (currentTime / duration) * 100;
        
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = formatTime(currentTime);
            }
        
            if (durationTimeDisplay) {
                durationTimeDisplay.textContent = ` / ${formatTime(duration)}`;
            }
        });
    
        // Seek video
        progressBar.addEventListener('input', () => {
            const duration = videoPlayer.duration;
            videoPlayer.currentTime = (progressBar.value / 100) * duration;
        });
    
        // Format time in MM:SS
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };
    
        // Play the video at the given index and highlight the active container
        const playVideoAtIndex = (index) => {
            const container = musicContainers[index];
            const videoFile = container.getAttribute('data-video');
            if (videoFile) {
                videoSource.src = videoFile;
                videoPlayer.load();
                videoPlayer.play();
                updateActiveContainer(index);
            }
        };
    
        // Update the active container's class
        const updateActiveContainer = (index) => {
            musicContainers.forEach((container, i) => {
                if (i === index) {
                    container.classList.add('active');
                } else {
                    container.classList.remove('active');
                }
            });
        };
    
        // Switch videos on music container click
        musicContainers.forEach((container, index) => {
            container.addEventListener('click', () => {
                currentVideoIndex = index;
                playVideoAtIndex(index);
            });
        });
    });
}