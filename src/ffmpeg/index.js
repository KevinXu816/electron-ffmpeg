var ffmpeg = require('fluent-ffmpeg');
function FfmpegCommand(cfg){
    return ffmpeg(cfg.videoPath)
    .videoBitrate(cfg.vBitrate)//'1024'
    .videoCodec('libx264')
    .audioBitrate('128k')
    .audioCodec('aac')
    .input(cfg.watermark)
    .complexFilter(
    [
      'scale=-1:480[output]',
      {
        filter: 'overlay', options: { x: 'main_w-overlay_w-10', y: 10 },
        inputs: ['output', '1'], outputs: 'output'
      },
      
    ], 
    'output'
    )
    .format(cfg.format)
}

module.exports = FfmpegCommand;
// var command = ffmpeg('1506737921719027907.mp4')
//   .videoBitrate('1024')
//   .videoCodec('libx264')
//   .audioBitrate('128k')
//   .audioCodec('aac')
//   .input('watermark.png')
//   .complexFilter(
//   [
//     'scale=-1:480[output]',
//     {
//       filter: 'overlay', options: { x: 'main_w-overlay_w-10', y: 10 },
//       inputs: ['output', '1'], outputs: 'output'
//     },
    
//   ], 
//   'output'
//   )
//   .format('avi')
//   .on('progress', function (info) {
//     console.log('progress ' + info.percent + '%');
//   })
//   .on('end', function () {
//     console.log('file has been converted succesfully');
//   })
//   .on('error', function (err) {
//     console.log('an error happened: ' + err.message);
//   })
//   .save('outtest.avi');
