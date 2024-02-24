async function initiateBackend() {
  return fetch("https://indiamun-backend.onrender.com/chalja/12ka4", {
    method: "GET"
  });
}

// Execute on window load
window.onload = async () => {
  try {
    const response = await initiateBackend();
    if (response.ok) {
      console.log("Backend initiated");
    } else {
      console.log("Unsuccessful response:", response.status);
    }
  } catch (error) {
    console.log("Error during backend initiation:", error);
  }
};

// Intersection Observer for elements with 'hidden' class
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

// Observe elements with 'hidden' class
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => observer.observe(element));

// Function to send data on form submission
async function sendData(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const text = document.getElementById("text").value;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return alert("Please enter a valid email address.");
  }

  if (!subject || !text) {
    return alert("Please enter both subject and message.");
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
      console.log("Success");
      alert("Email sent successfully. Check your inbox for confirmation");
    } else {
      handleErrorResponse(response.status);
    }
  } catch (error) {
    console.error("Error during fetch:", error);

    if (error instanceof TypeError && error.message === "Failed to fetch") {
      alert("Network error. Please check your internet connection and try again.");
    } else {
      alert("An unexpected error occurred. Please try again later.");
    }
  }
}

// Event listener for form submission
document.getElementById("sendButton").addEventListener('click', sendData);

// Star animation functionality
let interval = null;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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