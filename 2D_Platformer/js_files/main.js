
window.addEventListener("load", (event) => { 
//////////////////////
    // DEFAULT // 
//////////////////////

const ctx = canvas1.getContext('2d')
const CANVAS_WIDTH = canvas1.width = 1200
const CANVAS_HEIGHT = canvas1.height = 600


const musicLevel = new Audio()
musicLevel.src = './assets/music/Westopolis.mp3'
musicLevel.volume = volumeMusic.value / 1000

const bullAudio = new Audio()
bullAudio.src = './assets/sounds/B6_ENEMY_42_bull.wav'
// bullAudio.play()

const soldierAppear = new Audio()
soldierAppear.src = './assets/sounds/B6_ENEMY_19_sold.wav'

const playerImage = new Image()
playerImage.src = 'shadow_sprites.png';

const playerImageGun = new Image()
playerImageGun.src = 'shadow_gun_gems.png';

const enemyImageBat = new Image()
enemyImageBat.src = './assets/images/Bat/Spritesheets/Purple_Flying.png'
let gameFrameEnemy = 0

const soldierImage = new Image()
soldierImage.src = './assets/images/Aliens.png'

const emerald = new Image()
emerald.src = './assets/images/emerald.png'

const healthBarImg = new Image()
healthBarImg.src = './assets/images/UI.png'

volumeMusic.value = 15
volumeSound.value = 45

volumeMusic.style.background = `linear-gradient(to right, #b40000 ${volumeMusic.value}%, rgb(150, 150, 150) ${volumeMusic.value}%)`;
volumeSound.style.background = `linear-gradient(to right, #b40000 ${volumeSound.value}%, rgb(150, 150, 150) ${volumeSound.value}%)`;



const spritHeight = 44
let gameFrame = 0
let staggerFrames
let playerState = 'stay'


let lifecount = 5

let getHitFlag = false 
let score = 0

let gameOver = false
let pause = false 
let win = false
let menuNow = true
let musicPlays = false
let gameTimer = 0

let totalScore 
////////////////////////////////////////////
 // SPRITES ARRAYS // 
////////////////////////////////////////////

let spriteAnimations = 
    {        
        stay: {
            loc: [
                {x: 5, y: 22, wd : 35}
            ],
            staggerFrames: 12
        },
        idle: {
            loc: [
                {x: 205, y: 22, wd : 35},
                {x: 205, y: 22, wd : 35},
                {x: 205, y: 22, wd : 35},
                {x: 239, y: 22, wd : 35},
                {x: 275, y: 22, wd : 35},
                {x: 309, y: 22, wd : 35},
                {x: 344, y: 22, wd : 35},
                {x: 378, y: 22, wd : 35},
                {x: 412, y: 22, wd : 35},
                {x: 450, y: 22, wd : 35},
                {x: 485, y: 22, wd : 35},
                {x: 520, y: 22, wd : 35},
                {x: 560, y: 22, wd : 35},
                {x: 560, y: 22, wd : 35},
            ],
            staggerFrames: 12
        },
        walk: {
            loc: [
                {x: 7, y: 118, wd: 30},
                {x: 37, y: 118, wd: 35},
                {x: 73, y: 118, wd: 40},
                {x: 120, y: 118, wd: 40},
                {x: 159, y: 118, wd: 34},
                {x: 192, y: 118, wd: 35},
                {x: 228, y: 118, wd: 38},
                {x: 268, y: 118, wd: 40},
            ],
            staggerFrames: 6
        },
        run: {
            loc: [
                {x: 8, y: 163, wd: 37}, //0
                {x: 44, y: 163, wd: 35}, //1 
                {x: 79, y: 163, wd: 48}, //2
                {x: 126, y: 163, wd: 44},
                {x: 175, y: 163, wd: 49},
                {x: 227, y: 163, wd: 48},
                {x: 280, y: 163, wd: 52},
                {x: 332, y: 163, wd: 48},
                {x: 382, y: 163, wd: 52},
                {x: 437, y: 163, wd: 50},
                {x: 490, y: 163, wd: 50},
                {x: 545, y: 163, wd: 50},
                {x: 600, y: 163, wd: 41}, // 12
                {x: 640, y: 163, wd: 41}, //13 
                {x: 8, y: 210, wd: 36}, //14
                {x: 44, y: 210, wd: 36}, //15
                {x: 82, y: 210, wd: 50}, //16
                {x: 130, y: 210, wd: 42}, //17
                {x: 176, y: 210, wd: 50}, //18
                {x: 227, y: 210, wd: 48}, //19
                {x: 278, y: 210, wd: 42}, //20
                {x: 322, y: 210, wd: 42}, //21
                {x: 367, y: 210, wd: 44}, //22
                {x: 412, y: 210, wd: 49}, //23
                {x: 462, y: 210, wd: 47}, //24
                {x: 510, y: 210, wd: 48}, //25
                {x: 565, y: 210, wd: 40}, //26
                {x: 605, y: 210, wd: 38}, //27
                {x: 645, y: 210, wd: 47}, //28
            ],
            staggerFrames: 4
        },
        slowdown: {
            loc: [
                {x: 458, y: 119, wd: 35},
                {x: 496, y: 119, wd: 38},
                {x: 537, y: 119, wd: 37},
                {x: 575, y: 119, wd: 37}
            ]

        ,staggerFrames: 5
        },
        attack: {
            loc: [
                {x: 620, y: 260, wd: 35},
                {x: 655, y: 260, wd: 35},
                {x: 690, y: 260, wd: 35},
                {x: 725, y: 260, wd: 35},
                {x: 765, y: 255, wd: 40},
            ]
        ,staggerFrames: 5
        },
        hit: {
            loc: [
                {x: 438, y: 310, wd: 39},
                {x: 479, y: 310, wd: 39},
            ]
        ,staggerFrames: 2
        },
        death: {
            loc: [
                {x: 282, y: 310, wd: 39},
            ]
        ,staggerFrames: 5
        },
        shooting: {
            loc: [
                {x: 365, y: 560, wd: 50},
                {x: 414, y: 560, wd: 55},
            ]
        ,staggerFrames: 2
        }
        
    };


    let spriteAnimationsBat = [
        { x: 0, y: 0},
        { x: 33, y: 0},
        { x: 66, y: 0},
        { x: 97, y: 0},
        { x: 0, y: 30},
        { x: 33, y: 30},
    ]
    
    let spriteAnimationsSoldier = [
        { x: 0, y: 0, wd: 85}, // 0
        { x: 87, y: 0, wd: 85}, //1 
        { x: 178, y: 0, wd: 83}, // 2
        { x: 267, y: 0, wd: 90}, // 3
        { x: 380, y: 0, wd: 100}, // 4
        { x: 482, y: 0, wd: 110}, // 5
        { x: 605, y: 0, wd: 110}, // 6
        { x: 15, y: 94, wd: 105}, // 7
        { x: 125, y: 94, wd: 100}, //8 
        { x: 225, y: 94, wd: 85}, //9 
        { x: 325, y: 94, wd: 85},//10
        { x: 412, y: 94, wd: 95}, //11
        { x: 515, y: 94, wd: 85},//12
        { x: 620, y: 94, wd: 90},  //13
        { x: 5, y: 188, wd: 105}, //14
        { x: 110, y: 188, wd: 105}, //15
        { x: 235, y: 188, wd: 105}, //16
        { x: 345, y: 188, wd: 85}, //17 
        { x: 432, y: 188, wd: 85}, // 18
    ]

    
    let healthBar = [
        {x: 192, y: 60}, //0
        {x: 192, y: 60}, //1
        {x: 144, y: 60}, //2
        {x: 96, y: 60}, //3
        {x: 48, y: 60}, //4 
        {x: 0, y: 60} //5
    ]

//////////////////////
// GAME BACKGROUND //
//////////////////////
let gameSpeed = 4
let gameFrameBg = 0
let path = 0

const backgroundLayer1 = new Image()
backgroundLayer1.src = './assets/images/layer.png'
const backgroundLayer2 = new Image()
backgroundLayer2.src = './assets/images/red_fog.png'
const backgroundLayer3 = new Image()
backgroundLayer3.src = './assets/images/asphalt.png'

class Layer {
    constructor(image, speedModifier, wd, ht, dx, dy) {
        this.x = 0
        this.y = 0
        this.width = wd
        this.height = ht
        this.destX = dx
        this.destY = dy
        this.x2 = this.width
        this.image = image 
        this.speedModifier = speedModifier
        // this.speed = gameSpeed * this.speedModifier
        this.speed = 0
        this.Fog = 0
        this.speedFog = 0
        this.frames = 0
    }
    update(input) {
    if (this.image === backgroundLayer2) {
        this.speedFog = (gameSpeed * this.speedModifier) * 0.4
        this.Fog = (gameFrameBg *  this.speedFog % this.width);
    } else {
        if (getHitFlag === false && loseFlag === false) {

        if (input.keys.indexOf('a') > -1 || input.keys.indexOf('ф') > -1) {
            this.speed = -(gameSpeed * this.speedModifier * 0.8)
            this.x += (2 * this.speed % this.width);
            if (this.x < 0 - this.width) this.x = 0
            path -= Math.abs(this.x / 700)
           
        } else if (input.keys.indexOf('d') > -1 || input.keys.indexOf('в') > -1) {
            this.speed = gameSpeed * this.speedModifier
            this.x += 2 * this.speed % this.width;
            if (this.x > this.width) this.x = 0
            path += Math.abs(this.x / 700)
        } else {
            this.speed = 0
        } 
    }
    }
    console.log(Math.floor(path / 100))
    }
    draw(){
        // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height, 0 , this.destY, CANVAS_WIDTH, this.height)
        ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height, 0, this.destY, CANVAS_WIDTH, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height, 0, this.destY, CANVAS_WIDTH, this.height)
    }
    drawIndepend(){
        ctx.drawImage(backgroundLayer2, this.Fog, this.y, this.width, this.height, 0 , this.destY, CANVAS_WIDTH, this.height)
        ctx.drawImage(backgroundLayer2, this.Fog - this.width, this.y, this.width, this.height, 0, this.destY, CANVAS_WIDTH, this.height)
    }
}
const layer1 = new Layer(backgroundLayer1, 0.2, 1200, 600, 0, 0)
const layer2 = new Layer(backgroundLayer2, 0.4, 878, 400, 0, 200)
const layer3 = new Layer(backgroundLayer3, 0.8, 958, 100, 0, 500)
//////////////////////
   // WIN EMERALD //
//////////////////////


class Emerald {
    constructor() {
        this.globalX = -2500
        this.x = -1000  
        this.y = 0
        this.width = 350
        this.height = 350
        this.destX = 0
        this.destY = this.height + 50
        this.image = emerald
    }
    update(){
        console.log('emeralx '+this.x)
        this.x = this.globalX + path
        console.log('path='+path)

        // ctx.beginPath()
        // ctx.arc(-6.85 * this.x, this.y + this.height + 100, this.width/15, 0, Math.PI * 2)
        // ctx.stroke()
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height, 0 , this.destY, this.width * 6, this.height * 6)
    }
}
let emeraldDraw = new (Emerald)

//////////////////////
    // EFFECTS //
//////////////////////
 
const explosions = []
let canvasPostion = canvas1.getBoundingClientRect()

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

class Explosion {
    constructor(x, y){
      
        this.spriteWidth = 17
        this.spriteHeight = 17 
        this.width = this.spriteWidth * 4
        this.height = this.spriteHeight * 4
        this.x = x - this.width/2 -6
        this.y = y - this.height/2
        this.image = new Image()
        this.image.src = './assets/images/Green_Effects.png'
        this.sound = new Audio()
        this.sound.volume = volumeSound.value / 500
        this.sound.src = './assets/sounds/B6_ENEMY_64_bat.wav'
        this.frame = 0;
        this.timer = 0
    }
    update(){
        this.timer++;
        if (this.frame === 0) this.sound.play()
        if (this.timer % 5 === 0) {
            this.frame++
        }
        this.sound.volume = volumeSound.value / 500
            // delay(500).then(() => {
            //     this.frame++ })
            // console.log('this.frame='+this.frame)
    }
    draw(){
        ctx.drawImage(this.image, (this.spriteWidth * this.frame)-2.5, 0,  this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}



class SoldierExplode extends Explosion {
    constructor(x, y){
        super()
        this.image.src = './assets/images/Purple_Effects.png'
        this.sound.src = './assets/sounds/B6_ENEMY_sold_dead.wav'
        this.spriteWidth = 17
        this.spriteHeight = 17 
        this.width = this.spriteWidth * 7
        this.height = this.spriteHeight * 7
        this.x = x + this.width/2 
        this.y = y + this.height/2
    }
}

class fireExplode extends Explosion {
    constructor(x, y){
        super()
        this.image.src = './assets/images/Fire_effects.png'
        this.sound.src = './assets/sounds/B6_ENEMY_43_fire.wav'
        this.spriteWidth = 16.48    
        this.spriteHeight = 17 
        this.width = this.spriteWidth * 25
        this.height = this.spriteHeight * 25
        this.x = CANVAS_WIDTH/2 -  this.width /2
        this.y = CANVAS_HEIGHT/2 - this.height /2
    }
}

function startExplosion(e) {
    let positionX = e.x 
    let positionY = e.y 
    if (e.type === 'bat') {
        explosions.push(new Explosion(positionX, positionY)) 
    } else if (e.type === 'soldier') {explosions.push(new SoldierExplode(positionX, positionY))}
     else explosions.push(new fireExplode(positionX, positionY)) 
}

// document.addEventListener('click', (e) => {
//     startExplosion(e)
// })

//////////////////////////////////
    // LOCAL STORAGE //
////////////////////// ////////////

let scoreList = document.querySelectorAll('#leaderboards_window .score') 

if (!localStorage.getItem("leaderboard")) {
    var obj = {
        '0': '0000',
    };
    var serialObj = JSON.stringify(obj);
    localStorage.setItem("leaderboard", serialObj);
    var returnObj = JSON.parse(localStorage.getItem("leaderboard")) 
    scoreList[0].innerHTML =  returnObj[0]
}
var returnObj = JSON.parse(localStorage.getItem("leaderboard")) 
for (let i = 0; i < Object.keys(returnObj).length && i < 10; i++) {
    scoreList[i].innerHTML = returnObj[i]
}

if (JSON.parse(localStorage.getItem("leaderboard"))[0] === '0000'){
    scoreList[0].innerHTML =  '0000'
}
let test 
let arrayValues = []

function compareNumbers(a, b) {
    return b - a;
  }

function setLeaderBoard() {
    
    var returnObj = JSON.parse(localStorage.getItem("leaderboard"))

    let count = Object.keys(returnObj).length
    if (count > 9) count = 9
     arrayValues.push(totalScore)
     console.log(arrayValues)

    for (let i = 0; i < count; i++) {
        arrayValues.push(Object.values(returnObj)[i])
    }

    arrayValues.sort(compareNumbers)

    delay(100).then(() => {
        for (let i = 0; i <= count; i++) {

            returnObj[i] = arrayValues[i]
            
            localStorage.setItem('leaderboard', JSON.stringify(returnObj))
    
            scoreList[i].innerHTML = returnObj[i]
        }
    })
  
}


//////////////////////////////////
  // GAME SETTINGS AND INPUTS //
////////////////////// ////////////

let winflag = false
let loseFlag = false

function loseFunc(e) {
    if (loseFlag === true) 
    e.x += 50   
    e.y -= 150
    e.position = 0
    emeraldDraw.x = -1000
    e.playerState = 'death'
    delay(300).then(() => gameOver = true)
    delay(1000).then(() => flagNoSpaceBar = false)
}

let flagNoSpaceBar = true

function winFunc(){
    input.keys.splice(input.keys.indexOf(' '), 1)
        flagNoSpaceBar = true
        emeraldDraw.x = -1000
        if (winflag === true) startExplosion(canvas1)
        delay(300).then(() => {
            totalScore = ((score / (gameTimer * 0.001) * 100)*100).toFixed(0)
            setLeaderBoard()
            win = true
            // flagNoSpaceBar = false
        })
        delay(2000).then(() => flagNoSpaceBar = false)
}



function reset() {
    arrayValues = []
    pause = false
    loseFlag = false 
    winflag = false
    gameOver = false
    win = false
    enemies = []
    player.state = 'stay'
    player.speed = 0
    player.x  = 0
    player.y  = player.gameHeight - player.height - 60
    path = 0
    score = 0
    gameTimer = 0  
    lifecount = 5
    gameFrameBg = 0; 
    gameFrame = 0
}

function getHit(e) {
if (getHitFlag === true) {
    if (lifecount >= 1 ) lifecount -= 1
    e.x -= 120
    e.y -= 130
    e.position = 0
    e.playerState = 'hit'
    delay(1000).then(() => {
    e.position = 0
    e.playerState = 'stay'
    })
}  
}

class InputHanlder {
    constructor(){
        this.keys = []

        if (!gameOver && !win) {
        window.addEventListener('keydown', e => {
            if ((e.key.toLowerCase() === 'w' ||  
                 e.key.toLowerCase() === 'a' ||  
                 e.key.toLowerCase() === 's' ||  
                 e.key.toLowerCase() === 'd' ||  
                 e.key.toLowerCase() === 'ц' ||  
                 e.key.toLowerCase() === 'ф' ||  
                 e.key.toLowerCase() === 'ы' ||  
                 e.key.toLowerCase() === 'в' ||  
                 e.key.toLowerCase() === ' ' )  
                && this.keys.indexOf(e.key.toLowerCase()) === -1) {
                this.keys.push(e.key.toLowerCase())
            }
        })
        window.addEventListener('keyup', e => {
            if (e.key.toLowerCase() === 'w' ||  
                e.key.toLowerCase() === 'a' ||  
                e.key.toLowerCase() === 's' ||  
                e.key.toLowerCase() === 'd' ||  
                e.key.toLowerCase() === 'ц' ||  
                e.key.toLowerCase() === 'ф' ||  
                e.key.toLowerCase() === 'ы' ||  
                e.key.toLowerCase() === 'в' ||  
                e.key.toLowerCase() === ' ') {
                player.update(input)
                this.keys.splice(this.keys.indexOf(e.key.toLowerCase()), 1)
            }
        })
    }
// spacebar 
    window.addEventListener('keydown', e => {
        if(e.key === ' ' && win === true && flagNoSpaceBar === false)  {
            //
            flagNoSpaceBar = true
            reset()
         animationLoop(0)
        }

        if(e.key === ' ' && gameOver === true && flagNoSpaceBar === false)  {
            //
            flagNoSpaceBar = true
            reset()
         animationLoop(0)
        }
     })

    window.addEventListener('keydown', e => {
        if(e.key === 'Escape' && gameOver === true || e.key === 'Escape' && win === true )  {
            menuNow = true
            menuMain.style.display = 'grid'
            ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
        }
     })
     window.addEventListener('keydown', e => {
        if(e.key === 'Shift')  {
            menuNow = true
            menuMain.style.display = 'grid'
            reset()
            ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
            settings_menu.style.display = 'none'
    menuMain.style.display = 'grid'
    canvas1.style.backgroundImage = 'url(./assets/images/Shadow_the_Hedgehog.jpg)' 
    canvas1.style.backgroundPosition = 'center'
        }
     })
    }
}



//////////////////////
// MAIN CHARACTER //
////////////////////// 


class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth / 2
        this.gameHeight = gameHeight
        this.width = 150
        this.height = 150
        this.x = 0
        this.y = this.gameHeight - this.height - 60
        this.image = playerImage
        this.position = 0
        this.playerState = 'stay'
        this.frameX = spriteAnimations[this.playerState].loc[this.position].x
        this.frameY = spriteAnimations[this.playerState].loc[this.position].y
        this.spriteWidth = spriteAnimations[this.playerState].loc[this.position].wd
        this.speed = 1
        this.vy = 0
        this.weight = 1
    }
    draw(context){
        const spriteHeight = 44
        ctx.strokeStyle = 'White'
        // ctx.beginPath()
        // ctx.arc(this.x + this.width/2.7, this.y + this.height/2.7, this.width/2.7, 0, Math.PI * 2)
        // ctx.stroke()
        if (playerState === 'shooting') {
            ctx.drawImage(playerImageGun, this.frameX, this.frameY, this.spriteWidth, spriteHeight, this.x, this.y, this.spriteWidth*3, spriteHeight*3)
        } else ctx.drawImage(playerImage, this.frameX, this.frameY, this.spriteWidth, spriteHeight, this.x, this.y, this.spriteWidth*3, spriteHeight*3)
    }
    updateEn(enemies){
        // ------------------------------
        // collision detection
        if (enemies.length > 0) {
            enemies.forEach(enemy => {
                if (enemy.type === 'bull') {
                    if (getHitFlag === false) {
                let dx = (enemy.x + enemy.width/3) - (this.x + this.width/2.7)
                let dy = (enemy.y + enemy.height/2) - (this.y + this.height/2.7)
                let distance = Math.sqrt(dx*dx+dy*dy)
                if (distance < enemy.width/4 + this.width/2.7) {
                                getHitFlag = true
                                getHit(this)
                                delay(1000).then(() => getHitFlag = false)
                }
                }
                }
                if (enemy.type === 'bat') { 
                    if (getHitFlag === false) {
                        let dx = (enemy.x + enemy.width/2.4) - (this.x + this.width/2.7)
                        let dy = (enemy.y + enemy.height/2) - (this.y + this.height/2.7)
                        let distance = Math.sqrt(dx*dx+dy*dy)
                        if (distance < enemy.width/3 + this.width/2.7) {
                            if (this.playerState === 'attack') {
                                startExplosion(enemy)
                                enemy.markForDeletion = true
                                score++
                            } else {
                                getHitFlag = true
                                getHit(this)
                                delay(1000).then(() => getHitFlag = false)
                    }
                        } 
                    }
                }
                if (enemy.type === 'soldier') { 
                    if (getHitFlag === false) {
                        let dx = (enemy.x + enemy.width/2) - (this.x + this.width/2.7)
                        let dy = (enemy.y + enemy.height/2) - (this.y + this.height/2.7)
                        let distance = Math.sqrt(dx*dx+dy*dy)
                        if (distance < enemy.width/3 + this.width/2.7) {
                            if (this.playerState === 'attack') {
                                startExplosion(enemy)
                                enemy.markForDeletion = true
                                score++
                            } else {
                                getHitFlag = true
                                getHit(this)
                                delay(1000).then(() => getHitFlag = false)
                            }
                        } 
                    }
                }
            })
        }
        // WIN
        // ctx.arc(-6.85 * this.x, this.y + this.height + 100, this.width/15, 0, Math.PI * 2)
        if (winflag === false) {
        let dx_em = (-6.85 * emeraldDraw.x) - (this.x + this.width/2.7)
        let dy_em = (emeraldDraw.y + emeraldDraw.height + 100) - (this.y + this.height/2.7)
        let distance = Math.sqrt(dx_em*dx_em+dy_em*dy_em)
        if (distance < emeraldDraw.width/25 + this.width/2.7) {
                winflag = true 
                winFunc()
            }
            if (path >= 2500) {
                flagNoSpaceBar = true
                winflag = true 
                winFunc()
            } 
            }
        if (loseFlag === false) {
            if (lifecount === 0) {
                loseFlag = true; 
                loseFunc(this);
            } 
        }    
        }

  
    update(input){
console.log(flagNoSpaceBar)
        
        // ----------------------------------
        // screen default

        if (this.x < 0) this.x = 0;
        else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width 
        // ------------------------------
        // Input movement

if (getHitFlag === false && loseFlag === false) {
    this.x += this.speed
    if (input.keys.indexOf(' ') > -1 && this.onGround()) {
        this.vy -= 20
    }  else if (input.keys.indexOf('a') > -1 ||input.keys.indexOf('ф') > -1) {
        this.speed = -4
    } else if (input.keys.indexOf('d') > -1 ||input.keys.indexOf('в') > -1) {
        this.speed = 4
    } else {
        this.speed = 0
        if (this.playerState !== 'idle' && this.playerState !== 'hit' && this.playerState !== 'attack') {
            this.playerState = 'stay'
            this.position = 0
        }
    }
}
        // ------------------------------
        // verical movement
        this.y += this.vy
        if (this.y > this.gameHeight - this.height - 65) this.y = this.gameHeight - this.height - 65

        if (!this.onGround()){
            if (getHitFlag === false) this.playerState = 'attack'
            this.vy += this.weight
        } else {
            this.vy = 0
            if (this.playerState !== 'idle' && this.playerState !== 'hit' && this.playerState !== 'death') this.playerState = 'stay'
        }
        // -----------------------
        // animations
        if (getHitFlag === false && loseFlag === false) {
        if (input.keys.indexOf('a') > -1 || input.keys.indexOf('ф') > -1 ) {
            if (this.playerState !== 'hit' && this.playerState !== 'death') this.playerState = 'walk'
        }
        if (input.keys.indexOf('d') > -1 || input.keys.indexOf('в') > -1) {
            if (this.playerState !== 'hit' && this.playerState !== 'death') this.playerState = 'run'
        }
        if (!this.onGround()) {
            if (this.playerState !== 'hit' && this.playerState !== 'death') this.playerState = 'attack'
        }
        if (input.keys.length === 0) {
            if (this.playerState !== 'idle' && this.playerState !== 'hit' && this.playerState !== 'attack') {
                this.playerState = 'stay'
                this.position = 0
            }
            if (gameFrame % 400 === 0) {
                if (this.playerState !== 'hit' && this.playerState !== 'death') this.playerState = 'idle'
            } 
            this.frameX = spriteAnimations[this.playerState].loc[this.position].x
            this.frameY = spriteAnimations[this.playerState].loc[this.position].y
            this.spriteWidth = spriteAnimations[this.playerState].loc[this.position].wd
        }
    }
        // -----------------------------
        //  play animation
        staggerFrames = spriteAnimations[this.playerState].staggerFrames
        // this.position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length
        if (gameFrame % staggerFrames == 0) {
            if (this.position < spriteAnimations[this.playerState].loc.length-1) {
                this.position++ 
                this.frameX = spriteAnimations[this.playerState].loc[this.position].x
                this.frameY = spriteAnimations[this.playerState].loc[this.position].y
                this.spriteWidth = spriteAnimations[this.playerState].loc[this.position].wd
            } else {
                this.position = 0
                this.frameX = spriteAnimations[this.playerState].loc[this.position].x
                this.frameY = spriteAnimations[this.playerState].loc[this.position].y
                this.spriteWidth = spriteAnimations[this.playerState].loc[this.position].wd
            } 
        }  
    }
    onGround(){
        return this.y >= this.gameHeight - this.height - 65
    }
}


//////////////////////
    // ENEMIES //
////////////////////// 

class Enemies {
    constructor(game){
        this.enemyInterval = 100; 
        this.enemyTypes = ['bat', 'bull', 'soldier']
        this.game = game
        this.speed = 8
        this.image
        this.markForDeletion = false
    }
    update(){
        this.x -= this.speed
        if (this.x < 0 - this.width) this.markForDeletion = true
    }
    draw(ctx){
        // ctx.beginPath()
        // ctx.arc(this.x + this.width/2.4, this.y + this.height/2, this.width/4, 0, Math.PI * 2)
        // ctx.stroke()
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

class Bull extends Enemies {
    constructor(game){
        super(game)
        this.type = 'bull'
        this.enemyTimer = 0; 
        this.spriteWidth = 250
        this.spriteHeight = 200
        this.width = this.spriteWidth * 1.7
        this.height = this.spriteHeight * 1.7
        this.x = CANVAS_WIDTH
        this.y = CANVAS_HEIGHT - this.height + 20
        this.speed = 10
        this.image = bull;
    }
    update(){
        this.x -= this.speed
        if (this.x < 0 - this.width) this.markForDeletion = true
    }
    draw(){
        ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    //     ctx.globalAlpha = 0.5
    //     super.draw(ctx)
    }
}

class Bat extends Enemies{
    constructor(game){
        super(game)
        this.enemyTimer = 0; 
        this.type = 'bat'
        this.x = CANVAS_WIDTH; 
        this.y = Math.random() * canvas1.height;
        this.width = 60;
        this.height = 60;
        this.speed = Math.random() * 4 + 2
        this.spriteWidth = 28
        this.spriteHeight = 28
        this.dx = spriteAnimationsBat[0].x
        this.dy = spriteAnimationsBat[0].y
        this.flapSpeed = Math.floor(Math.random() * 4 + 3)
        this.position = 0
        this.frameX = spriteAnimationsBat[this.position].x
        this.frameY = spriteAnimationsBat[this.position].y
        this.angle = 0
        this.angleSpeed =  Math.random() * 0.2
    }
    update() {
        //  ctx.beginPath()
        // ctx.arc(this.x + this.width/2.4, this.y + this.height/2, this.width/3, 0, Math.PI * 2)
        // ctx.stroke()
        this.x -= this.speed
        this.y += 2 * Math.sin(this.angle)
        if (this.x < 0 - this.width) this.markForDeletion = true
        this.angle += this.angleSpeed
        if (gameFrameEnemy %  this.flapSpeed === 0) {
            this.position > 4 ? this.position = 0 : this.position++
            this.frameX = spriteAnimationsBat[this.position].x
            this.frameY = spriteAnimationsBat[this.position].y
        }
    }
    draw(){
        // ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(enemyImageBat, this.frameX, this.frameY, this.spriteWidth,  this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}    

class Soldier extends Enemies {
    constructor(){
        super()
        this.enemyTimer = 0; 
        this.position = 0
        this.type = 'soldier'
        this.spriteWidth = spriteAnimationsSoldier[this.position].wd
        this.spriteHeight = 95
        this.width = this.spriteWidth * 2.1
        this.height = this.spriteHeight * 2.1
        this.x = CANVAS_WIDTH
        this.y = CANVAS_HEIGHT - this.height - 80
        this.speed = 4
        this.staggerFrames = 10
        this.image = soldierImage;
        this.frameX = spriteAnimationsSoldier[this.position].x
        this.frameY = spriteAnimationsSoldier[this.position].y
    }
    update(){
        //       ctx.beginPath()
        // ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/3, 0, Math.PI * 2)
        // ctx.stroke()
        soldierAppear.volume = volumeSound.value / 500
        this.x -= this.speed
        if (this.x < 0 - this.width) this.markForDeletion = true
        if (this.x + this.width < 0) this.x = canvas1.width
            if (gameFrame %  this.staggerFrames === 0) {
                this.position > 17 ? this.position = 0 : this.position++
                this.frameX = spriteAnimationsSoldier[this.position].x
                this.frameY = spriteAnimationsSoldier[this.position].y
                this.spriteWidth = spriteAnimationsSoldier[this.position].wd
            }
            
    }
    draw(){

            // ctx.strokeRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(soldierImage, this.frameX, this.frameY, this.spriteWidth,  this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

let BullInterval = 20000
let SoldierInterval = 5000
let BatInterval = 3000
let BullTimer = 0
let BatTimer = 0
let SoldierTimer = 0
let enemies = []


function handleElements(deltaTime){
    if (BatTimer > BatInterval) {
        enemies.push(new Bat(this))
        BatTimer = 0 
    } else BatTimer += deltaTime

    if (BullTimer > BullInterval){
        enemies.push(new Bull(this))
        enemies.push(new Bat(this))
        bullAudio.volume = volumeSound.value / 300
        bullAudio.play()
        BullTimer = 0 
    } else BullTimer += deltaTime

    if (SoldierTimer > SoldierInterval){
        enemies.push(new Soldier(this))
        soldierAppear.play()
        SoldierTimer = 0 
    } else SoldierTimer += deltaTime

    enemies.forEach(enemy => {
        enemy.draw(ctx)
        enemy.update()
    })
    enemies = enemies.filter(enemy => !enemy.markForDeletion)
}

//////////////////////
  // MENU SETTINGS //
////////////////////// 


let flagTimerStart = false


function displayStatusText(context, deltaTime){


if (!pause && !gameOver && !win && !menuNow) gameTimer += deltaTime    

if (!gameOver && !win) {
    context.font = '20px Courier New'
    context.fillStyle = ' black'
    context.textAlign = 'center'
    context.fillText('Score: ' + score, CANVAS_WIDTH - 101, 29)
    context.fillText('Time: ' + (gameTimer * 0.001).toFixed(1), CANVAS_WIDTH - 101, 49)
    context.fillText('Move: WASD', CANVAS_WIDTH - 101, 89 )
    context.fillText('Attack: Spacebar',CANVAS_WIDTH - 141, 109)
    context.fillText('Esc: Pause',CANVAS_WIDTH - 101, 129)
    context.fillStyle = ' white'

    context.fillText('Score: ' + score, CANVAS_WIDTH - 100, 28)
    context.fillText('Time: ' + (gameTimer * 0.001).toFixed(1), CANVAS_WIDTH - 100, 48)
    context.fillText('Move: WASD', CANVAS_WIDTH - 100, 88 )
    context.fillText('Attack: Spacebar',CANVAS_WIDTH - 140, 108 )
    context.fillText('Esc: Pause',CANVAS_WIDTH - 100, 128 )
}
// ctx.drawImage(soldierImage, this.frameX, this.frameY, this.spriteWidth,  this.spriteHeight, this.x, this.y, this.width, this.height)
ctx.drawImage(healthBarImg, healthBar[lifecount].x, healthBar[lifecount].y, 150/3.4, 40/2, 0, 0, 180, 50)

    if (win === true){

        // putted black shadow on words
        context.fillStyle = ' black'
        context.font = '100px Courier New'
        context.fillText('CONGRATS!', CANVAS_WIDTH/2 + 2, CANVAS_HEIGHT/2 - 100 + 2)
        context.textAlign = 'center'

        context.font = '40px Courier New'
        context.fillText('Score: ' + score, CANVAS_WIDTH/2 + 2, CANVAS_HEIGHT/2 - 40 + 2)
        context.fillText('Time: ' + (gameTimer * 0.001).toFixed(1), CANVAS_WIDTH/2 + 2, CANVAS_HEIGHT/2 + 2)
        context.fillText('Total Score: ' + totalScore, CANVAS_WIDTH/2 + 2, CANVAS_HEIGHT/2 + 40 + 2)

        context.font = '17px Courier New'
        context.fillText('Press SpaceBar to restart', CANVAS_WIDTH/2 - 150 + 2, CANVAS_HEIGHT/2 + 90 + 2)
        context.fillText('Press Escape to exit', CANVAS_WIDTH/2 + 150 + 2, CANVAS_HEIGHT/2 + 90 + 2)


        context.fillStyle = 'white'
        context.font = '100px Courier New'
        context.fillText('CONGRATS!', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 100)
        context.textAlign = 'center'

        context.font = '40px Courier New'
        context.fillText('Score: ' + score, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 40)
        context.fillText('Time: ' + (gameTimer * 0.001).toFixed(1), CANVAS_WIDTH/2 , CANVAS_HEIGHT/2)
        context.fillText('Total Score: ' + totalScore, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 40 )

        context.font = '17px Courier New'
        context.fillText('Press SpaceBar to restart', CANVAS_WIDTH/2 - 150, CANVAS_HEIGHT/2 + 90)
        context.fillText('Press Escape to exit', CANVAS_WIDTH/2 + 150, CANVAS_HEIGHT/2 + 90)


    }

            // putted black shadow on words
                if (gameOver === true){
    context.fillStyle = ' black'
    context.font = '100px Courier New'
    context.fillText('GAME OVER', CANVAS_WIDTH/2 + 2, CANVAS_HEIGHT/2 + 2)
    context.textAlign = 'center'

    context.font = '17px Courier New'
    context.fillText('Press SpaceBar to restart', CANVAS_WIDTH/2 - 150 + 2, CANVAS_HEIGHT/2 + 90 + 2)
    context.fillText('Press Escape to exit', CANVAS_WIDTH/2 + 150 + 2, CANVAS_HEIGHT/2 + 90 + 2)



    context.fillStyle = 'white'
    context.font = '100px Courier New'
    context.fillText('GAME OVER', CANVAS_WIDTH/2 , CANVAS_HEIGHT/2)
    context.textAlign = 'center'

    
    context.font = '17px Courier New'
    context.fillText('Press SpaceBar to restart', CANVAS_WIDTH/2 - 150, CANVAS_HEIGHT/2 + 90)
    context.fillText('Press Escape to exit', CANVAS_WIDTH/2 + 150, CANVAS_HEIGHT/2 + 90)

    }

        if (pause === true){
            context.fillStyle = 'black'
            context.font = '40px Courier New'
            context.fillText('Paused', CANVAS_WIDTH/2 + 2, CANVAS_HEIGHT/2 - 40 + 2)
            context.font = '17px Courier New'
            context.fillText('Press Shift to exit',CANVAS_WIDTH/2 + 2, CANVAS_HEIGHT/2 + 2)

            context.fillStyle = 'white'
            context.font = '40px Courier New'
            context.fillText('Paused', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 40)
            context.font = '17px Courier New'
            context.fillText('Press Shift to exit',CANVAS_WIDTH/2, CANVAS_HEIGHT/2)
        }

}


const input = new InputHanlder()
const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT)

let lastTime = 0 


document.addEventListener("keydown", ({key}) => {
    if (key === 'Escape' && !gameOver && !win && !menuNow) {
         pause === true ? pause = false : pause = true; requestAnimationFrame(animationLoop);
    }
})


let menuImage = new Image()
menuImage.src = './assets/images/settings.jpg' 


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//start menu//


start_game.addEventListener('click', () => {
    menuNow = false
    menuMain.style.display = 'none'
    reset()
    animationLoop(0)
})

//settings//

settings.addEventListener('click', () => {
    menuMain.style.display = 'none'
    canvas1.style.backgroundImage = 'url(./assets/images/settings.jpg)' 
    canvas1.style.backgroundPosition = 'right'
    settings_menu.style.display = 'grid'
    menuMain.style.display = 'none'
})

volumeMusic.addEventListener("input", (event) => {
    volumeMusic.style.background = `linear-gradient(to right, #b40000 ${event.target.value}%, rgb(150, 150, 150) ${event.target.value}%)`;
    musicLevel.volume = event.target.value / 1000
})

volumeSound.addEventListener("input", (event) => {
volumeSound.style.background = `linear-gradient(to right, #b40000 ${event.target.value}%, rgb(150, 150, 150) ${event.target.value}%)`;
volumeSound.value = event.target.value
})

let flagDifficulty = 'normal'
difficulty.onclick = () => {

    if(flagDifficulty === 'normal') {
        normalDif.style.display = 'none'
        hardDif.style.display = 'block'
        flagDifficulty = 'hard'
        BullInterval = 10000
        SoldierInterval = 2500
        BatInterval = 1500
    } else {
        normalDif.style.display = 'block'
        hardDif.style.display = 'none'
        flagDifficulty = 'normal'
        BullInterval = 20000
        SoldierInterval = 5000
        BatInterval = 3000
    }

}

let menuExitButtons = document.querySelectorAll('.menu_exit') 

menuExitButtons.forEach((e) => {
    e.onclick = () => {
        settings_menu.style.display = 'none'
        leaderboards_window.style.display = 'none'
        menuMain.style.display = 'grid'
        canvas1.style.backgroundImage = 'url(./assets/images/Shadow_the_Hedgehog.jpg)' 
        canvas1.style.backgroundPosition = 'left'
    }
    
})

leaderboards.addEventListener('click', ()=>{
    menuMain.style.display = 'none'
    leaderboards_window.style.display = 'grid'
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//start game//

function animationLoop(timeStamp){
    const deltaTime = 16.715000000000146
    lastTime = timeStamp 
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    layer1.update(input)
    layer1.draw()
    layer2.update()
    layer2.drawIndepend()
    layer3.update(input)
    layer3.draw()
    gameFrameBg++; 
    gameFrame++
    player.draw(ctx)
    player.update(input)
    player.updateEn(enemies, gameOver)
    handleElements(deltaTime)
    displayStatusText(ctx, deltaTime)

    emeraldDraw.update()
    emeraldDraw.draw()

    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update()
        explosions[i].draw()
        if (explosions[i].frame > 3) {
            explosions.splice(i, 1); 
            i-- 
        }
    }

    if (gameOver || pause || win) musicLevel.pause()

    if (!gameOver && !pause && !win && !menuNow) {
        requestAnimationFrame(animationLoop) 
        musicLevel.play()
    } else if(menuNow) {
        musicLevel.pause()
        musicLevel.currentTime = 0
        ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
}
// animationLoop(0)
})
