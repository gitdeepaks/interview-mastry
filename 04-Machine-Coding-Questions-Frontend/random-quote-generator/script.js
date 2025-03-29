const quotes = [
    "Code is like humor. When you have to explain it, it’s bad.",
    "Simplicity is the soul of efficiency.",
    "First, solve the problem. Then, write the code.",
    "The best way to predict the future is to invent it.",
    "Programming is not about what you know; it’s about what you can figure out.",
    "Good code is its own best documentation.",
    "Talk is cheap. Show me the code.",
    "In programming, the hard part isn’t solving problems, but deciding what problems to solve.",
    "The only way to go fast is to go well.",
    "Debugging is being the detective in a crime movie where you are also the murderer."
];

const generateButton = document.getElementById('generateButton')
const quoteDisplay = document.getElementById('quoteDisplay')

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const quote = quotes[randomIndex]
    quoteDisplay.innerText = quote
}

generateButton.addEventListener('click', generateQuote)