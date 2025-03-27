const startBtn = document.getElementById('startButton')
const timeInput = document.getElementById('timeInput')
const countdownDisplay = document.getElementById('countdownDisplay')

function startTimer() {
    let valueInSeconds = parseInt(timeInput.value)
    if (isNaN(valueInSeconds)) {
        countdownDisplay.innerText = 'Please enter a valid number'
        return
    }

    if (valueInSeconds <= 0) {

        countdownDisplay.innerText = ' Please enter the seconds > 0'
        return

    }

    const timer = setInterval(function () {
        valueInSeconds--
        countdownDisplay.innerText = `Time remaining ${valueInSeconds} seconds`

        if (valueInSeconds <= 0) {
            clearInterval(timer)
            countdownDisplay.innerText = 'Time is up 🕰️'

        }
    }, 1 * 1000)


}

// Task

startBtn.addEventListener('click', startTimer)