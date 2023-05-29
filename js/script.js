// function populateList() {
//     //const data = []
//     // for (let i = 0; i < 100; i++){
//     //     data.push(`Item ${(i + 1)}`)
//     // }

//     const data = Array.from({length: 100})
//     .map((_, i) => `<div class="item">Item ${(i + 1)}</div>`)

//     const list = document.querySelector('#paginate .list')
//     list.innerHTML = data.join("")
//     //console.log(data)

//     return data
// }
// const data = populateList()





const data = Array.from({length: 100})
    .map((_, i) => `Item ${(i + 1)}`)

// -------------------------------------------------------------------

const html = {
    get(element) {
        return document.querySelector(element)
    }
}

let perPage = 10
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

function update() {
    list.update()
    buttons.update()
    //console.log(state.page)
}

function init() {
    update()
    controls.createListeners()
}

init()
