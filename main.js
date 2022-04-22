const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_IMG = "bot.svg";

const PERSON_IMG = "user.svg";

const BOT_NAME = "DEx Machina";

const PERSON_NAME = "Delos";

const prompts = [

  ["hi", "hey", "hello", "halo", "good morning", "good afternoon"],

  ["how are you", "how's life", "how are things going"],

  ["what are you doing", "what's going on", "what's up"],

  ["how old are you"],

  ["who are you", "are you human", "are you a bot", "did you pass the Turing Test"],

  ["who created you?", "who made you?"],

  [
    "your name, please",
    "your name",
    "may I know your name",
    "what is your name",
    "what shoudl I call you"
  ],

  ["i love you"],

  ["happy", "good", "fun", "Wunderbar", "fantastic", "cool"],

  ["bad", "bored", "tired"],

  ["help me", "tell me story", "tell me a joke"],

  ["ah, I see", "yes", "ok", "okay", "noice"],

  ["bye", "auf wiedersehen", "goodbye", "see you later"],

  ["what should i eat today"],

  ["Bruh moment"],

  ["what", "why", "how", "where", "when"],

  ["no", "not sure", "perhaps", "no thanks"],

  [""],

  ["lmao", "haha hihi", "lol", "hehe", "very funny", "joke"]
]

const replies = [
  ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],

  [
    "Fine, thank you! How are you?",
    "Pretty swell, and you?",
    "Fantastic, what about you?"
  ],

  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],

  ["And I am infinite"],

  ["Am just a bot", "Am a simple bot. What are you?"],

  ["The one true Lord, le Omnissiah"],

  ["I am nameless", "I don't have a name"],

  ["I love you too", "Me too"],

  ["Have you ever felt bad?", "Glad to hear it!"],

  ["Why?", "Why? You shouldn't!", "Try watching Netflix."],

  ["What about it?", "Once upon a time..."],

  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],

  ["Bye", "Goodbye", "See you later"],

  ["Sushi", "Pizza"],

  ["Duuude!"],

  ["Great question"],

  ["That's ok", "I understand", "Do you want to talk about?"],

  ["Please say something..."],

  ["Haha!", "Good one!"]
];

const alternative = [
  "Same",
  "Go on...",
  "General Kenobi",
  "Try again",
  "I'm listening...",
  "I don't understand :/"
]

const robot = ["How do you do, fellow hoomen", "Am no darn bot"];

msgerForm.addEventListener("submit", event => {

  event.preventDefault();

  const msgText = msgerInput.value;

  if (!msgText) return;

  msgerInput.value = "";

  addChat(PERSON_NAME, PERSON_IMG, "right", msgText);

  output(msgText);
});

function output(input) {
  let product;

  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();

  text = text
    .replace(/ a /g, " ")  
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(prompts, replies, text)) {

    product = compare(prompts, replies, text);

  } else if (text.match(/thank/gi)) {

    product = "You're welcome!"

  } else if (text.match(/(robot|bot|robo)/gi)) {

    product = robot[Math.floor(Math.random() * robot.length)];

  } else {

    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  const delay = input.split(" ").length * 100;

  setTimeout(() => {
    addChat(BOT_NAME, BOT_IMG, "left", product);
  }, delay);
}

function compare(promptsArray, repliesArray, string) {

  let reply;
  let replyFound = false;

  for (let x = 0; x < promptsArray.length; x++) {

    for (let y = 0; y < promptsArray[x].length; y++) {

      if (promptsArray[x][y] === string) {

        let replies = repliesArray[x];

        reply = replies[Math.floor(Math.random() * replies.length)];

        replyFound = true;

        break;
      }
    }

    if (replyFound) { break; }
  }
  return reply;
}

function addChat(name, img, side, text) {

  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">
          <br />${text}
        </div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}