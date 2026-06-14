import { Actor, Keys, Vector, SpriteSheet, Animation, CollisionType } from "excalibur"
import { Resources } from "../resources.js"

export class Player extends Actor {
    
    player
    dead = false
    score = 0
    health = 100

    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 32,
            height: 32,
            collisionType: CollisionType.Active
        })

        this.speed = 150
        this.facingVector = new Vector(0, 1)
    }

    onInitialize() {
        const downSheet = SpriteSheet.fromImageSource({
            image: Resources.LinkDownWalk,
            grid: { rows: 1, columns: 10, spriteWidth: 32, spriteHeight: 32 }
        })
        const upSheet = SpriteSheet.fromImageSource({
            image: Resources.LinkUpWalk,
            grid: { rows: 1, columns: 10, spriteWidth: 32, spriteHeight: 32 }
        })
        const leftSheet = SpriteSheet.fromImageSource({
            image: Resources.LinkLeftWalk,
            grid: { rows: 1, columns: 10, spriteWidth: 32, spriteHeight: 32 }
        })
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.LinkIdle,
            grid: { rows: 1, columns: 3, spriteWidth: 32, spriteHeight: 32 }
        })
        
        this.animations = {
            walkDown: Animation.fromSpriteSheet(downSheet, [0, 1, 2, 3, 4], 120),
            walkUp: Animation.fromSpriteSheet(upSheet, [0, 1, 2, 3, 4], 120),
            walkLeft: Animation.fromSpriteSheet(leftSheet, [0, 1, 2, 3, 4], 120),
        
            idleDown: Animation.fromSpriteSheet(idleSheet, [0], 100),
            idleLeft: Animation.fromSpriteSheet(idleSheet, [1], 100),
            idleUp: Animation.fromSpriteSheet(idleSheet, [2], 100),
        }
        
        this.graphics.use(this.animations.idleDown)
    }
    onPreUpdate(engine, delta) {
        if (this.dead) return
        
        this.vel = Vector.Zero
        const kb = engine.input.keyboard
        let moving = false

        let dirX = 0
        let dirY = 0
        
        if (kb.isHeld(Keys.ArrowLeft) || kb.isHeld(Keys.A)) {
            this.vel.x = -this.speed
            this.facing = 'left'
            dirX = -1
            moving = true
        } else if (kb.isHeld(Keys.ArrowRight) || kb.isHeld(Keys.D)) {
            this.vel.x = this.speed
            this.facing = 'right'
            dirX = 1
            moving = true
        }

        if (kb.isHeld(Keys.ArrowUp) || kb.isHeld(Keys.W)) {
            this.vel.y = -this.speed
            this.facing = 'up'
            dirY = -1
            moving = true
        } else if (kb.isHeld(Keys.ArrowDown) || kb.isHeld(Keys.S)) {
            this.vel.y = this.speed
            this.facing = 'down'
            dirY = 1
            moving = true
        }
        
        if (moving) {
            if (this.facing === 'left') {
                this.graphics.use(this.animations.walkLeft)
                this.graphics.flipHorizontal = false
                this.facingVector = new Vector(dirX, dirY).normalize()
            } else if (this.facing === 'right') {
                this.graphics.use(this.animations.walkLeft)
                this.graphics.flipHorizontal = true
                this.facingVector = new Vector(dirX, dirY).normalize()
            } else if (this.facing === 'up') {
                this.graphics.use(this.animations.walkUp)
                this.graphics.flipHorizontal = false
                this.facingVector = new Vector(dirX, dirY).normalize()
            } else if (this.facing === 'down') {
                this.graphics.use(this.animations.walkDown)
                this.graphics.flipHorizontal = false
                this.facingVector = new Vector(dirX, dirY).normalize()
            }
        } else {
            if (this.facing === 'left') {
                this.graphics.use(this.animations.idleLeft)
                this.graphics.flipHorizontal = false
            } else if (this.facing === 'right') {
                this.graphics.use(this.animations.idleLeft)
                this.graphics.flipHorizontal = true
            } else if (this.facing === 'up') {
                this.graphics.use(this.animations.idleUp)
                this.graphics.flipHorizontal = false
            } else if (this.facing === 'down') {
                this.graphics.use(this.animations.idleDown)
                this.graphics.flipHorizontal = false;
            }
        }
        
        const mapWidth = 4110
        const mapHeight = 4110
        
        const halfWidth = this.width / 2
        const halfHeight = this.height / 2
        
        if (this.pos.x < halfWidth){
            this.pos.x = halfWidth
        } else if (this.pos.x > mapWidth - halfWidth){
            this.pos.x = mapWidth - halfWidth
        }

        if (this.pos.y < halfHeight){
            this.pos.y = halfHeight
        } else if (this.pos.y > mapHeight - halfHeight){
            this.pos.y = mapHeight - halfHeight
        }
    }

    addScore(amount) {
        this.score += amount

        console.log("Score:", this.score)
    }

    takeDamage(amount) {
        if (this.dead) return

        this.health -= amount

        if (this.health <= 0) {
            this.health = 0
            this.die()
        }
    }

    die() {
        if (this.dead) return

        this.dead = true
        this.vel = Vector.Zero

        this.scene.triggerGameOver(this.score)
        console.log("Player Died")
        this.kill()
    }
}