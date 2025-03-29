const colorInput = document.getElementById('colorInput')
const colorCode = document.getElementById('colorCode')
const copyButton = document.getElementById('copyButton')
const complementryContainer = document.getElementById('complementryContainer')
const saveCoderButton = document.getElementById('saveCoderButton')
const favaourateContainer = document.getElementById('favaourateContainer')


colorInput.addEventListener('input', () => {
    const selectedColor = colorInput.value

    updateColorDisplay(selectedColor)
    showComplementaryColor(selectedColor)
})

function updateColorDisplay(color) {
    colorCode.textContent = color
    colorCode.style.color = color
}

function showComplementaryColor(color) {
    const complementoryColors = getComplementoryColor(color)
    complementryContainer.innerHTML = "" //clear previous color

    complementoryColors.forEach((compColor) => {
        const colorBox = document.createElement('div')
        colorBox.classList.add('color-box')
        colorBox.style.backgroundColor = compColor
        complementryContainer.appendChild(colorBox)
    })
}

function getComplementoryColor(color) {
    const base = parseInt(color.slice(1), 16)
    const complement = (0xFFFFFF ^ base).toString(16).padStart(6, '0')

    return [`#${complement}`]

}


copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(colorCode.textContent).then(() => alert('Color code copied')).catch(err => console.log('failed to copy')
    )
})

saveCoderButton.addEventListener('click', () => {
    const color = colorCode.textContent
    addFavouriteColor(color)
})

function addFavouriteColor(color) {
    document.createElement('div')
    colorBox.classList.add('color-box')
    colorBox.style.backgroundColor = color
    colorBox.title = color

    favaourateContainer.appendChild(color)

}