const information = [
  {
    name: "Let Me Love You",
    path: "./songs/1.mp3",
    coverPath: "./covers/1.jpg",
    timeDuration: "03:50",
  },
  {
    name: "Sajan Sajan",
    path: "./songs/2.mp3",
    coverPath: "./covers/2.jpg",
    timeDuration: "02:33",
  },
  {
    name: "Ceilo",
    path: "./songs/3.mp3",
    coverPath: "./covers/3.jpg",
    timeDuration: "04:33",
  },
  {
    name: "The Shape",
    path: "./songs/4.mp3",
    coverPath: "./covers/4.jpg",
    timeDuration: "04:27",
  },
  {
    name: "Ashique",
    path: "./songs/5.mp3",
    coverPath: "./covers/5.jpg",
    timeDuration: "03:28",
  },
  {
    name: "Old Town Road",
    path: "./songs/6.mp3",
    coverPath: "./covers/6.jpg",
    timeDuration: "03:28",
  },
  {
    name: "Tum Hi Ho",
    path: "./songs/7.mp3",
    coverPath: "./covers/7.jpg",
    timeDuration: "04:33",
  },
  {
    name: "Believer",
    path: "./songs/8.mp3",
    coverPath: "./covers/8.jpg",
    timeDuration: "03:50",
  },
  {
    name: "Thunder",
    path: "./songs/9.mp3",
    coverPath: "./covers/9.jpg",
    timeDuration: "03:28",
  },
  {
    name: "Freinds",
    path: "./songs/10.mp3",
    coverPath: "./covers/10.jpg",
    timeDuration: "04:27",
  },
];

let songIndex = 0;
let audioElement = new Audio(information[songIndex].path);
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("myProgressBar");
const showGif = document.getElementById("showGif");
const songList = Array.from(document.querySelectorAll(".songList"));
const miniPlayBtn = Array.from(document.querySelectorAll(".miniPlayBtn"));
const musicNameEle = document.getElementById("musicName");
const musicTime = document.getElementById("musicTime");
const playedTime = document.getElementById("playedTime");

const makeAllPlays = () => {
  miniPlayBtn.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

const removePlayBtn = () => {
  playBtn.classList.remove("fa-circle-play");
  playBtn.classList.add("fa-circle-pause");
};

const addPlayBtn = () => {
  playBtn.classList.remove("fa-circle-pause");
  playBtn.classList.add("fa-circle-play");
};

const removeMiniPlayBtn = () => {
  miniPlayBtn[songIndex].classList.remove("fa-circle-play");
  miniPlayBtn[songIndex].classList.add("fa-circle-pause");
};

const addMiniPlayBtn = () => {
  miniPlayBtn[songIndex].classList.remove("fa-circle-pause");
  miniPlayBtn[songIndex].classList.add("fa-circle-play");
};

const addMusicTime = () => {
    musicTime.textContent = information[songIndex].timeDuration;
}

const audioPlay = () => {
  setTimeout(() => {
    audioElement.play();
  },300);
}

const addPlayedTime = () => {
  musicPlayedTime = parseInt(audioElement.currentTime);
  if(musicPlayedTime < 10){
    playedTime.textContent = `00:0${musicPlayedTime}`;
  }else if(musicPlayedTime < 60){
    playedTime.textContent = `00:${musicPlayedTime}`;
  }else{
    let minutes = parseInt(musicPlayedTime / 60);
    let seconds = musicPlayedTime % 60;
    if(seconds < 10){
      playedTime.textContent = `0${minutes}:0${seconds}`;
    }else{
      playedTime.textContent = `0${minutes}:${seconds}`;
    }
  }
}

songList.forEach((element, index) => {
  element.getElementsByTagName("img")[0].src = information[index].coverPath;
  element.getElementsByClassName("songName")[0].textContent =
    information[index].name;
  element.getElementsByClassName("time")[0].textContent =
    information[index].timeDuration;
});

playBtn.addEventListener("click", () => {
  musicNameEle.textContent = information[songIndex].name;
  if (audioElement.paused || audioElement.currentTime === 0) {
    audioPlay();
    showGif.style.opacity = "1";
    removePlayBtn();
    removeMiniPlayBtn();
  } else {
    audioElement.pause();
    showGif.style.opacity = "0";
    addPlayBtn();
    addMiniPlayBtn();
  }
});

audioElement.addEventListener("timeupdate", () => {
  const progressUpdate = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  progressBar.value = progressUpdate;
  addPlayedTime();
  addMusicTime();
});

audioElement.addEventListener("ended", () => {
    setTimeout(() => {
      document.getElementById("forwardBtn").click();
    },300)
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

miniPlayBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    songIndex = Number(element.getAttribute("id"));
    if (audioElement.getAttribute("src") === information[songIndex].path) {
      if (audioElement.paused) {
        audioPlay();
        removeMiniPlayBtn();
        removePlayBtn();
        showGif.style.opacity = "1";
      } else {
        audioElement.pause();
        addMiniPlayBtn();
        addPlayBtn();
        showGif.style.opacity = "0";
      }
    } else {
      audioElement.currentTime = 0;
      progressBar.value = 0;
      audioElement.src = information[songIndex].path;
      makeAllPlays();
      removeMiniPlayBtn();
      removePlayBtn();
      audioPlay();
      showGif.style.opacity = "1";
      musicNameEle.textContent = information[songIndex].name;
    }
  });
});

document.getElementById("backwardBtn").addEventListener("click", () => {
  addPlayBtn();
  makeAllPlays();
  showGif.style.opacity = "0";
  if (audioElement.currentTime < 5 && songIndex !== 0) {
    songIndex -= 1;
    audioElement.src = information[songIndex].path;
  }
  audioElement.currentTime = 0;
  progressBar.value = 0;
  removeMiniPlayBtn();
  musicNameEle.textContent = information[songIndex].name;
  setTimeout(() => {
    removePlayBtn();
    showGif.style.opacity = "1";
  }, 300);
  audioPlay();
});

document.getElementById("forwardBtn").addEventListener("click", () => {
  addPlayBtn();
  makeAllPlays();
  showGif.style.opacity = "0";
  if (songIndex < information.length - 1) {
    songIndex += 1;
    audioElement.src = information[songIndex].path;
  }
  audioElement.currentTime = 0;
  progressBar.value = 0;
  removeMiniPlayBtn();
  musicNameEle.textContent = information[songIndex].name;
  setTimeout(() => {
    removePlayBtn();
    showGif.style.opacity = "1";
  }, 300);
  audioPlay();
});
