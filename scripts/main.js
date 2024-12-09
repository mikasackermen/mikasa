import { commands } from "./commands.js";
import {
  playKeyPressSound,
  playCommandExecutionSound,
  playErrorSound,
  playClearSound,
} from "./sounds.js";

const terminalOutput = document.getElementById("output");

const createInputField = () => {
  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  const firstLinePrompt = document.createElement("div");
  firstLinePrompt.className = "first-line-prompt";
  firstLinePrompt.innerHTML = `<span class="prompt-symbol">┌──</span><span class="user-info">(guest㉿mikasa)</span><span class="directory">-[~]</span>`;

  const secondLinePrompt = document.createElement("div");
  secondLinePrompt.className = "second-line-prompt";
  secondLinePrompt.innerHTML = `<span class="prompt-symbol">└──$</span>`;

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.className = "dynamic-input";
  inputField.placeholder = "Enter command...";

  secondLinePrompt.appendChild(inputField);

  inputContainer.appendChild(firstLinePrompt);
  inputContainer.appendChild(secondLinePrompt);
  terminalOutput.appendChild(inputContainer);
  inputField.focus();

  smoothScrollToBottom();

  inputField.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      playKeyPressSound(event.key);
    }
  });

  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const command = inputField.value.trim();
      inputField.disabled = true;
      executeCommand(command);
    }
  });
};

const executeCommand = (command) => {
  const outputContainer = document.createElement("div");
  outputContainer.className = "command-output";

  if (commands[command]) {
    if (command === "clear") {
      playClearSound();
      terminalOutput.innerHTML = "";
    } else {
      playCommandExecutionSound();
      outputContainer.innerHTML = commands[command]();
      terminalOutput.appendChild(outputContainer);
    }
  } else {
    playErrorSound();
    outputContainer.classList.add("error-message");
    outputContainer.textContent = `Error: Unknown command '${command}'. Type 'help' for a list of commands.`;
    terminalOutput.appendChild(outputContainer);
  }

  createInputField();
  smoothScrollToBottom();
};

const smoothScrollToBottom = () => {
  const terminal = document.getElementById("terminal");
  terminal.scrollTo({
    top: terminal.scrollHeight,
    behavior: "smooth",
  });
};

createInputField();
