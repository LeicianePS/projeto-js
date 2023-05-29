
async function buscarApi(){
   const response = await fetch('http://brapi.dev/api/quote/list')
   const data = await response.json();
    return data.stocks
}


async function init() {

    let data = await buscarApi();

    const html = {
        get(element) {
            return document.querySelector(element)
        }
    }
    
    let perPage = 10
    
    const list = {
        create(item) {
            const div = document.createElement('div')
            div.classList.add('item')
            div.innerHTML = item
    
            html.get('.list').appendChild(div)
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

    const update = () => {
        list.update()
        buttons.update()
    }
    update();
    controls.createListeners()
}

init();

