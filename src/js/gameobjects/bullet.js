import { Actor, Vector, SpriteSheet, Animation, CollisionType } from "excalibur"
import { Resources } from "../resources.js"

export class Bullet extends Actor {
    constructor(startX, startY, directionVector){
        super({
            pos: new Vector(startX, startY),
            width: 16,
            height: 16,
            collisionType: CollisionType.Active
        })
        
        this.addTag('bullet')
        this.damage = 10

        const bulletSpeed = 600
        this.vel = directionVector.scale(bulletSpeed)
        this.rotation = Math.atan2(this.vel.y, this.vel.x)

        if(this.vel.y < 0 && this.vel.x === 0){
            this.graphics.offset = new Vector(-4, 0)
        }
    }

    onInitialize(engine){
        const attackSheet = SpriteSheet.fromImageSource({
            image: Resources.LinkAttack,
            grid: { rows: 1, columns: 4, spriteWidth: 16, spriteHeight: 16 }
        })

        const attackAnimation = Animation.fromSpriteSheet(attackSheet, [0, 1, 2, 3], 80)
        attackAnimation.anchor = new Vector(0.5, 0.5)
        this.graphics.use(attackAnimation)
        this.actions.delay(2000).die()
    }
}