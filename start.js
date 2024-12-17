const startImage = new Image()
startImage.src = './img/Startbildschirm.png'

const start = new Sprite ({
    position: {
    x: 0,
    y: 0,
    
    },
    image: startImage

})

let Handy = false

function animateStart(){
    

    document.querySelector('#movingInterface').style.display ='none'

    document.querySelector('#userinterface').style.display ='none'

    StartAnimationId = window.requestAnimationFrame(animateStart)

    start.draw()

    
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {


        if(e.currentTarget.innerHTML === "Handy") {

            Handy = true 
            
            cancelAnimationFrame(StartAnimationId)

            Transition()


        }

        else if(e.currentTarget.innerHTML === 'PC') {

            cancelAnimationFrame(StartAnimationId)

            Transition()
        }
    })
})

animateStart()
