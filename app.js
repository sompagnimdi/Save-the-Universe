class Ship {
    alien=false
    constructor(type){
        if(type=="alien"){
            this.alien=true
            this.hull = Math.floor(Math.random()*4)+3
            this.firepower = Math.floor(Math.random()*3)+2
            this.accuracy = Math.random() * .2 + .6

        } else {
            this.hull = 20
            this.firepower = 5
            this.accuracy = .7
        }
        this.display()
    }
    shootAt(targetShip){
        if(Math.random()<this.accuracy){
            targetShip.gotHitBy(this)
        }
    }
    gotHitBy(attacker){
        this.hull -= attacker.firepower
        this.display()
    }
    display(){
        let hullHMTL,fpHTML
        if (this.alien) {
            hullHMTL = document.querySelector("#alienHull")
            fpHTML = document.querySelector("#alienFP")
        } else {
            hullHMTL = document.querySelector("#myHull")
            fpHTML = document.querySelector("#myFP")
        }
        hullHMTL.innerHTML = "Hull:"+this.hull
        fpHTML.innerHTML = `FP:${this.firepower}`
    }
}

let battleShip
let alien


const shootBtn = document.querySelector('#shootBtn')
const retreatBtn = document.querySelector('#retreatBtn')
document.querySelector('#startBtn').addEventListener('click', ()=>{
    battleShip = new Ship()
    alien = new Ship("alien")
    shootBtn.disabled = false
    retreatBtn.disabled = false
})
shootBtn.addEventListener('click', ()=>{
    battleShip.shootAt(alien)
    if(alien.hull>0){
        alien.shootAt(battleShip)
        if(battleShip.hull<=0){
            alert("You lost!")
            gameOver()
        }

    } else {
        alert("You win!")
        gameOver()
    }
    
})

retreatBtn.addEventListener('click', ()=>{
    alert("You retreated!")
    gameOver()
})

function gameOver(){
    shootBtn.disabled = true
    retreatBtn.disabled = true
}
