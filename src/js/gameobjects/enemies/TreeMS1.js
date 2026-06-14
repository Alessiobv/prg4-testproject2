import { Vector, Animation, Sprite } from "excalibur"
import { Enemy } from "../enemy.js"
import { Resources } from "../../resources.js"

export class TreeMS1 extends Enemy {
    constructor(x, y) {
        super(x, y, {
            hp: 10,
            speed: 120,
            width: 40,
            height: 40
        })
    }

    onInitialize(engine) {
        super.onInitialize(engine)

        const image = Resources.TreeMonSmallOne

        const frame0 = new Sprite({
            image: image,
            sourceView: { x: 25, y: 27, width: 48, height: 48 },
            destSize: { width: 48, height: 48 }
        })

        const frame1 = new Sprite({
            image: image,
            sourceView: { x: 102, y: 27, width: 48, height: 48 },
            destSize: { width: 48, height: 48 }
        })

        const frame2 = new Sprite({
            image: image,
            sourceView: { x: 182, y: 27, width: 48, height: 48 },
            destSize: { width: 48, height: 48 }
        })

        const frame3 = new Sprite({
            image: image,
            sourceView: { x: 260, y: 27, width: 48, height: 48 },
            destSize: { width: 48, height: 48 }
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
        super.onPreUpdate(engine, delta)

        if (this.vel.x < 0) {
            this.graphics.flipHorizontal = true
        } else if (this.vel.x > 0) {
            this.graphics.flipHorizontal = false
        }
    }

    getScoreValue() {
        return 5
    }
}