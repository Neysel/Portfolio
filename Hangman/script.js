let QA_obj = {
  1: {
    word: "Closure",
    question:
      "A form of lexical scoping used to preserve variables from the outer scope of a function in the inner scope of a functions",
  },
  2: {
    word: "Browser",
    question:
      "Takes you anywhere on the internet. It retrieves information from other parts of the web and displays it on your desktop or mobile device",
  },
  3: {
    word: "Javascript",
    question:
      "Language and core technology of the World Wide Web, alongside HTML and CSS",
  },
  4: {
    word: "Processor",
    question:
      "Its electronic circuitry executes instructions of a computer program, such as arithmetic, logic, controlling, and input/output operations",
  },
  5: {
    word: "RAM",
    question: "Your computer or laptop's short-term memory",
  },
  6: {
    word: "React",
    question:
      "Is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript",
  },
  7: {
    word: "Gulp",
    question:
      "An open-source JavaScript toolkit, used as a streaming build system (similar to a more package-focused Make) in front-end web development",
  },
  8: {
    word: "MDN",
    question:
      "Web Docs, previously Mozilla Developer Network and formerly Mozilla Developer Center, is a documentation repository and learning resource for web developers",
  },
  9: {
    word: "TDZ",
    question:
      "A specific period in the execution of JavaScript code where variables declared with let and const exist but cannot be accessed or assigned any value",
  },
  10: {
    word: "Hoisting",
    question:
      "Default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function",
  },
  11: {
    word: "Optical fiber",
    question:
      "Is a flexible glass or plastic fiber that can transmit light from one end to the other.Such fibers find wide usage in fiber-optic communications, where they permit transmission over longer distances and at higher bandwidths than electrical cables",
  },
  12: {
    word: "Git",
    question:
      "A distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers who are collaboratively developing source code during software development",
  },
};

let gallow = document.createElement("div");
let rightPart = document.createElement("div");
let question = document.createElement("div");
let keyboard = document.createElement("div");
let secret_word = document.createElement("div");

let body_in_gallow = document.createElement("div");
let head = document.createElement("div");
let left_arm_one = document.createElement("div");
let right_arm_two = document.createElement("div");
let belly = document.createElement("div");
let left_leg_one = document.createElement("div");
let right_leg_two = document.createElement("div");
let guesses_counter = document.createElement("div");
let incorrect_guesses = document.createElement("div");

let modal_window = document.createElement("div");
let message = document.createElement("div");
// fail or not
// let pic_left = document.createElement("div")
let secret_word_message = document.createElement("div");
let play_again_button = document.createElement("div");

document.body.appendChild(gallow);
document.body.appendChild(rightPart);
document.body.appendChild(modal_window);

gallow.appendChild(body_in_gallow);
body_in_gallow.appendChild(head);
body_in_gallow.appendChild(left_arm_one);
body_in_gallow.appendChild(right_arm_two);
body_in_gallow.appendChild(belly);
body_in_gallow.appendChild(left_leg_one);
body_in_gallow.appendChild(right_leg_two);

rightPart.appendChild(secret_word);
rightPart.appendChild(question);
rightPart.appendChild(guesses_counter);
rightPart.appendChild(incorrect_guesses);
rightPart.appendChild(keyboard);

modal_window.appendChild(message);
modal_window.appendChild(secret_word_message);
modal_window.appendChild(play_again_button);

rightPart.classList.add("rightPart");

secret_word.classList.add("secret_word");
question.classList.add("question");

gallow.classList.add("gallow");
body_in_gallow.classList.add("body_in_gallow");
head.classList.add("head");
left_arm_one.classList.add("left_arm_one");
right_arm_two.classList.add("right_arm_two");
belly.classList.add("belly");
left_leg_one.classList.add("left_leg_one");
right_leg_two.classList.add("right_leg_two");

guesses_counter.classList.add("guess_counter");
incorrect_guesses.classList.add("incorrect_guesses");
keyboard.classList.add("keyboard");

guesses_counter.textContent = "Incorrect guesses:";
incorrect_guesses.textContent = "0 / 6";

modal_window.classList.add("modal_window");
message.classList.add("message");
secret_word_message.classList.add("secret_word_message");
play_again_button.classList.add("play_again_button");

play_again_button.textContent = "Play again";

const myImage = new Image();
myImage.src = "images/gallows.png";
gallow.appendChild(myImage);

//logic
////////////////////////////////

let current_question =
  Math.floor(Math.random() * Object.keys(QA_obj).length) + 1;

let alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
let word_length = QA_obj[current_question].word.length;
question.textContent = QA_obj[current_question].question;
let current_word = QA_obj[current_question].word;
let attempts = 6;

function drawWordLine() {
  for (let i = 0; i < word_length; i++) {
    let newLine = document.createElement("div");
    newLine.classList.add("line");
    newLine.classList.add(`${i}`);
    secret_word.appendChild(newLine);

    if (current_word[i] === " ") {
      newLine.classList.remove("line");
      newLine.classList.add("empty_line");
    }
  }
}
drawWordLine();

// drawing the virtual keyboard
for (let i = 0; i < 26; i++) {
  let newLetter = document.createElement("div");
  newLetter.classList.add("letter");
  newLetter.classList.add(`${alphabet[i]}`);
  newLetter.textContent = alphabet[i];
  newLetter.addEventListener("click", () => {
    if (!newLetter.classList.contains("disabled")) {
      newLetter.classList.add("disabled");
      let key = newLetter.textContent;
      compare(key);
    }
  });
  keyboard.appendChild(newLetter);
}

let letter_key;
document.addEventListener("keypress", (e) => {
  disableButtons(e);
});

function disableButtons(e) {
  let key = e.key.toUpperCase();
  console.log(key);
  letter_key = document.querySelector(`.letter.${key}`);

  if (alphabet.includes(key) && !letter_key.classList.contains("disabled")) {
    console.log(letter_key);
    letter_key.classList.add("disabled");
    compare(key);
  }
}

let changed_line;
function compare(key) {
  let array_word_upper = current_word.toUpperCase().split("");
  let array_word = current_word.split("");
  if (array_word_upper.includes(key)) {
    let array_indexes = [];
    for (let i = 0; i < array_word_upper.length; i++) {
      if (array_word_upper[i] === key) {
        array_indexes.push(i);
        console.log(i);
        changed_line = document.querySelectorAll(`.secret_word div`)[i];
        console.log(changed_line);
        changed_line.textContent = array_word[i];
        changed_line.classList.remove("line");
      }
    }
  } else {
    attempts -= 1;
    drawDeadBody();
  }
  checkWin();
}

function drawDeadBody() {
  console.log(attempts);
  switch (attempts) {
    case 5:
      head.style.display = "block";
      break;
    case 4:
      belly.style.display = "block";
      break;
    case 3:
      left_arm_one.style.display = "block";
      break;
    case 2:
      right_arm_two.style.display = "block";
      break;
    case 1:
      left_leg_one.style.display = "block";
      break;
    case 0:
      right_leg_two.style.display = "block";
      fail();
      break;
  }
  incorrect_guesses.textContent = `${6 - attempts} / 6`;
}

function fail() {
  message.textContent = "YOU LOSE";
  modal_window.style.display = "block";
  message.style.color = "rgb(248, 36, 36)";
  secret_word_message.textContent = `SECRET WORD: ${current_word}`;
}

function checkWin() {
  let nodeListLines;
  nodeListLines = secret_word.querySelectorAll(".line");
  console.log(nodeListLines);
  console.log(nodeListLines.length);

  if (nodeListLines.length === 0) {
    message.textContent = "YOU WIN";
    modal_window.style.display = "block";
    message.style.color = "rgb(36, 248, 36)";
    secret_word_message.textContent = `SECRET WORD: ${current_word}`;
  }
}

play_again_button.onclick = () => {
  playAgain();
};

function playAgain() {
  modal_window.style.display = "none";
  attempts = 6;
  secret_word.innerHTML = "";
  incorrect_guesses.textContent = "0 / 6";

  head.style.display = "none";
  belly.style.display = "none";
  left_arm_one.style.display = "none";
  right_arm_two.style.display = "none";
  left_leg_one.style.display = "none";
  right_leg_two.style.display = "none";

  current_question = Math.floor(Math.random() * Object.keys(QA_obj).length) + 1;
  word_length = QA_obj[current_question].word.length;
  question.textContent = QA_obj[current_question].question;
  current_word = QA_obj[current_question].word;

  let keysNeedsToBeActive = keyboard.querySelectorAll(".letter");
  keysNeedsToBeActive.forEach((elem) => {
    elem.classList.remove("disabled");
  });
  console.log(keysNeedsToBeActive);

  drawWordLine();
}
