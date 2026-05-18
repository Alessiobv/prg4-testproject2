import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Fish extends Actor {
    constructor() {
        super();
    }
    
    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite())
        this.pos = new Vector(
            Math.random() * 1280,
            Math.random() * 720
        )
        this.vel = new Vector(-(25 + Math.random() * 150), 0)
        const fishScale = 0.2 + Math.random() * 0.8
        this.scale = new Vector(fishScale, fishScale)
        this.events.on("exitviewport", (e) => this.fishLeft())
    }

    fishLeft() {
        this.pos = new Vector(
            1350,
            Math.random() * 720
        )
    }
}