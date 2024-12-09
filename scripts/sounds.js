const audioContext = new (window.AudioContext || window.webkitAudioContext)(); 
let keyPressBuffer = null;

const excludedKeys = [
  "Shift", "Control", "Alt", "Meta", "ArrowUp", 
  "ArrowDown", "ArrowLeft", "ArrowRight", "CapsLock", 
  "Tab",
];

fetch("sounds/keyPress.mp3")
  .then((response) => response.arrayBuffer())
  .then((audioData) => {
    audioContext.decodeAudioData(audioData, (buffer) => {
      keyPressBuffer = buffer;
    });
  })
  .catch((error) => console.error("Failed to load keyPress sound:", error));

export const playKeyPressSound = (key) => {
  if (excludedKeys.includes(key) || !keyPressBuffer) return;

  const keyPressSource = audioContext.createBufferSource();
  keyPressSource.buffer = keyPressBuffer;
  keyPressSource.connect(audioContext.destination);

  keyPressSource.start(0);
};

const commandExecuteAudio = new Audio("sounds/output.mp3");
commandExecuteAudio.preload = "auto";

export const playCommandExecutionSound = () => {
  commandExecuteAudio.currentTime = 0;
  commandExecuteAudio.play().catch(() => {});
};

const errorAudio = new Audio("sounds/error.mp3");
errorAudio.preload = "auto";

export const playErrorSound = () => {
  errorAudio.currentTime = 0;
  errorAudio.play().catch(() => {});
};

const clearAudio = new Audio("sounds/windows-recycle.wav");
clearAudio.preload = "auto";

export const playClearSound = () => {
  clearAudio.currentTime = 0;
  clearAudio.play().catch(() => {});
};
