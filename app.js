// music bank
let bankOne = [
  {
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

let bankTwo = [
  {
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

const padContainer = document.querySelector(".pad-container");
const pads = document.querySelectorAll(".pad");
const powerBtn = document.querySelector(".power-btn");
const volume = document.querySelector("input[type=range]");
const textCont = document.querySelector(".display");
const text = document.querySelector(".display h3");
const audios = document.querySelectorAll("audio");
const musicBank = document.querySelector("input[type=checkbox]");

const colors = [
  "#FFA64C",
  "#FDD602",
  "#5C1D6B",
  "#FF3179",
  "#B41EB2",
  "#38A6F3",
];

// pick a random color from an array of colors
function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

let power = false;
let bank;
let audioname;
let volumeValue = 0.5;

// for reload;
volume.value = volumeValue;

powerBtn.addEventListener("click", () => {
  if (power) {
    power = false;

    // reset
    powerBtn.classList.remove("active");
    textCont.classList.remove("active");
    musicBank.checked = false;
    volume.value = 0.5;
  } else {
    power = true;
    powerBtn.classList.add("active");
    textCont.classList.add("active");
  }
});

// select audio bank
musicBank.addEventListener("change", () => {
  if (musicBank.checked) {
    selectAudio(bankTwo);
  } else {
    selectAudio(bankOne);
  }
});

pads.forEach((pad) => {
  pad.addEventListener("click", handleClick);
  pad.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", handleKeyPress);

function selectAudio(banks) {
  audios.forEach((audio, idx) => {
    audio.src = banks[idx].url;
  });
  bank = banks;
}

selectAudio(bankOne);

function playSound(code) {
  // if power is true/on
  if (power) {
    let audioFile = document.querySelector(`audio[data-key="${code}"]`);
    const key = document.querySelector(`div[data-key="${code}"]`);

    if (!audioFile) return;
    if (key === null) return;

    //add active class from css
    key.classList.add("active");

    // add border-color
    key.style.borderColor = `${randomColor()}`;

    // remove border-color
    setTimeout(() => {
      key.style.borderColor = "lightBlue";
    }, 100);

    audioname = bank[key.id].id;
    text.innerText = audioname;

    audioFile.currentTime = 0;
    audioFile.play();
    audioFile.volume = +volumeValue;
  } else {
    return;
  }
}

// remove transition from active keypad
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("active");
}

// function when you click on pad
function handleClick(e) {
  let code = e.target.dataset.key;

  playSound(code);
}

// function when press key on keyboard
function handleKeyPress(e) {
  let code = e.keyCode;
  if (e.keyCode === null) console.log("null");
  playSound(code);
}

// control volume
function handleVolume(e) {
  volumeValue = e.target.value;
}

volume.addEventListener("input", handleVolume);
