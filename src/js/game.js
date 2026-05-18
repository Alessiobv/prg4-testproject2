import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Fish } from './fish.js'
import { Bones } from './bones.js'
import { Shark } from './shark.js'
import { Bubble } from './bubble.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const background = new Actor({
            pos: new Vector(640, 360)
        })
        background.graphics.use(
            Resources.Background.toSprite()
        )
        background.scale = new Vector(1, 1)
        
        this.add(background)
        
        for (let i = 0; i < 30; i++) {
            const fish = new Fish()
            this.add(fish)
        }

        for (let i = 0; i < 40; i++) {
            const bones = new Bones()
            this.add(bones)
        }

        for (let i = 0; i < 15; i++) {
            const shark = new Shark()
            this.add(shark)
        }

        for (let i = 0; i < 10; i++) {
            const bubble = new Bubble()
            this.add(bubble)
        }
    }
}

new Game()
