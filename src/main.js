const ffmpeg = require('./ffmpeg')
window.$ = window.jQuery = require("jquery")
const slimscroll = require('jquery-slimscroll')
const menu = require('./menu')
const fs = require('fs')
const dateformat = require('dateformat-util')
const path = require('path')

$('#ffmpeglog').slimScroll({
    position: 'right',
    height: '95%',
    railVisible: true,
    alwaysVisible: true
});


const holder = document.getElementById('holder')
const ffmpeglog = document.getElementById('ffmpeglog')

holder.ondragover = () => {
    return false;
}
holder.ondragleave = holder.ondragend = () => {
    return false;
}
holder.ondrop = (e) => {
    e.preventDefault()
    asyncDo(e.dataTransfer.files);
    return false;
}
holder.ondblclick = (e) => {
    document.getElementById("file").click();
}


const file = document.getElementById('file')

file.addEventListener("change", handleFiles, false);

function handleFiles() {
    asyncDo(this.files);
}



async function asyncDo(files) {
    for (let file of files) {
        await doffmpeg(file)
    }
}


function doffmpeg(file) {
    let dateStr = dateformat.format(new Date(), 'yyyyMMdd');
    fs.exists(path.join(__dirname,dateStr),function(exists){
        if(!exists){
            fs.mkdir(path.join(__dirname,dateStr),0777, function(err){
                 if(err){
                      console.log(err);
                     }else{
                      console.log("done!");
                     }
            })
        }
    })
    log(file.name)
    log(file.path)
    var cfg = {
        videoPath: file.path,
        vBitrate: '1024',
        watermark: 'watermark.png',
        format: 'mp4',
        filePath: path.join(__dirname,dateStr,file.name)
    };
    return new Promise(function (resolve, reject) {

        ffmpeg(cfg)
            .on('progress', function (info) {
                log('progress ' + info.percent + '%');
            })
            .on('end', function () {
                log('file has been converted succesfully')
                log(path.join(cfg.filePath))
                resolve('');
            })
            .on('error', function (err) {
                log('an error happened: ' + err.message);
                reject(err)
            })
            .save(cfg.filePath)
    })
}

function log(text) {
    console.log(text)
    let p = document.createElement("p");
    let t = document.createTextNode(text);
    p.appendChild(t);
    ffmpeglog.prepend(p);
}



