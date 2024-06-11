
{
    document.addEventListener('DOMContentLoaded', () => {
        const videos = [
            { src: "backgroundvid/1amerika.mp4", duration: 259000 }, // 4:19 in milliseconds
            { src: "backgroundvid/2ichwill.mp4", duration: 246000 }, // 4:06 in milliseconds
            { src: "backgroundvid/3duhast.mp4", duration: 236000 }  // 3:56 in milliseconds
        ];
    
        let currentVideoIndex = 0;
        const videoElement = document.querySelector('#background-video video');
    
        function playNextVideo() {
            if (currentVideoIndex >= videos.length) {
                currentVideoIndex = 0;
            }
    
            const video = videos[currentVideoIndex];
            videoElement.src = video.src;
            
            // Ensure this is a video element and play is a function
            if (typeof videoElement.play === 'function') {
                videoElement.play();
            } else {
                console.error('videoElement.play is not a function');
            }
    
            setTimeout(() => {
                currentVideoIndex++;
                playNextVideo();
            }, video.duration);
        }
    
        videoElement.addEventListener('ended', playNextVideo);
    
        // Event listener for 'F' key to switch to the second video
        /*document.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === 'f') {
                currentVideoIndex = 1; // Set index to the second video
                playNextVideo();
            }
        }); */
    
        // Start the video sequence
        playNextVideo();
    });
}