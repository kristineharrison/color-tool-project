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
            //Construct swatch squares
            const rgbSwatch = document.createElement('div')
            const hexSwatch = document.createElement('div')
            const cmykSwatch = document.createElement('div')
            const hslSwatch = document.createElement('div')
            const swatchTitle = document.createElement('h2')
            const rgbSwatchName = document.createElement('p')
            const hexSwatchName = document.createElement('p')
            const cmykSwatchName = document.createElement('p')
            const hslSwatchName = document.createElement('p')
            
            swatchTitle.textContent = colorData[0].name.value
            
            rgbSwatch.classList = "square"
            rgbSwatch.style.backgroundColor = colorData[0].rgb.value
            rgbSwatchName.textContent = `RGB: ${colorData[0].rgb.value}`
            rgbSwatch.append(rgbSwatchName)

            hexSwatch.classList = "square"
            hexSwatch.style.backgroundColor = colorData[0].hex.value
            hexSwatchName.textContent = `HEX: ${colorData[0].hex.value}`
            hexSwatch.append(hexSwatchName)

            // cmykSwatch.classList = "square"
            // cmykSwatch.style.backgroundColor = colorData[0].cmyk.value
            // cmykSwatchName.textContent = `CMYK: ${colorData[0].cmyk.value}`
            // cmykSwatch.append(cmykSwatchName)

            hslSwatch.classList = "square"
            hslSwatch.style.backgroundColor = colorData[0].hsl.value
            hslSwatchName.textContent = `HSL: ${colorData[0].hsl.value}`
            hslSwatch.append(hslSwatchName)

            document.querySelector('#color-swatch')
                .append(swatchTitle, hexSwatch, rgbSwatch, hslSwatch)

          


        
        })
    })
})