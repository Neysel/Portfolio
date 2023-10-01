// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
// const progress = player.querySelector('.progress');
// const progressBar = player.querySelector('.progress_filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player_slider')
let playerControls = player.querySelector('.player_controls')
let duration 
let percent
let time
let intervalMouse
let flagfullscreen = false
// ----------------------------------------------
// Default values

inpVolume.value = 0.3
inpVolumeMobile.value = inpVolume.value
video.volume = 0.3
updSpeed() 
    inpVolume.style.backgroundImage = `linear-gradient(to right, #289eff 30%, rgb(150, 150, 150) 30%)`

// ----------------------------------------------
// functions 




video.addEventListener('loadedmetadata', function () {
    console.log(video.duration)
    loading_wrapper.style.display = 'block'
  
    console.log(video.duration === Infinity && duration === undefined)
    console.log( loading_wrapper.style.display )
    if (video.duration === Infinity && duration === undefined) {
        video.currentTime = 1e101;
        video.ontimeupdate = () => {
            this.ontimeupdate = () => {
       return;
            }
            duration = video.duration
            durationTime.innerHTML = getTimeCodeFromNum(duration) 
            console.log(video.duration)
            video.load()
        }
    } else if (duration !== undefined) {
        loading_wrapper.style.display = 'none'
        progressBar.value = 0
    }
});


function togglePlay() {

    if (video.paused) {
        video.play()
        video.play
        toggle.style.background = 'url(../videoplayer/assets/icons/pause.svg)'
    } else {
        video.pause()
        video.pause
        toggle.style.background = 'url(../videoplayer/assets/icons/play.svg)'
        // clearTimeout(time)
    }

}


//Turn 128 seconds into 2:08

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    let hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }

  
function skip() {
video.currentTime += parseFloat(this.dataset.skip)
handleProgress()
}

function rangeUpd() {
    video[this.name] = this.value
   
}


function handleProgress() {
     percent = (video.currentTime / duration) * 100
     progressBar.value = (progressBar.max * percent) / 100;
     progressBar.style.background = `linear-gradient(to right, #289eff ${percent}%, rgb(150, 150, 150) ${percent}%)`;
     startTime.innerHTML = getTimeCodeFromNum(video.currentTime) 

     if(percent < 10) {
        progressBar.style.background = `linear-gradient(to right, #289eff ${percent+1}%, rgb(150, 150, 150) ${percent+1}%)`;
      }
      
      if (percent === 100) {
        video.pause()
        video.pause
        toggle.style.background = 'url(../videoplayer/assets/icons/play.svg)'
      }
}

function scrub(e) {
    // console.log(e)
    const scrubTime = (progressBar.value / progressBar.max) * duration
    console.log(scrubTime)
    console.log(video.currentTime)
    video.currentTime = scrubTime
}

// function fade(element) {
//     var op = 1;  // initial opacity
//     var timer = setInterval(function () {
//         if (op <= 0.1){
//             clearInterval(timer);
//             element.style.display = 'none';
//         }
//         element.style.opacity = op;
//         element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//         op -= op * 0.1;
//     }, 50);
// }

// function unfade(element) {
//     var op = 0.1;  // initial opacity
//     element.style.display = 'table';
//     var timer = setInterval(function () {
//         if (op >= 1){
//             clearInterval(timer);
//         }
//         element.style.opacity = op;
//         element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//         op += op * 0.1;
//     }, 10);
// }


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function updSpeed() {
    percent = ((speedRange.value - 0.5) / (speedRange.max - 0.5)) * 100
    speedNumber.innerHTML = `${speedRange.value}x`
    speedRange.style.background = `linear-gradient(to right, #289eff ${percent}%, rgb(150, 150, 150) ${percent}%)`;
}
 


function updVolume() {
    inpVolume.value = this.value
    inpVolumeMobile.value = this.value
    percent = this.value / this.max * 100
    inpVolume.style.backgroundImage = `linear-gradient(to right, #289eff ${percent}%, rgb(150, 150, 150) ${percent}%)`;
    inpVolumeMobile.style.backgroundImage = `linear-gradient(to right, #289eff ${percent}%, rgb(150, 150, 150) ${percent}%)`;
    if (percent === 0 ) {
        volumeB.style.backgroundImage = 'url(../videoplayer/assets/icons/mute.svg)'
        volumeBMobile.style.backgroundImage = 'url(../videoplayer/assets/icons/mute.svg)'
    } else if (percent < 50) {
        inpVolume.style.backgroundImage = `linear-gradient(to right, #289eff ${percent+1}%, rgb(150, 150, 150) ${percent+1}%)`;
        volumeBMobile.style.backgroundImage = `linear-gradient(to right, #289eff ${percent+1}%, rgb(150, 150, 150) ${percent+1}%)`;
        volumeB.style.backgroundImage = 'url(../videoplayer/assets/icons/low_volume.svg)'
        volumeBMobile.style.backgroundImage = 'url(../videoplayer/assets/icons/low_volume.svg)'
    } else if (percent > 50) {
        volumeB.style.backgroundImage = 'url(../videoplayer/assets/icons/normal_volume.svg)'
        volumeBMobile.style.backgroundImage = 'url(../videoplayer/assets/icons/normal_volume.svg)'
    }
}


function toggleDisplay(e) {
    if (config_wrapper.style.display === 'none') {
        config_wrapper.style.display = 'block'
    } else config_wrapper.style.display = 'none'
}

function openFullscreen() {
    const container = document.getElementById('videowrapper');
    const fullscreenApi = container.requestFullscreen
    || container.webkitRequestFullScreen
    || container.mozRequestFullScreen
    || container.msRequestFullscreen;
  if (!document.fullscreenElement) {
    fullscreenApi.call(container);
    // flagfullscreen = true
    hideMouse()
  }
  else {
    document.exitFullscreen();
    // flagfullscreen = false
    // console.log(flagfullscreen)
    playerControls.style.bottom = ''
    hideMouse()
  }
  } 

function hideMouse() {
    // console.log((flagfullscreen === true))
    clearInterval(intervalMouse)
    if (flagfullscreen === true) {
        intervalMouse = setInterval(() => {
            video.style.cursor = "none"
            playerControls.style.bottom = '-100px'
        }, 5000)
    } 
}

function minusSec() {
tempm10.style.display = 'table';
    delay(1000).then(() => tempm10.style.display = 'none');
 
}
function plusSec() {
    tempp25.style.display = 'table';
    delay(1000).then(() => tempp25.style.display = 'none');
}

// ----------------------------------------------
// hook up the event listener
let mousedown = false
let mouseup = false

video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay) 

video.addEventListener('timeupdate', handleProgress)




skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', rangeUpd))
ranges.forEach(range => range.addEventListener('mousemove', rangeUpd))

speedRange.addEventListener('change', updSpeed)
speedRange.addEventListener('mousemove', updSpeed)

inpVolume.addEventListener('change', updVolume)
inpVolumeMobile.addEventListener('change', updVolume)
inpVolume.addEventListener('mousemove', updVolume)
inpVolumeMobile.addEventListener('mousemove', updVolume)



progressBar.addEventListener("input", (e) => {
    let etime = e.target.value
    percent = (etime / progressBar.max) * 100
    video.currentTime = (duration * percent) / 100
    progressBar.style.background = `linear-gradient(to right, #289eff ${percent}%, rgb(150, 150, 150) ${percent}%)`;
})
progressBar.addEventListener('mousemove', handleProgress)

minus10.addEventListener('click', minusSec)
plus25.addEventListener('click', plusSec)


config.addEventListener('click', toggleDisplay)
fullscreen.addEventListener('click', openFullscreen)

video.addEventListener("dblclick", openFullscreen)

document.addEventListener("keydown", (e) => {
 if (e.code === 'Space' && duration !== undefined) {
    togglePlay()
    // console.log('space pressed')
 }
})

// 
document.addEventListener("keydown", ({key}) => {
    switch (key) {
        // case "Escape":
        //     flagfullscreen = false
        //     playerControls.style.bottom = ''
            
        //     break;
        case "ArrowLeft": 
        minusSec()
        minus10.click()
        break
        case "ArrowRight": 
        plusSec()
        plus25.click()
        break 
        default:
            break;
    }
})
  

videowrapper.addEventListener('mousemove', () => {
    // console.log('move move move')
    clearInterval(intervalMouse)
    video.style.cursor = "auto"
    if (flagfullscreen === true) {
        playerControls.style.bottom = '0px'
        hideMouse()
    }
})

videowrapper.addEventListener("fullscreenchange", (event) => {
    console.log('change')
    clearInterval(intervalMouse)

    if (flagfullscreen === false) {
        flagfullscreen = true
        hideMouse()
    } else if (flagfullscreen === true) {
        flagfullscreen = false
        playerControls.style.bottom = ''
    }
    console.log(flagfullscreen)
})

