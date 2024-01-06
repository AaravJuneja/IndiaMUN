function updateCountdown() {
    const countdownElement = document.getElementById("countdown");
    const countDownDate = new Date("April 20, 2024 00:00:00").getTime();
    const intervalId = setInterval(updateDisplay, 1000);
  
    function updateDisplay() {
      const now = new Date().getTime();
      const distance = countDownDate - now;
  
      if (distance < 0) {
        clearInterval(intervalId);
        countdownElement.textContent = "MUN Open!";
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      const formattedCountdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      countdownElement.textContent = formattedCountdown;
    }
  }
  
  updateCountdown();  
  