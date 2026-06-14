import { Scene, Actor, Vector, Label, Font, Color } from "excalibur"
import { Resources } from "../resources.js"

export class GameOverScene extends Scene {
    constructor() {
        super()
    }

    onInitialize(engine) {
        const centerX = engine.drawWidth / 2
        const centerY = engine.drawHeight / 2

        const score = engine.gameOverScore ?? 0
        const highscore = Number(localStorage.getItem("highscore") ?? 0)
        
        const bg = new Actor({
            pos: new Vector(centerX, 150)
        })

        bg.graphics.use(Resources.GameOver.toSprite())
        bg.anchor = new Vector(0.5, 0.5)
        this.add(bg)
        
        const highScoreLabel = new Label({
            text: `Highscore: ${highscore}`,
            pos: new Vector(centerX, 300),
            font: new Font({
                size: 28,
                color: Color.Yellow,
                family: "Arial",
                textAlign: "center"
            })
        })

        this.add(highScoreLabel)

        const scoreLabel = new Label({
            text: `Score: ${score}`,
            pos: new Vector(centerX, centerY),
            font: new Font({
                size: 36,
                color: Color.White,
                family: "Arial",
                textAlign: "center"
            })
        })

        this.add(scoreLabel)
        
        const restartLabel = new Label({
            text: "Click to Restart",
            pos: new Vector(centerX, centerY + 80),
            font: new Font({
                size: 24,
                color: Color.White,
                family: "Arial",
                textAlign: "center"
            })
        })

        this.add(restartLabel)

        engine.input.pointers.primary.once("down", () => {
            location.reload()
        })
    }
}