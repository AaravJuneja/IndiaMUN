// Function to initiate the backend on window load
async function initiateBackend() {
  try {
    const response = await fetch("https://indiamun-backend.onrender.com/chalja/12ka4", { method: "GET" });

    if (response.ok) {
      console.log("Backend initiated");
    } else {
      console.log("Unsuccessful response:", response.status);
    }
  } catch (error) {
    console.log("Error during backend initiation:", error);
  }
}

// Function to handle intersection observer callback
function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}

// Function to observe elements with 'hidden' class
function observeHiddenElements() {
  const observer = new IntersectionObserver(handleIntersection);
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((element) => observer.observe(element));
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to handle form submission
async function sendData(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const text = document.getElementById("text").value;

  if (!isValidEmail(email)) {
    return alert("Please enter a valid email address.");
  }

  if (!subject || !text) {
    return alert("Please enter both subject and message.");
  }

  alert("Sending email...");

  const data = {
    userEmail: email,
    subject: subject,
    text: text
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
      console.log("Success");
      alert("Email sent successfully. Check your inbox for confirmation");
    } else {
      handleErrorResponse(response.status);
    }
  } catch (error) {
    handleFetchError(error);
  }
}

// Function to handle fetch errors
function handleFetchError(error) {
  console.error("Error during fetch:", error);

  if (error instanceof TypeError && error.message === "Failed to fetch") {
    alert("Network error. Please check your internet connection and try again.");
  } else {
    alert("An unexpected error occurred. Please try again later.");
  }
}

// Function to handle non-OK responses
function handleErrorResponse(status) {
  console.log("Error response:", status);
  alert("Error sending email. Please try again later.");
}

// Function to handle star animation on mouseover
function handleStarAnimation(event) {
  let iteration = 0;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const target = event.target;

  clearInterval(target.interval);

  target.interval = setInterval(() => {
    target.innerText = target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= target.dataset.value.length) {
      clearInterval(target.interval);
    }

    iteration += 1 / 3;
  }, 30);
}

// Event listeners
window.onload = initiateBackend;
observeHiddenElements();
document.getElementById("sendButton").addEventListener('click', sendData);
document.querySelector('.specialText').addEventListener('mouseover', handleStarAnimation);

// Scroll functionality
window.scroll({ top: 2500, left: 0, behavior: 'smooth' });
window.scrollBy({ top: 100, left: 0, behavior: 'smooth' });
document.querySelector('.hello').scrollIntoView({ behavior: 'smooth' });