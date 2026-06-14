import { Vector, Animation, Sprite } from "excalibur"
import { Enemy } from "../enemy.js"
import { Resources } from "../../resources.js"


export class Boss extends Enemy {
    constructor(x, y){
        super(x, y, {
            hp: 250,
            speed: 60,
            width: 100,
            height: 100
        })
    }

    onInitialize(engine) {
        super.onInitialize(engine)

        const image = Resources.BossMon

        const frame0 = new Sprite({
            image: image,
            sourceView: { x: 48, y: 100, width: 100, height: 100 },
            destSize: { width: 100, height: 100 }
        })

        const frame1 = new Sprite({
            image: image,
            sourceView: { x: 240, y: 100, width: 100, height: 100 },
            destSize: { width: 100, height: 100 }
        })

        const frame2 = new Sprite({
            image: image,
            sourceView: { x: 435, y: 100, width: 100, height: 100 },
            destSize: { width: 100, height: 100 }
        })

        const frame3 = new Sprite({
            image: image,
            sourceView: { x: 630, y: 100, width: 100, height: 100 },
            destSize: { width: 100, height: 100 }
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
        return 100
    }
}

