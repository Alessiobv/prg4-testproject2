import { Label, Font, Color, ScreenElement, Vector } from "excalibur"

export class HUD {
    constructor(scene, player) {
        this.scene = scene
        this.player = player
        this.createUI()
    }

    createUI() {
        this.hpLabel = new ScreenElement({
            pos: new Vector(20, 20)
        })

        this.hpText = new Label({
            text: "HP: 100",
            font: new Font({
                size: 24,
                color: Color.Red
            })
        })

        this.hpLabel.addChild(this.hpText)

        this.scoreLabel = new ScreenElement({
            pos: new Vector(20, 50)
        })

        this.scoreText = new Label({
            text: "Score: 0",
            font: new Font({
                size: 24,
                color: Color.White
            })
        })

        this.scoreLabel.addChild(this.scoreText)
        
        this.hsLabel = new ScreenElement({
            pos: new Vector(20, 80)
        })
        
        this.hsText = new Label({
            text: "HS: 0",
            font: new Font({
                size: 24,
                color: Color.Yellow
            })
        })
        
        this.hsLabel.addChild(this.hsText)

        this.scene.add(this.hpLabel)
        this.scene.add(this.scoreLabel)
        this.scene.add(this.hsLabel)
    }

    update() {
        this.hpText.text = `HP: ${this.player.health}`
        this.scoreText.text = `Score: ${this.player.score}`
        this.hsText.text = `HS: ${Number(localStorage.getItem("highscore") ?? 0)}`
    }
}