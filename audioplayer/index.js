let isPlay = false;
let indexMusicArray = 1


let musicArray = {
  1: {
    Author: 'Celldweller',
    NameSong: 'Own Little World (Remixed by Blue Stahli)',
    src: 'X2Download.app - Celldweller - Own Little World (Remixed by Blue Stahli) (128 kbps).mp3',
    imgsrc: 'myown.jpg'
  },
  2: {
    Author: 'Skillet (cover Neco Arc Ai)',
    NameSong: 'Monster, but Neco Arc sings it (AI COVER)',
    src: 'X2Download.app - Skillet - Monster, but Neco Arc sings it (AI COVER) (320 kbps).mp3',
    imgsrc: 'necoarc.jpg'
  },
  3: {
    Author: 'Carpenter Brut cover',
    NameSong: 'Maniac',
    src: 'X2Download.app - Maniac (128 kbps).mp3',
    imgsrc: 'maxmaniac.jpg'
  },
  4: {
    Author: '55x55',
    NameSong: 'ОДИН ГОД',
    src: 'X2Download.app - 55x55 – ОДИН ГОД (128 kbps).mp3',
    imgsrc: '55х55.webp'
  },
  5: {
    Author: 'Powerman 5000',
    NameSong: 'How To Be A Human',
    src: 'X2Download.app - Powerman 5000 - How To Be A Human (128 kbps).mp3',
    imgsrc: 'howtobeahuman.jpg'
  }, 
  6: {
    Author: 'Sewerslvt', 
    NameSong: 'Newlove', 
    src: 'X2Download.app - Sewerslvt - Newlove (128 kbps).mp3',
    imgsrc: 'sewerclvt.jpg'
  },
  7: {
    Author: 'Combichrist',
    NameSong: 'What The Fuck Is Wrong With You',
    src: 'X2Download.app - Combichrist - What The Fuck Is Wrong With You - DmC Devil May Cry OST (128 kbps).mp3',
    imgsrc: 'dmc.jpg'
  },
  8: {
    Author: 'Giorgio Moroder',
    NameSong: '74 IS THE NEW 24',
    src: 'X2Download.app - Giorgio Moroder - 74 IS THE NEW 24 (128 kbps).mp3',
    imgsrc: 'gourge.jpg'
  }
}
let mlength = Object.keys(musicArray).length


window.onload = (event) => {
    audio.volume = 0.25;
    fullTime.innerHTML = getTimeCodeFromNum(audio.duration)
    // console.log(audio.duration / 60)
    progressVolume.style.background = `linear-gradient(to right, #ff4eaf ${audio.volume*100}%, rgb(150, 150, 150) ${audio.volume*100}%)`;
    progressVolume.value = 25;
    volumeIco.style.backgroundImage = 
    `url(../audioplayer/items/images/icons/low-volume_icon-icons.com_70924.svg)`
  } 


const play = document.querySelector('.play'); 

play.addEventListener('click', player); 

function player() { 
    if (!isPlay) {
        audio.play();
        isPlay = true
    } else if (isPlay) {
        audio.pause();
        isPlay = false
    }
  }
  

  function toggleBtn() {
    play.classList.toggle('pause');
    }
    play.addEventListener('click', toggleBtn);



const volume = document.querySelector("#progressVolume")

// Change volume
progressVolume.addEventListener("input", (event) => {
  let tempSliderVolume = event.target.value; 
  let progressVolumeReal = (tempSliderVolume / progressVolume.max) * 100;

progressVolume.style.background = `linear-gradient(to right, #ff4eaf ${progressVolumeReal}%, rgb(150, 150, 150) ${progressVolumeReal}%)`;
  audio.volume = progressVolumeReal / 100
  if (progressVolumeReal === 0) {
    volumeIco.style.backgroundImage = 
    `url(../audioplayer/items/images/icons/mute_icon-icons.com_70915.svg)` 
  } else if (50 > progressVolumeReal > 0 ) {
    volumeIco.style.backgroundImage = 
    `url(../audioplayer/items/images/icons/low-volume_icon-icons.com_70924.svg)`
  } else if (progressVolumeReal > 50) {
    volumeIco.style.backgroundImage = 
    `url(../audioplayer/items/images/icons/volume_icon-icons.com_70827.svg)`
  }
})

// Change progressbar of Song on click
progressBar.addEventListener("input", (event) => {
  let tempSliderValue = event.target.value; 
  let progress = (tempSliderValue / progressBar.max) * 100;
  progressBar.style.background = `linear-gradient(to right, #ff4eaf ${progress}%, rgb(150, 150, 150) ${progress}%)`;

  audio.currentTime = (audio.duration *  progress) / 100
  currentTime.innerHTML = getTimeCodeFromNum(audio.currentTime)
})



//check audio percentage and update time accordingly
audio.addEventListener("timeupdate", (event) => {

  let progressBarPerCent = (audio.currentTime / audio.duration * 100)
  progressBar.value = Math.floor((progressBar.max * progressBarPerCent) / 100);
  progressBar.style.background = `linear-gradient(to right, #ff4eaf ${progressBarPerCent}%, rgb(150, 150, 150) ${progressBarPerCent}%)`;
  currentTime.innerHTML = getTimeCodeFromNum(audio.currentTime);

  if (progressBarPerCent < 10) {
    progressBar.style.background = `linear-gradient(to right, #ff4eaf ${progressBarPerCent+3}%, rgb(150, 150, 150) ${progressBarPerCent+3}%)`;
  }

  if (progressBarPerCent === 100) {
    nextSong()
  }
  // console.log(audio.duration)
});




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



// scrolling text


let timerId
let timerId1
let timerId2

function autoscroll() {
  if (song_name.offsetWidth > 200) {
    timerId = setTimeout(() => {
      // song_name.style.transition = "all 3s"
      song_name.style = `margin-left: -${song_name.offsetWidth - 200}px; transition: 3s ease-in-out`
  
      timerId1 = setTimeout(() => song_name.style.margin = '0px', 4000)
      timerId2 = setTimeout(() => autoscroll(), 6000)
    }, 3000)
  }

  if (song_artist.offsetWidth > 150) {
    timerId = setTimeout(() => {
      // song_name.style.transition = "all 3s"
      song_artist.style = `margin-left: -${song_artist.offsetWidth - 150}px; transition: 3s ease-in-out`
  
      timerId1 = setTimeout(() => song_artist.style.margin = '0px', 4000)
      timerId2 = setTimeout(() => autoscroll(), 6000)
    }, 3000)
  }

  } 
  
// switch and speed buttons 
let playNext = document.querySelector('.playnb')
let playPrev = document.querySelector('.playprb')
let backgrimg = document.querySelector(' div.img')

playNext.onclick = () => nextSong()

function nextSong() {

  if (indexMusicArray < mlength) {
    indexMusicArray += 1
  } else if (indexMusicArray === mlength) {
    indexMusicArray = 1
  }
  
  audio.src = '../audioplayer/items/audio/'+musicArray[indexMusicArray].src
    audio.load()
    audio.addEventListener("loadeddata", (event) => {
      fullTime.innerHTML = getTimeCodeFromNum(audio.duration),
      console.log(audio.duration)
    })

    
    backgrimg.style.backgroundImage = 'url(../audioplayer/items/images/'+musicArray[indexMusicArray].imgsrc
    thumbnail.style.backgroundImage = 'url(../audioplayer/items/images/'+musicArray[indexMusicArray].imgsrc
    song_artist.innerHTML = musicArray[indexMusicArray].Author
    song_name.innerHTML = musicArray[indexMusicArray].NameSong
  
    if (isPlay) {
      audio.play();
  } 
  

  clearTimeout(timerId)
  clearTimeout(timerId1)
  clearTimeout(timerId2)
  song_artist.style.margin = '0px'
  song_name.style.margin = '0px'
autoscroll() 
  // console.log(audio.src)

  // fullTime.innerHTML = getTimeCodeFromNum(audio.duration)

}


playPrev.onclick = function prevSong() {
  if (indexMusicArray > 1) {
    indexMusicArray -= 1
  } else if (indexMusicArray === 1) {
    indexMusicArray = mlength
  }
 
  audio.src = '../audioplayer/items/audio/'+ musicArray[indexMusicArray].src
  backgrimg.style.backgroundImage = 'url(../audioplayer/items/images/'+musicArray[indexMusicArray].imgsrc
  thumbnail.style.backgroundImage = 'url(../audioplayer/items/images/'+musicArray[indexMusicArray].imgsrc
  song_artist.innerHTML = musicArray[indexMusicArray].Author
  song_name.innerHTML = musicArray[indexMusicArray].NameSong
  audio.load()
  // new Audio()
  audio.addEventListener("loadeddata", (event) => {
    fullTime.innerHTML = getTimeCodeFromNum(audio.duration),
    console.log(audio.duration)
  })

  if (isPlay) {
    audio.play();  
} 
clearTimeout(timerId)
clearTimeout(timerId1)
clearTimeout(timerId2)
song_artist.style.margin = '0px'
song_name.style.margin = '0px'
autoscroll() 
}

autoscroll() 

// element.classList.add('class'); - добавляет элементу класс;
// element.classList.remove('class'); - удаляет класс;
// element.classList.toggle('class'); - переключает класс: добавляет, если класса нет, и удаляет, если он есть.
// element.classList.contains('class'); - проверяет, есть ли данный класс у элемента (возвращает true или false)



//   play-next и play-prev 

//   удаляем у кнопки класс pause при помощи методов classList.add(), и classList.remove()
