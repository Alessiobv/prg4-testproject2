import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Shark extends Actor {
    constructor() {
        super();
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Shark.toSprite())
        this.pos = new Vector(
            Math.random() * 1280,
            Math.random() * 720
        )
        this.vel = new Vector(25 + Math.random() * 120, 0)
        const sharkScale = 0.2 + Math.random() * 0.8
        this.scale = new Vector(sharkScale, sharkScale)
        this.events.on("exitviewport", (e) => this.sharkLeft())
    }

    sharkLeft() {
        this.pos = new Vector(
            -70,
            Math.random() * 720
        )
    }
}