const dice = document.getElementById("dice");

const rollButton = document.getElementById("rollButton");
const resultMessage = document.getElementById("resultMessage");

rollButton.addEventListener("click", rollDice);

const diceFaces = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2685"];

function rollDice() {
  const randomIndex = Math.floor(Math.random() * 6);

  dice.textContent = diceFaces[randomIndex];

  resultMessage.textContent = `You rolled a ${randomIndex + 1}`;
}
