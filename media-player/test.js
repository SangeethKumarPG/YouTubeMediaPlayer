const ytdl = require('@distube/ytdl-core');
const fs = require('fs');
const { exec } = require('child_process');

const videoId = 'oygpFfNfX9U'; 
const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
const videoOutput = 'video.mp4';
const audioOutput = 'audio.mp3';
const finalOutput = 'final.mp4';


ytdl(videoUrl, { quality: 'highestvideo' })
  .pipe(fs.createWriteStream(videoOutput))
  .on('finish', () => {
    console.log('Video download complete');
  })
  .on('error', (error) => {
    console.error('Error downloading video:', error);
  });


ytdl(videoUrl, { quality: 'highestaudio' })
  .pipe(fs.createWriteStream(audioOutput))
  .on('finish', () => {
    console.log('Audio download complete');

    
    exec(`ffmpeg -i ${videoOutput} -i ${audioOutput} -c copy ${finalOutput}`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error merging video and audio:', err);
        return;
      }
      console.log('Merge complete');
    });
  })
  .on('error', (error) => {
    console.error('Error downloading audio:', error);
  });
