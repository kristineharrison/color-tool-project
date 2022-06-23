document.addEventListener('DOMContentLoaded', () => {
    
    const form= document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
    //Fetch to The Color API
        fetch(`https://www.thecolorapi.com/id?hex=${e.target.hex.value}`)
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
            
            swatchTitle.textContent = colorData.name.value
            swatchTitle.style.color = colorData.hex.value

            swatch.classList = "square"
            swatch.style.backgroundColor = colorData.hex.value

            hexName.textContent = `HEX: ${colorData.hex.value}`
            rgbName.textContent = `RGB: ${colorData.rgb.value}`
            cmykName.textContent = `CMYK: ${colorData.cmyk.value}`
            hslName.textContent = `HSL: ${colorData.hsl.value}`

            colorList.append(hexName, rgbName, cmykName, hslName)
            document.querySelector('#color-swatch')
                .append(swatchTitle, swatch, colorList)

            //Change text script color
            const textContainer = document.querySelector('#text')
            textContainer.classList.remove('hidden')
            const textScript = document.querySelector('#text')
            textScript.style.color = colorData.hex.value

            //Save fetched color info to db.json
            function submitColor(color) {
                let newColor = {
                    rgb: colorData.rgb.value,
                    hex: colorData.hex.value,
                    cmyk: colorData.cmyk.value,
                    hsl: colorData.hsl.value,
                    name: colorData.name.value,
                }

                fetch('http://localhost:3000/colors', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newColor)
                })
                .then(res => res.json())
                .then(color => console.log(color))
                }
                submitColor(colorData)
            })
            

        })

        const textSample = document.querySelector('#text h2')
        textSample.textContent = "text"
        const textForm = document.querySelector('#text-form')
        textForm.addEventListener('submit', (e) => {
            e.preventDefault()
            textSample.textContent = e.target.sample.value
        })
        
        //Get complement color
        // fetch(`https://www.thecolorapi.com/scheme?hex=${e.target.hex.value}&mode=complement&count=1`)
        // .then(res => res.json())
        // .then(complementData => {
        //     console.log(complementData)
        //     const compSwatch = document.querySelector('#complement')
        //     compSwatch.src = complementData.colors[0].image.bare
        //     const compName = document.createElement('p')
        //     compName.textContent = complementData.colors[0].name.value
        //     document.querySelector('#schemes').append(compName)

        //Get analogous color
        // fetch(`https://www.thecolorapi.com/scheme?hex=${e.target.hex.value}&mode=analogic&count=3`)
        // .then(res => res.json())
        // .then(analogousData => {
        //     console.log(analogousData)
        //     const analogousSwatch = document.querySelector('#analogous')
        //     analogousSwatch.src = analogousData.image.bare
        //     const analogousName = document.createElement('p')
        //     analogousName.textContent = analogousData.colors[0].hex.value
        //     document.querySelector('#analogous').append(analogousName)

        // })
        
        
    })

