import "../css/style.css"
import { Engine, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from "./resources.js"
import { LevelOne } from "./levels/level.js"
import { GameOverScene } from "./levels/gameOverScreen.js"

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        //this.toggleDebug()
        this.start(ResourceLoader).then(() => this.startGame())
    }
    startGame(){
        this.addScene('level-one', new LevelOne())
        this.addScene('gameover', new GameOverScene())
        this.goToScene('level-one')
    }
    
    showGameOver(score) {
        this.addScene('game-over', new GameOverScene(score))
        this.goToScene('game-over')
    }
}

new Game()
