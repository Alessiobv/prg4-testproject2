import { Vector, Animation, Sprite } from "excalibur"
import { Enemy } from "../enemy.js"
import { Resources } from "../../resources.js"

export class TreeMB2 extends Enemy {
    constructor(x, y){
        super(x, y, {
            hp: 50,
            speed: 80,
            width: 60,
            height: 60
        })
    }

    onInitialize(engine) {
        super.onInitialize(engine)
        
        const image = Resources.TreeMonBigTwo

        const frame0 = new Sprite({
            image: image,
            sourceView: { x: 20, y: 27, width: 60, height: 60 },
            destSize: { width: 60, height: 60 }
        })

        const frame1 = new Sprite({
            image: image,
            sourceView: { x: 119, y: 27, width: 60, height: 60 },
            destSize: { width: 60, height: 60 }
        })

        const frame2 = new Sprite({
            image: image,
            sourceView: { x: 214, y: 27, width: 60, height: 60 },
            destSize: { width: 60, height: 60 }
        })

        const frame3 = new Sprite({
            image: image,
            sourceView: { x: 310, y: 27, width: 60, height: 60 },
            destSize: { width: 60, height: 60 }
        })

        this.animations = {
            moving: new Animation({
                frames: [
                    { graphic: frame0, duration: 100 },
                    { graphic: frame1, duration: 100 },
                    { graphic: frame2, duration: 100 },
                    { graphic: frame3, duration: 100 }
                ]
            })
        }

        this.graphics.use(this.animations.moving)
        this.graphics.anchor = new Vector(0.5, 0.5)
    }

    onPreUpdate(engine, delta) {
        if (super.onPreUpdate) {
            super.onPreUpdate(engine, delta)
        }

        if (this.vel.x < 0) {
            this.graphics.flipHorizontal = true
        } else if (this.vel.x > 0) {
            this.graphics.flipHorizontal = false
        }
    }

    getScoreValue() {
        return 25
    }
}

