document.addEventListener("DOMContentLoaded", () => {
  const url = "https://api.adviceslip.com/advice";
  const title = document.getElementById("advice-title");
  const advice = document.getElementById("advice");
  const button = document.getElementById("dice-button");

  async function generateAdvice() {
    const response = await fetch(url, { cache: "no-cache" });
    const data = await response.json();
    title.innerText = `ADVICE #${data.slip.id}`;

    const content = data.slip.advice;
    const chars = content.split(""); // array of characters
    advice.innerHTML = "&ldquo;"; // starting quote

    const intervalTime = 30; // ms per character
    let i = 0;

    const interval = setInterval(() => {
      advice.innerHTML += chars[i];
      i++;
      if (i === chars.length) {
        advice.innerHTML += "&rdquo;"; // closing quote
        clearInterval(interval);
      }
    }, intervalTime);
  }

  button.addEventListener("click", () => generateAdvice()); // total 3 seconds

  // Run once on load
  generateAdvice();
});
