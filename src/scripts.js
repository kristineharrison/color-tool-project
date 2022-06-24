document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('h1')
    const body = document.querySelector('body')
    const darkBtn = document.querySelector('#moon')
    const lightBtn = document.querySelector('#sun')
    const swatch = document.createElement('div')
    const swatchTitle = document.createElement('h2')
    const colorList = document.createElement('ul')
    const rgbName = document.createElement('li')
    const hexName = document.createElement('li')
    const cmykName = document.createElement('li')
    const hslName = document.createElement('li')
    const previousContainer = document.querySelector('#previous')
    
    
    //Toggle light & dark mode
    darkBtn.addEventListener('mouseenter', () => {
        body.classList.add('dark')
    })
    lightBtn.addEventListener('mouseenter', () => {
        body.classList.remove('dark')
    })

    //Submit hex value & return color info
    const form= document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
       

        //Display schemes
        const complementScheme = document.querySelector('#complement')
        const analogicScheme = document.querySelector('#analogous')
        const monochromeScheme = document.querySelector('#monochrome')
        const schemeDefs = document.querySelector('#scheme-defs')
        schemeDefs.classList.remove('hidden')
        complementScheme.classList.remove('hidden')
        analogicScheme.classList.remove('hidden')
        monochromeScheme.classList.remove('hidden')

        //Fetch to The Color API
        fetch(`https://www.thecolorapi.com/id?hex=${e.target.hex.value}`)
        .then(res => res.json())
        .then(colorData => {
            //Construct swatch square & names
            h1.style.color = colorData.hex.value
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

            //Change text script & icon color
            const textContainer = document.querySelector('#text')
            const textScript = document.querySelector('#text')
            textContainer.classList.remove('hidden')
            textScript.style.color = colorData.hex.value
            darkBtn.style.color = colorData.hex.value
            lightBtn.style.color = colorData.hex.value

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
                form.reset()
            })

        //Previously viewed colors
        //Fetch from db.json
        fetch('http://localhost:3000/colors')
        .then(res => res.json())
        .then(previousData => previousData.forEach((eachColor) => {
            const previousColor = document.createElement('div')
            previousColor.classList = "sm-square"
            previousColor.style.background = eachColor.hex
    
            previousColor.addEventListener('click', () => {
                gradientContainer.classList.add('hidden')
                complementScheme.classList.add('hidden')
                analogicScheme.classList.add('hidden')
                monochromeScheme.classList.add('hidden')
                schemeDefs.classList.add('hidden')
                swatchTitle.textContent = eachColor.name
                swatchTitle.style.color = eachColor.hex
                h1.style.color = eachColor.hex
    
                swatch.classList = "square"
                swatch.style.backgroundColor = eachColor.hex
    
                hexName.textContent = `HEX: ${eachColor.hex}`
                rgbName.textContent = `RGB: ${eachColor.rgb}`
                cmykName.textContent = `CMYK: ${eachColor.cmyk}`
                hslName.textContent = `HSL: ${eachColor.hsl}`
                textSample.style.color = eachColor.hex
                
                //Add delete button
                const btn = document.createElement('button')
                btn.textContent = " x "
                btn.addEventListener('click',()=> {
                    fetch(`http://localhost:3000/colors/${eachColor.id}`, {
                        method:'DELETE'
                    })
                    .then(() => previousColor.remove())
                })
                previousColor.appendChild(btn)
            })
            previousContainer.append(previousColor)
        }))


        //Get complement color
        fetch(`https://www.thecolorapi.com/scheme?hex=${e.target.hex.value}&mode=complement&count=1`)
        .then(res => res.json())
        .then(complementData => {
            const complementSwatch = document.querySelector('#complementImg')
            complementSwatch.src = complementData.colors[0].image.named
        })
        
        //Get analogous color
        fetch(`https://www.thecolorapi.com/scheme?hex=${e.target.hex.value}&mode=analogic&count=3`)
        .then(res => res.json())
        .then(analogousData => {
            const analogousSwatch = document.querySelector('#analogousImg')
            analogousSwatch.src = analogousData.image.named
        })

        //Get monochrome color
        fetch(`https://www.thecolorapi.com/scheme?hex=${e.target.hex.value}&mode=monochrome&count=4`)
        .then(res => res.json())
        .then(monochromeData => {
            const monochromeSwatch = document.querySelector('#monochromeImg')
            monochromeSwatch.src = monochromeData.image.named
        })

        //Create gradient
        const gradientContainer = document.querySelector('#gradient')
        const gradientBox = document.createElement('div')
        const gradientBtn = document.createElement('button')
        const color1 = e.target.hex.value
        const color1Name = document.createElement('p')
        const color2Name = document.createElement('p')

        gradientContainer.innerHTML = ""
        gradientContainer.classList.remove('hidden')
        gradientBox.classList = ("rectangle")
        gradientBtn.textContent = "Create Gradient"
        
        const setGradient = () => {
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            gradientBox.style.background = `linear-gradient(to right, #${color1}, #${randomColor})`

            color1Name.textContent = `Color One: #${color1}`
            color2Name.textContent = `Color Two: #${randomColor}`
        }
        gradientBox.append(gradientBtn)
        document.querySelector('#gradient').append(gradientBox, color1Name, color2Name)
        
        gradientBtn.addEventListener('click', setGradient)
    })
    
    //Sample text color
    const textSample = document.querySelector('#text h2')
    const textForm = document.querySelector('#text-form')
    textSample.textContent = "sample text"
    textForm.addEventListener('submit', (e) => {
        e.preventDefault()
        textSample.textContent = e.target.sample.value

        textForm.reset()
    })
}) 

//Select font
function getOption(selectFont) {
    var listValue = selectFont.options[selectFont.selectedIndex].value;
    document.querySelector("#text h2").style.fontFamily = listValue;
}