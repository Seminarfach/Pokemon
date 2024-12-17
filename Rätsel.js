const riddleBackgroundImage = new Image()
riddleBackgroundImage.src = './img/Tafel_groß.png'

const riddleBackground = new Sprite ({
    position: {
    x: -100,
    y: -50,
    
    },
    image: riddleBackgroundImage

})

const SudokuImage = new Image()
SudokuImage.src = './img/Sudoku.png'

const Sudoku = new Sprite ({
    position: {
    x: 385,
    y: 75,
    
    },
    image: SudokuImage

})



let riddleAnimationId

const Answers = {
    initiated: false
}


function Transition () {
    gsap.to('#overlappingDiv',{
        opacity: 1,
        onComplete: () => {
            cancelAnimationFrame(riddleAnimationId)
            animate()
            document.querySelector('#userInterface').style.display = 'none'
            gsap.to ('#overlappingDiv', {
                opacity: 0                
            })
            riddle.initiated = false
        }
    })
}

function animateRiddle(){

    document.querySelector('#movingInterface').style.display ='none'

    document.querySelector('#userinterface').style.display ='block'
    
    riddleAnimationId = window.requestAnimationFrame(animateRiddle)
    riddleBackground.draw()
    Sudoku.draw()

    if (keys.z.pressed)  {
        Transition()
        keys.z.pressed = false
        Answers.initiated = false
        
        document.querySelector('#Content').style.display = 'block'
    }

}



document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        if(e.currentTarget.innerHTML === 'x:2 | y:4 | z:3') {

            document.querySelector('#Content').style.display = 'none'

            
            document.querySelector('#DialogBox').innerHTML = 'Falsch, bitte versuche es nochmal! Bitte drücke (Z) zum fortfahren'

           Transition()
            
        }

        else if(e.currentTarget.innerHTML === 'x:1 | y:3 | z:4') {
            document.querySelector('#Content').style.display = 'none'
            
            document.querySelector('#DialogBox').innerHTML = 'Richtig, ein neuer Raum wartet auf dich! Bitte drücke (Z) zum fortfahren'

            Transition()
        }

        else if(e.currentTarget.innerHTML === 'x:1 | y:4 | z:3') {
            
            document.querySelector('#Content').style.display = 'none'
            
            document.querySelector('#DialogBox').innerHTML = 'Falsch, bitte versuche es nochmal! Bitte drücke (Z) zum fortfahren'
          
            Transition()
        }

        else if(e.currentTarget.innerHTML === 'x:2 | y:4 | z:1') {
            document.querySelector('#Content').style.display = 'none'
            

            document.querySelector('#DialogBox').innerHTML = 'Falsch, bitte versuche es nochmal! Bitte drücke (Z) zum fortfahren'
           
            Transition()
        }
    })
})

