function buscarApi(){
    // fetch('http://brapi.dev/api/quote/list')
    // .then(data => {
    //     return data.json();
    // })
    // .then(coins => {
    //     console.log(coins);
    // });

    fetch('http://brapi.dev/api/quote/list')
    .then(response => response.json())
    .then(data => {
        
        stocks = data.stocks
        console.log(stocks)

        const list = document.getElementById('lista')
        list.innerHTML = ""


        //const list = document.getElementById('lista')
        stocks.map((item) => {
            const li = document.createElement('div')    //const li = document.createElement('li');
            const divLogo = document.createElement('div')
            const image = document.createElement('img')
            const stock = document.createElement('h2')
            const spanNome = document.createElement('h4')
            const sector = document.createElement('span')
            const close = document.createElement('h2')
            const change = document.createElement('h5')
            const market_cap = document.createElement('span')
            const volume = document.createElement('span')
            
            //li.setAttribute('id', item.id);
            image.setAttribute('class', "logo")
            divLogo.setAttribute('class', "divLogo")
            li.setAttribute('class', "card_item")

            image.src = item.logo
            divLogo.appendChild(image) 

            stock.innerHTML = `stock: ${item.stock}`
            spanNome.innerHTML = item.name
            sector.innerHTML = item.sector
            close.innerHTML = `close: ${item.close}`
            change.innerHTML = `change: ${item.change}`
            market_cap.innerHTML = `market_cap: ${item.market_cap}</br>`
            volume.innerHTML = `volume: ${item.volume}`

            li.appendChild(divLogo)
            li.appendChild(stock)
            li.appendChild(spanNome)
            li.appendChild(sector)
            li.appendChild(close)
            li.appendChild(change)
            li.appendChild(market_cap)
            li.appendChild(volume)
            // li.style.backgroundImage = `url(${item.logo})`
            // li.style.backgroundSize = "cover"
            // li.style.position = "relative"
            // li.style.opacity = 0.8
            list.appendChild(li)  //.style(`background-image: ${item.logo}`)
        })
    });

    
}




function irHome(){
    const list = document.getElementById('lista')
    const home = document.createElement('div')
    const texto = document.createElement('p')

    const linha = document.createElement('hr')
    const linha2 = document.createElement('hr')

    texto.setAttribute('class', "texto")
    home.setAttribute('class', "pag_home")
    linha.setAttribute('class', "linha")
    linha2.setAttribute('class', "linha2")

    home.appendChild(linha)
    texto.textContent = "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    home.style.color  = "#e8a028"
    home.appendChild(texto)
    

    home.appendChild(linha2)
    home.style.border = "solid 2px #e8a028"

    list.innerHTML = ""
    list.appendChild(home)
    
}





