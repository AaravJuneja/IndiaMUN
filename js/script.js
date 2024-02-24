async function initiateBackend() {
  return fetch("https://indiamun-backend.onrender.com/chalja/12ka4", {
    method: "GET"
  });
}

window.onload = async () => {
  try {
    const response = await initiateBackend();
    if (response.ok) {
      console.log("backend initiated");
    } else {
      console.log("Unsuccessful response:", response.status);
    }
  } catch (error) {
    console.log(error);
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => observer.observe(element));

async function sendData(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const text = document.getElementById("text").value;

  if (!email || !subject || !text) {
    return alert("Please enter all the details.");
  }

  alert("Sending email...");

  const data = {
    "userEmail": email,
    "subject": subject,
    "text": text
  };

  try {
    const response = await fetch("https://indiamun-backend.onrender.com/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(JSON.stringify(data));
      console.log("success");
      alert("Emails sent successfully. Check your inbox for confirmation");
    } else {
      console.log("Unsuccessful response:", response.status);
      alert("There was an error in sending the email. Please try again later.");
    }
  } catch (error) {
    console.error(error);
    alert("There was an error in sending the email. Please try again later.");
  }
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.getElementsByClassName("specialText")[0].onmouseover = event => {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
};

const hamburger = document.getElementById("hamburger");
const hamburgerMenu = document.getElementById("hamburgerMenu");
hamburger.addEventListener('click', (e) => {
  e.preventDefault();
  if (hamburgerMenu.classList.contains("phone-nav-menu-visible")) {
    hamburgerMenu.classList.add("phone-nav-menu-hidden");
    hamburgerMenu.classList.remove("phone-nav-menu-visible");
  } else {
    hamburgerMenu.classList.add("phone-nav-menu-visible");
  }
});

let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
};

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
};

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
  px = value => withUnit(value, "px"),
  ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
    diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
};

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
  removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createStar = position => {
  const star = document.createElement("span"),
    color = selectRandom(config.colors);

  star.className = "star fa-solid fa-star";

  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);

  appendElement(star);

  removeElement(star, config.starAnimationDuration);
};

const handleOnMove = e => {
  const mousePosition = { x: e.pageX, y: e.pageY };

  const now = new Date().getTime(),
    hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
    hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

  if (hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);

    last.starTimestamp = now;
    last.starPosition = mousePosition;
  }

  last.mousePosition = mousePosition;
};

window.onmousemove = e => handleOnMove;

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => {
  last.mousePosition = originPosition;
  document.body.style.cursor = 'auto';
};