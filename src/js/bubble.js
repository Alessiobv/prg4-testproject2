import { Actor, Vector } from "excalibur"
import { Resources } from "./resources.js"

export class Bubble extends Actor {
    constructor() {
        super();
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bubble.toSprite())
        this.pos = new Vector(
            Math.random() * 1280,
            Math.random() * 720
        )
        this.vel = new Vector(0, -25 + Math.random() * -120)
        const bubbleScale = 0.8 + Math.random() * 0.8
        this.scale = new Vector(bubbleScale, bubbleScale)
        this.events.on("exitviewport", (e) => this.bubbleLeft())
    }

    bubbleLeft() {
        this.pos = new Vector(
            Math.random() * 1280,
            790
        )
    }
}