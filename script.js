/* ===============================
   ❤️ Floating Hearts
================================ */
const container = document.querySelector('.hearts-container');
const hearts = ['❤️','💖','💕','💗','💘','💝'];
let heartInterval = null;

function startHearts() {
  if (heartInterval) return;
  heartInterval = setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (10 + Math.random() * 16) + 'px';
    heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }, 300);
}

/* ===============================
   🎵 Music
================================ */
const music = document.getElementById("bgMusic");

/* ===============================
   ⌨️ Main Typing Text
================================ */
const text1 = " 💕 💕 Hy my love 💕 💕";
const text2 =
"For all the love and care you’ve given me till today,\nthis small gift is my way of saying thank you from my heart to yours.";

const typingEl1 = document.getElementById("typing");
const typingEl2 = document.getElementById("typing2");

let i = 0, j = 0;

function typeFirst() {
  if (i < text1.length) {
    typingEl1.textContent += text1[i++];
    setTimeout(typeFirst, 100);
  } else {
    setTimeout(typeSecond, 500);
  }
}

function typeSecond() {
  if (j < text2.length) {
    typingEl2.textContent += text2[j++];
    setTimeout(typeSecond, 60);
  } else {
    typingEl1.classList.add("glow");
    typingEl2.classList.add("glow");
    setTimeout(() => memoriesBtn.classList.add("show"), 2000);
  }
}

/* ===============================
   ▶️ Start Button
================================ */
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const content = document.getElementById("content");

startBtn.onclick = () => {
  startBtn.style.animation = "startPop 0.6s ease forwards";

  setTimeout(() => {
    document.body.classList.add("started");
    startScreen.classList.add("hidden");
    content.classList.remove("hidden");

    startHearts();
    music.volume = 0.6;
    music.play();

    setTimeout(typeFirst, 2000);
  }, 600);
};

/* ===============================
   ✍️ Caption Typing Helper
================================ */
function typeCaption(el, text, done) {
  let k = 0;
  el.textContent = "";

  (function type() {
    if (k < text.length) {
      el.textContent += text[k++];
      setTimeout(type, 50);
    } else {
      done && done();
    }
  })();
}

/* ===============================
   📸 Memories Logic
================================ */
const memoriesBtn = document.getElementById("memoriesBtn");
const memoriesSection = document.getElementById("memoriesSection");
const cards = document.querySelectorAll(".memory-card");

let idx = 0;
let memoriesStarted = false;

memoriesBtn.onclick = () => {
  memoriesSection.classList.remove("hidden");
  memoriesSection.scrollIntoView({ behavior: "smooth" });

  if (memoriesStarted) return;
  memoriesStarted = true;

  (function showNext() {
    if (idx < cards.length) {
      const card = cards[idx];
      const img = card.querySelector(".memory");
      const caption = card.querySelector(".caption");
      const text = caption.textContent;

      img.classList.add("show");
      card.classList.add("show");

      typeCaption(caption, text, () => {
        idx++;

        // ⏱ Continue or move forward
        if (idx < cards.length) {
          setTimeout(showNext, 4000);
        } else {
          // ✅ ALL PHOTOS + CAPTIONS DONE
          setTimeout(startLoveSection, 3000);
        }
      });
    }
  })();
};

/* ===============================
   💘 Love Question Section
================================ */
const loveSection = document.getElementById("loveSection");
const loveTyping = document.getElementById("loveTyping");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function typeText(el, text, speed = 80, done) {
  let x = 0;
  el.textContent = "";
  (function type() {
    if (x < text.length) {
      el.textContent += text[x++];
      setTimeout(type, speed);
    } else {
      done && done();
    }
  })();
}

function startLoveSection() {
  loveSection.classList.remove("hidden");
  loveSection.scrollIntoView({ behavior: "smooth" });

  typeText(loveTyping, "Do You Love Me ❤️", 100, () => {
    yesBtn.classList.add("show");
    noBtn.classList.add("show");
  });
}

/* ===============================
   ❤️ YES FLOW
================================ */
const finalSection = document.getElementById("finalSection");
const finalTyping = document.getElementById("finalTyping");

yesBtn.onclick = () => {
  finalSection.classList.remove("hidden");
  finalSection.scrollIntoView({ behavior: "smooth" });

  typeText(
    finalTyping,
    "Sneha,\n\nI want you to know how incredibly important you are to me. You are not just someone I love . you are someone who feels like home to my heart. My feelings for you are deep, pure, and unconditional, and every day I realize more how much you mean to me.\n\nI promise you this: no matter what life brings, I will never walk away from you. In your happiest moments, I’ll celebrate with you, and in your darkest days, I’ll stand beside you without hesitation. Your ups and downs are not something I fear they are something I choose, because I choose you.\n\nWhen you feel strong, I’ll admire you. When you feel weak, I’ll protect you. When you smile, it becomes my happiness, and when you’re silent, I’ll still understand you. I won’t leave when things get difficult, because my love for you isn’t temporary—it’s steady, patient, and true.\n\nYou matter to me more than words can fully explain. You are my priority, my comfort, and my constant. As long as I breathe, you won’t face life alone—I’ll be right there, holding your hand, choosing you every single time.\n\nAlways yours. ❤️",
    70
  );
};

/* ===============================
   😼 NO FLOW
================================ */
const noSection = document.getElementById("noSection");
const noTyping = document.getElementById("noTyping");
const backBtn = document.getElementById("backBtn");

noBtn.onclick = () => {
  noSection.classList.remove("hidden");
  noSection.scrollIntoView({ behavior: "smooth" });

  typeText(
    noTyping,
    "HOW DARE YOU.............\nYOU ARE MINE\nYOU DONT HAVE THAT OPTION 😼",
    80,
    () => backBtn.classList.add("show")
  );
};

/* ===============================
   🔙 GO BACK
================================ */
backBtn.onclick = () => {
  loveSection.scrollIntoView({ behavior: "smooth" });
};
