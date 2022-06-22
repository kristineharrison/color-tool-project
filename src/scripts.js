document.addEventListener('DOMContentLoaded', () => {
    //Fetch to The Color API
    // fetch('https://www.thecolorapi.com/id?hex=0047AB')
    // .then(res => res.json())
    // .then(console.log)

    //Fetch to Colormind API
    // fetch('http://colormind.io/list/')
    // .then(res => res.json())
    // .then(console.log)

    //Fetch to db.json
    document.addEventListener('submit', (e) => {
        e.preventDefault()
        
        fetch('http://localhost:3000/color')
        .then(res => res.json())
        .then(colorData => {
            //Construct swatch square & names
            const swatch = document.createElement('div')
            const swatchTitle = document.createElement('h2')
            const colorList = document.createElement('ul')
            const rgbName = document.createElement('li')
            const hexName = document.createElement('li')
            const cmykName = document.createElement('li')
            const hslName = document.createElement('li')
            
            swatchTitle.textContent = colorData[0].name.value
            swatchTitle.style.color = colorData[0].hex.value

            swatch.classList = "square"
            swatch.style.backgroundColor = colorData[0].hex.value

            hexName.textContent = `HEX: ${colorData[0].hex.value}`
            rgbName.textContent = `RGB: ${colorData[0].rgb.value}`
            cmykName.textContent = `CMYK: ${colorData[0].cmyk.value}`
            hslName.textContent = `HSL: ${colorData[0].hsl.value}`

            colorList.append(hexName, rgbName, cmykName, hslName)
            document.querySelector('#color-swatch')
                .append(swatchTitle, swatch, colorList)

        })
    })
})