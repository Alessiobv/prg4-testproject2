import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Bones extends Actor {
    constructor() {
        super();
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bones.toSprite())
        this.pos = new Vector(
            Math.random() * 1280,
            Math.random() * 720
        )
        this.vel = new Vector(0, 25 + Math.random() * 120)
        const boneScale = 0.2 + Math.random() * 0.8
        this.scale = new Vector(boneScale, boneScale)
        this.events.on("exitviewport", (e) => this.bonesLeft())
    }

    bonesLeft() {
        this.pos = new Vector(
            Math.random() * 1280,
            -70
        )
    }
}