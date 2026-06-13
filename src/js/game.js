import '../css/style.css'
import { Engine, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from "./resources.js";
import { LevelOne } from "./levels/level.js"

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.toggleDebug()
        this.start(ResourceLoader).then(() => this.startGame())
    }
    startGame(){
        this.addScene('level-one', new LevelOne());
        this.goToScene('level-one')
    }
}

new Game()
