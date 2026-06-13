import { Actor, Vector } from "excalibur"

export class Enemy extends Actor {
    constructor(x, y, config){
        super({
            pos: new Vector(x, y),
            width: config.width || 32,
            height: config.height || 32,
            collisionType: config.collisionType || 'Active'
        })
        
        this.hp = config.hp || 10
        this.speed = config.speed || 50
    }
    
    onPreUpdate(engine, delta) {
        const player = engine.currentScene.actors.find(actor => actor.constructor.name === 'Player')
        
        if (player) {
            const direction = player.pos.sub(this.pos).normalize()
            this.vel = direction.scale(this.speed)
        }
    }
    
    takeDamage(amount){
        this.hp -= amount
        
        console.log(`${this.constructor.name} took damage. hp left: ${this.hp}`)
        
        if(this.hp <= 0){
            this.die()
        }
    }
    
    die(){
        console.log(`${this.constructor.name} has been defeated`)
        this.kill()
    }
}