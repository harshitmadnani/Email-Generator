const fs = require("fs");

const openers = [
  "Good morning my love ❤️",
  "Hey beautiful 😘",
  "Good morning jaan ☀️",
  "Wake up sleepyhead 😄",
  "Good morning meri jaan 💕"
];

const feelings = [
  "I miss you a little extra today",
  "I can’t stop thinking about you",
  "You’re the best thing in my life",
  "You make everything feel better",
  "I still get butterflies because of you",
  "I just want to hug you tight",
  "You’re always on my mind"
];

const flirty = [
  "I would have definitely stolen a kiss if you were here 😏",
  "You’re dangerously cute, you know that?",
  "I think I’m addicted to you 😄",
  "Not fair how attractive you are even in my thoughts",
  "I need my morning hug from you soon 🥺"
];

const deep = [
  "I feel really lucky to have you in my life",
  "You’ve changed my life in ways you don’t even realize",
  "You are my peace and my happiness",
  "Loving you is the easiest thing I’ve ever done"
];

const endings = [
  "Have an amazing day ahead 💖",
  "Go win your day princess 👑",
  "Don’t forget I love you ❤️",
  "Come back soon, I miss you already 🥺",
  "Sending you a tight hug 😘"
];

const emojis = ["❤️", "💕", "😘", "🥺", "💖", "😏", "🌸", "💘"];

const messages = [];

for (let i = 0; i < 500; i++) {
  const type = Math.random();

  const opener = openers[Math.floor(Math.random() * openers.length)];
  const feel = feelings[Math.floor(Math.random() * feelings.length)];
  const flirt = flirty[Math.floor(Math.random() * flirty.length)];
  const deepLine = deep[Math.floor(Math.random() * deep.length)];
  const end = endings[Math.floor(Math.random() * endings.length)];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  let msg = "";

  // 💡 Random structures (THIS is key)
  if (type < 0.3) {
    msg = `${opener} ${emoji}\n\n${feel}. ${end}`;
  } else if (type < 0.6) {
    msg = `${opener} ${emoji}\n\n${feel}... ${flirt}. ${end}`;
  } else if (type < 0.8) {
    msg = `${opener} ${emoji}\n\n${deepLine}. ${feel}. ${end}`;
  } else {
    msg = `${opener} ${emoji}\n\n${flirt}. ${deepLine}. ${end}`;
  }

  messages.push(msg);
}

fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));
console.log("🔥 500 REALISTIC romantic messages generated!");