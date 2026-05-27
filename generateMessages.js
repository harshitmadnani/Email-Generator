const fs = require("fs");

const openers = [
  "Good morning meri pyaari ❤️",
  "Good morning beautiful ☀️",
  "Hello sleepyhead 😄",
  "Uth jao princess 👑",
  "Morning jaan 💕",
  "Good morning cutie 😘",
  "Oye sunshine 🌸"
];

const cuteLines = [
  "You look cutest in the morning honestly",
  "I still smile seeing your sleepy face",
  "Your hugs are my favorite thing ever",
  "Life feels peaceful with you",
  "I love our little moments together",
  "You make home feel special",
  "You’re literally my comfort person",
  "Even normal days feel better with you",
  "I love annoying you all day 😄",
  "You’re my daily dose of happiness",
  "I could spend all day just talking to you",
  "I love waking up knowing you’re mine"
];

const flirtyLines = [
  "You owe me a morning hug 😏",
  "You’re too cute to handle honestly",
  "Still not over how pretty you are",
  "I need extra cuddles today 🥺",
  "You look dangerous when you smile 😘",
  "I swear you get prettier every day",
  "Your smile fixes my mood instantly",
  "I’m definitely stealing kisses later 😄"
];

const caringLines = [
  "Eat properly today okay ❤️",
  "Don’t stress too much today jaan",
  "Take care of yourself for me 💕",
  "Hope your day goes super smoothly",
  "Remember to smile today ☀️",
  "I know you’ll do amazing today",
  "Stay happy and hydrated 😄"
];

const endings = [
  "Love youuuu ❤️",
  "Now go and shine ✨",
  "Have the cutest day 😘",
  "See you soon cutie 💕",
  "Can’t wait to annoy you again 😄",
  "Big hug for you 🥺",
  "Forever grateful for you ❤️"
];

const emojis = ["❤️", "💕", "😘", "🥺", "😄", "✨", "🌸", "☀️"];

const messages = [];

for (let i = 0; i < 500; i++) {
  const opener = openers[Math.floor(Math.random() * openers.length)];
  const cute = cuteLines[Math.floor(Math.random() * cuteLines.length)];
  const flirt = flirtyLines[Math.floor(Math.random() * flirtyLines.length)];
  const care = caringLines[Math.floor(Math.random() * caringLines.length)];
  const ending = endings[Math.floor(Math.random() * endings.length)];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  const type = Math.random();

  let msg = "";

  if (type < 0.25) {
    msg = `${opener} ${emoji}\n\n${cute}. ${ending}`;
  } 
  else if (type < 0.5) {
    msg = `${opener} ${emoji}\n\n${cute}. ${care}. ${ending}`;
  } 
  else if (type < 0.75) {
    msg = `${opener} ${emoji}\n\n${flirt}. ${cute}. ${ending}`;
  } 
  else {
    msg = `${opener} ${emoji}\n\n${care}. ${flirt}. ${ending}`;
  }

  messages.push(msg);
}

fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));

console.log("✅ 500 cute realistic romantic messages generated!");