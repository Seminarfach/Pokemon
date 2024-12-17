const canvas = document.querySelector('canvas'); // definiert Variable mit konstantem Wert 

const ctx = canvas.getContext('2d'); // -"- , vorbestimmt 2d Zeichenelemente für das Canvas




ctx.canvas.width = 1024;
ctx.canvas.height= 576;

const collisionsMap = [] // Erstellt neues Array
 
for(let i =  0; i < collision.length; i+=70){// zur Erstellung von neuen Arrays für des Rechteck(Tile)
    collisionsMap.push(collision.slice(i, 70 + i)) // fügt Array alle 70 Stellen ein Neues hinzu
} // sodass man am Ende Collision wie Tiled abgebildet in Array-Format erhält


const riddleZonesMap = [] // Erstellt neues Array 

for(let i =  0; i < riddleZonesData.length; i+=70){
    riddleZonesMap.push(riddleZonesData.slice(i, 70 + i)) 
}







const classroomZonesMap = [] // Erstellt neues Array 

for(let i =  0; i < classroomZonesData.length; i+=70){
    classroomZonesMap.push(classroomZonesData.slice(i, 70 + i)) 
}




const boundaries = []

const offset = { // Variable für die vorgenommene Verschiebung des Hintergrundes
    x: -210,
    y: -300
}


collisionsMap.forEach((row, i) => { // Schleife für jede Reihe, "i" ist der Index der jeweiligen Reihe
    row.forEach((symbol, j) => { // Schleife für jedes Element innerhalb einer Reihe, "j" ist der Index des jeweiligen Elements
        if (symbol === 383)
        boundaries.push(new Boundary({position:{ // Erstellt neues Array mit x- u. y-Koordinate
            x: j * Boundary.width + offset.x , // x-Koordinate Rechtecke collisions + die Verschiebung
            y: i * Boundary.height + offset.y + 50 // y-Koordinate Rechtecke Collisions + die Verschiebung
        
            
        }}))
    })

} )

console.log(boundaries)


const riddleZones = []

riddleZonesMap.forEach((row, i) => { // Schleife für jede Reihe, "i" ist der Index der jeweiligen Reihe
    row.forEach((symbol, j) => { // Schleife für jedes Element innerhalb einer Reihe, "j" ist der Index des jeweiligen Elements
        if (symbol === 386)
        riddleZones.push(new Boundary({position:{ // Erstellt neues Array mit x- u. y-Koordinate
            x: j * Boundary.width + offset.x -35,// x-Koordinate Rechtecke collisions + die Verschiebung
            y: i * Boundary.height + offset.y -20// y-Koordinate Rechtecke Collisions + die Verschiebung
        
            
        }}))
    })

} )




const classroomZones = []

classroomZonesMap.forEach((row, i) => { // Schleife für jede Reihe, "i" ist der Index der jeweiligen Reihe
    row.forEach((symbol, j) => { // Schleife für jedes Element innerhalb einer Reihe, "j" ist der Index des jeweiligen Elements
        if (symbol === 386)
        classroomZones.push(new Boundary({position:{ // Erstellt neues Array mit x- u. y-Koordinate
            x: j * Boundary.width  , // x-Koordinate Rechtecke collisions + die Verschiebung
            y: i * Boundary.height // y-Koordinate Rechtecke Collisions + die Verschiebung
        
            
        }}))
    })

} )








const image = new Image(); // erstellt HTML Tag
image.src = './img/KlassenraumSpiel.png'; // Konstante wird mit Bild belegt

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png'


const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png'

const classroomBackgroundImage = new Image()
classroomBackgroundImage.src = './img/KlassenraumSpiel.png'

const classroomBackground = new Sprite ({
    position: {
    x: 0,
    y: 0,
    
    },
    image: classroomBackgroundImage

})




const player = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2, // Koordinaten x-Achse Mitte Haus
        y: canvas.height /2 - 68  / 2 // Koordinaten y-Achse Mitte 
       
       
    },
    image: playerDownImage,
    frames: { // wird benötigt um das Zuschneiden zu ermögliche, max kommt aus dem Sprite
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})


const background = new Sprite({
    position: {
       
       x: offset.x,
       y: offset.y + 50,
      
    },
    image: image 

})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage

})


const keys = {
    w: {
        pressed: false 
    },

    a: {
        pressed: false 
    },

    s: {
        pressed: false 
    },

    d: {
        pressed: false 
    },

    z: {
        pressed: false
    }
}


const movables = [background, ...boundaries, foreground, ...classroomZones, classroomBackground, ...riddleZones] // Array für alle beweglichen Objekte -> Vereinfachung
 
function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y 
    
    )

}

const riddle ={
    initiated: false
}

function initRiddle(){

    document.querySelector('#userInterface').style.display = 'none'

    document.querySelector('#movingInterface').style.display = 'none'

}



let movingtouchUp = false 

let movingtouchRight = false 

let movingtouchLeft = false 

let movingtouchDown = false 


function animate(){

    document.querySelector('#AuswahlID').style.display = 'none'

    document.querySelector('#userInterface').style.display = 'none'

    

    

    const animationId = window.requestAnimationFrame(animate)

    
    background.draw()
    
  
    riddleZones.forEach((boundary) => {
        boundary.draw()
    })
    
    boundaries.forEach((boundary) => {
        boundary.draw()
    })

    player.draw()
    //foreground.draw()

    let moving = true 

    
    player.moving = false

    if (Handy){
        document.querySelector('#movingInterface').style.display ='block'
    }
    else {
        document.querySelector('#movingInterface').style.display ='none'
    }
     

    if (riddle.initiated) return

    // Rätsel wird aktiviert
    if(keys.w.pressed || movingtouchUp) {
        for (let i = 0; i < riddleZones.length; i++) {
            const riddleZone = riddleZones [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: riddleZone,
                    
                }) 
               
                
            ) {
                // deactivate current animation loop
                window.cancelAnimationFrame(animationId)
                riddle.initiated = true
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete () {
                        gsap.to('#overlappingDiv',{
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // activate  a new animation loop
                                initRiddle()
                                animateRiddle()
                                gsap.to('#overlappingDiv',{
                                    opacity: 0,
                                    duration: 0.4,
                                  
                                })

                            }
                        })

                       

                        
                    }
                })

                break
                
            }
        }
    }

    
   

    if (keys.w.pressed || movingtouchUp) {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            ) {
                
                moving = false
                
                break
            }
        }

        

        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 3
            })
    

    
    } else if (keys.a.pressed || movingtouchLeft) {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                
                moving = false
                
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 3
            })
       
        


    } else if (keys.s.pressed || movingtouchDown) {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            ) {
                
                moving = false
                
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= 3
            })
       

    } else if (keys.d.pressed || movingtouchRight) {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries [i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                
                moving = false
              
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
    }


}



window.addEventListener('keydown', (e) => { // legt Werte für die Varibalen fest 
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
        break 

        case 'a':
            keys.a.pressed = true
        break 

        case 's':
            keys.s.pressed = true
        break 

        case 'd':
            keys.d.pressed = true 
        break 

        case 'z':
            keys.z.pressed = true
        break 
      
       

    }
        
})

window.addEventListener('keyup', (e) => { // legt Werte für die Varibalen fest 
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
        break 

        case 'a':
            keys.a.pressed = false
        break 

        case 's':
            keys.s.pressed = false
        break 

        case 'd':
            keys.d.pressed = false
        break 
        
        case 'z':
            keys.z.pressed = false 
       

    }
})     


document.getElementById('Up').addEventListener('touchstart', e => {
    
    movingtouchUp = true 
})

document.getElementById('Up').addEventListener('touchend', e => {
   
   movingtouchUp = false
})

document.getElementById('Right').addEventListener('touchstart', e => {
    
    movingtouchRight = true
})

document.getElementById('Right').addEventListener('touchend', e => {
  
   movingtouchRight = false
})

document.getElementById('Left').addEventListener('touchstart', e => {
    
    movingtouchLeft = true
})

document.getElementById('Left').addEventListener('touchend', e => {
   
   movingtouchLeft = false
})

document.getElementById('Down').addEventListener('touchstart', e => {
   
    movingtouchDown = true
})

document.getElementById('Down').addEventListener('touchend', e => {
   
   movingtouchDown = false
})


