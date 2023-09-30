// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
// const progress = player.querySelector('.progress');
// const progressBar = player.querySelector('.progress_filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player_slider')
let duration 
let percent
let time

// ----------------------------------------------
// Default values

inpVolume.value = 0.3
video.volume = 0.3
updSpeed() 
updVolume()

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

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'table';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}


const delay = ms => new Promise(res => setTimeout(res, ms));

function updSpeed() {
    percent = ((speedRange.value - 0.5) / (speedRange.max - 0.5)) * 100
    speedNumber.innerHTML = `${speedRange.value}x`
    speedRange.style.background = `linear-gradient(to right, #289eff ${percent}%, rgb(150, 150, 150) ${percent}%)`;
}
 


function updVolume() {
    percent = inpVolume.value / inpVolume.max * 100
    inpVolume.style.backgroundImage = `linear-gradient(to right, #289eff ${percent}%, rgb(150, 150, 150) ${percent}%)`;
    if (percent === 0 ) {
        volumeB.style.backgroundImage = 'url(../videoplayer/assets/icons/mute.svg)'
    } else if (percent < 50) {
        inpVolume.style.backgroundImage = `linear-gradient(to right, #289eff ${percent+1}%, rgb(150, 150, 150) ${percent+1}%)`;
        volumeB.style.backgroundImage = 'url(../videoplayer/assets/icons/low_volume.svg)'
    } else if (percent > 50) {
        volumeB.style.backgroundImage = 'url(../videoplayer/assets/icons/normal_volume.svg)'
    }
}


function toggleDisplay(e) {
    if (config_wrapper.style.display === 'none') {
        config_wrapper.style.display = 'block'
    } else config_wrapper.style.display = 'none'
}


function openFullscreen() {

        // if (footer.style.display === 'none') {
        //     footer.style.display = 'block'
        // } else footer.style.display = 'none'
        // videowrapper.classList.toggle('videoFullscreen')
        // video.classList.toggle('videoFullscreen')
        if (video.requestFullscreen) {
            video.requestFullscreen()
    } else if (video.webkitRequestFullscreen) { /* Safari */
    video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
    video.msRequestFullscreen();
    }
  } 

function minusSec() {
    unfade(tempm10);
    delay(500);
    fade(tempm10)
}
function plusSec() {
    unfade(tempp25);
    delay(500);
    fade(tempp25)
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
inpVolume.addEventListener('mousemove', updVolume)


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
document.addEventListener("keydown", ({key}) => {
    switch (key) {
        case "Escape":
            openFullscreen()
            break;
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


// click space
// click left
// click right
// click esc
// click dobleclick
// click next video

