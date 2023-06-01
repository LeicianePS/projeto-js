let botaoApi = document.getElementById('botaoBuscarAPI')
botaoApi.onclick = function () {
    buscarApi() ;
};

let botaoAPIPaginacao = document.getElementById('botaoAPIPaginacao')
botaoAPIPaginacao.onclick = function () {
    init() ;
};


// let detalhe = document.getElementById('detalhe')
// detalhe.onclick = function () {
//     init() ;
// };


let ativo = 0

function buscarApi(){
    // fetch('http://brapi.dev/api/quote/list')
    // .then(data => {
    //     return data.json();
    // })
    // .then(coins => {
    //     console.log(coins);
    // });
    
    ativo = 2
    ativarBotao();

    const mostrarHome = document.getElementById('box')
    mostrarHome.style.display = 'none'
    const mostrarBuscaApi = document.getElementById('corpoApi')
    const mostrarBuscaPaginada = document.getElementById('paginate')
    mostrarBuscaApi.style.display = 'flex'
    mostrarBuscaPaginada.style.display = 'none'


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
            const sector = document.createElement('h4')
            const close = document.createElement('h2')
            const change = document.createElement('h5')
            const market_cap = document.createElement('h5')
            const volume = document.createElement('h5')
            
            const divDetalhe = document.createElement('div')

            //li.setAttribute('id', item.id);
            image.setAttribute('class', "logo")
            divLogo.setAttribute('class', "divLogo")
            li.setAttribute('class', "card_item")
            li.setAttribute('id', item.market_cap)
            divDetalhe.setAttribute('id', item.stock)

            image.src = item.logo
            divLogo.appendChild(image) 
            stock.innerHTML = `stock: ${item.stock}`
            spanNome.innerHTML = item.name

            sector.innerHTML = item.sector
            close.innerHTML = `close: ${item.close}`
            change.innerHTML = `change: ${item.change}`
            market_cap.innerHTML = `market_cap: ${item.market_cap}</br>`
            volume.innerHTML = `volume: ${item.volume}`


            divDetalhe.appendChild(sector)
            divDetalhe.appendChild(close)
            divDetalhe.appendChild(change)
            divDetalhe.appendChild(market_cap)
            divDetalhe.appendChild(volume)
            
            divDetalhe.style.display = 'none'

            li.appendChild(divLogo)
            li.appendChild(stock)
            li.appendChild(spanNome)

            li.appendChild(divDetalhe)
            li.addEventListener("mouseenter", (e) => {
                //let elem = document.querySelector('#lista')
                cardId = e.target.id
               // console.log(cardId)
                //let elem = document.querySelector(`#lista #${cardId}`) //.style.display = 'block';
                let elem = document.getElementById(`${cardId}`)
               // console.log(elem)
                detalhe = elem.querySelector(`:nth-child(4)`)
                //console.log(detalhe)
                detalhe.style.display = "block";
            });
            // li.appendChild(sector)
            // li.appendChild(close)
            // li.appendChild(change)
            // li.appendChild(market_cap)
            // li.appendChild(volume)



            // li.style.backgroundImage = `url(${item.logo})`
            // li.style.backgroundSize = "cover"
            // li.style.position = "relative"
            // li.style.opacity = 0.8
            list.appendChild(li)  //.style(`background-image: ${item.logo}`)


            
        })
    });    
}


// function mouseEnter() {
//     let elem = document.querySelector('#lista')
//     console.log(elem)
//     elem.querySelector(':nth-child(4)').style.display = 'block';
    
//     //document.getElementById(`${item_id}`).style.display = "block";
// }

async function buscarApiPaginado(){
    const response = await fetch('http://brapi.dev/api/quote/list')
    const data = await response.json();
    return data.stocks
}


async function init() {

    ativo = 3
    ativarBotao();

    const mostrarHome = document.getElementById('box')
    mostrarHome.style.display = 'none'

    const mostrarBuscaApi = document.getElementById('corpoApi')
    const mostrarBuscaPaginada = document.getElementById('paginate')
    mostrarBuscaApi.style.display = 'none'
    mostrarBuscaPaginada.style.display = 'block'

    let data = await buscarApiPaginado();
    //console.log(data)

    const html = {
        get(element) {
            return document.querySelector(element)
        }
    }
    
    let perPage = 8
    const state = {
        page: 1,
        perPage,
        totalPage: Math.ceil(data.length / perPage),
        maxVisibleButtons: 5
    }

    const controls = {
        next() {
            state.page++
    
            if(state.page > state.totalPage) {
                state.page--
            }
        },
        prev() {
            state.page--
    
            if(state.page < 1) {
                state.page++
            }
    
        },
        goTo(page) {
            if (page < 1) {
                page = 1
            }
    
            state.page = +page  // +page tansforma page em um numero
    
            if(page > state.totalPage) {
                state.page = state.totalPage
            }
        },

        createListeners(){
            html.get('.first').addEventListener('click', () => {
                controls.goTo(1)
                update()
            } )
    
            html.get('.last').addEventListener('click', () => {
                controls.goTo(state.totalPage)
                update()
            } )
    
            html.get('.next').addEventListener('click', () => {
                controls.next()
                update()
            } )
    
            html.get('.prev').addEventListener('click', () => {
                controls.prev()
                update()
            } )
        }
    }
    
    const list = {
        //const div = document.createElement('div')
        create(item) {
            // let acao = {
            //     nome: item.name,
            //     stock: item.stock,
            //     close: item.close,
            //     logo: item.logo
            // }
            // const div = document.createElement('div')
            // div.classList.add('item')
            // div.innerHTML = acao

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

            li.classList.add('item')
            
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
            //list.appendChild(li)  //.style(`background-image: ${item.logo}`)

            // const corpo = document.createElement("div")
            // li.setAttribute('class', "card_item")
            // corpo.style.color = "red"
            // corpo.appendChild(li)

            html.get('.list').appendChild(li)
        },
        update() {
            html.get('.list').innerHTML = ""
    
            let page = state.page - 1  // inicializando page = 0
            let start = page * state.perPage  // lógica para calcular o valor de inicio do slice
            let end = start + state.perPage     // lógica para calcular o valor do final do slice
            //console.log(data.slice(start, end))
            
            const paginatedItems = data.slice(start, end)
    
            paginatedItems.forEach(list.create)
        }
    }
    
    const buttons = {
        create(number) {
            const button = document.createElement('div')
    
            button.innerHTML = number
    
            if(state.page == number){
                button.classList.add('active')
            }
    
            button.addEventListener('click', (event) => {
                const page = event.target.innerText
                controls.goTo(page)
                update()
            })
    
            html.get('.pagination .numbers').appendChild(button)
        },
        update() {
            html.get('.pagination .numbers').innerHTML = ""
            const {maxLeft, maxRight} = buttons.calculeteMaxVisible()
    
            //console.log(maxLeft, maxRight)
            for (let page = maxLeft; page <= maxRight; page++) {
                buttons.create(page)
            }
        },
        calculeteMaxVisible(){
            const { maxVisibleButtons } = state
            let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
            let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))
    
            if(maxLeft < 1) {
                maxLeft = 1
                maxRight = maxVisibleButtons
            }
    
            if(maxRight > state.totalPage) {
                maxLeft = state.totalPage - (maxVisibleButtons - 1)
                maxRight = state.totalPage
    
                if(maxLeft < 1) maxLeft = 1
                    
            }
    
            return {maxLeft, maxRight}
        }
    }


    const update = () => {
        list.update()
        buttons.update()
    }
    update();
    controls.createListeners()
}




function irHome(){
    ativo = 1
    ativarBotao();

    const mostrarHome = document.getElementById('box')
    mostrarHome.style.display = 'flex'

    const mostrarBuscaApi = document.getElementById('corpoApi')
    const mostrarBuscaPaginada = document.getElementById('paginate')
    mostrarBuscaApi.style.display = 'none'
    mostrarBuscaPaginada.style.display = 'none'

    
    // const list = document.getElementById('lista')
    // const home = document.createElement('div')
    // const texto = document.createElement('p')

    // const linha = document.createElement('hr')
    // const linha2 = document.createElement('hr')

    // texto.setAttribute('class', "texto")
    // home.setAttribute('class', "pag_home")
    // linha.setAttribute('class', "linha")
    // linha2.setAttribute('class', "linha2")

    // home.appendChild(linha)
    // texto.textContent = "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    // home.style.color  = "#e8a028"
    // home.appendChild(texto)
    

    // home.appendChild(linha2)
    // home.style.border = "solid 2px #e8a028"

    // list.innerHTML = ""
    // list.appendChild(home)
    
}


irHome()

function ativarBotao() {
    if(parseInt(ativo) == 1){
        document.getElementById('botaoHome').classList.add('btn_active')

        document.getElementById('botaoBuscarAPI').classList.remove('btn_active')
        document.getElementById('botaoAPIPaginacao').classList.remove('btn_active')
    } else if(ativo == 2){
        document.getElementById('botaoBuscarAPI').classList.add('btn_active')

        document.getElementById('botaoHome').classList.remove('btn_active')
        document.getElementById('botaoAPIPaginacao').classList.remove('btn_active')
    }else if(ativo == 3){
        document.getElementById('botaoAPIPaginacao').classList.add('btn_active')

        document.getElementById('botaoBuscarAPI').classList.remove('btn_active')
        document.getElementById('botaoHome').classList.remove('btn_active')
    }
}

//init();

