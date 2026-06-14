import { Scene, Actor, Vector, BoundingBox, Label, Font, Color } from "excalibur"
import { Player } from "../gameobjects/player.js"
import { Bullet } from "../gameobjects/bullet.js"
import { Resources } from "../resources.js"
import { SpawnManager } from "../SpawnManager.js"
import { HUD } from "../HUD.js"

export class LevelOne extends Scene {
    onInitialize(engine) {
        this.gameOver = false

        const mapWidth = 4110
        const mapHeight = 4110

        const background = new Actor({
            pos: new Vector(0, 0)
        })

        background.graphics.use(Resources.Background.toSprite())
        background.graphics.anchor = new Vector(0, 0)
        background.scale = new Vector(1, 1)
        this.add(background)

        const centerX = mapWidth / 2
        const centerY = mapHeight / 2

        this.player = new Player(centerX, centerY)
        this.add(this.player)

        this.hud = new HUD(this, this.player)

        this.spawnManager = new SpawnManager(this, this.player)
        this.spawnManager.start()

        this.camera.strategy.elasticToActor(this.player, 0.1, 0.1)
        this.camera.strategy.limitCameraBounds(
            new BoundingBox(0, 0, mapWidth, mapHeight)
        )

        engine.input.pointers.primary.on('down', () => {
            if (this.gameOver) return
            
            const spawnOffset = this.player.facingVector.scale(24)

            const bullet = new Bullet(
                this.player.pos.x + spawnOffset.x,
                this.player.pos.y + spawnOffset.y,
                this.player.facingVector
            );

            this.add(bullet)
        })
    }

    onPreUpdate(engine, delta) {
        if (this.gameOver) return

        this.spawnManager.update(engine, delta)
        this.hud.update()
    }

    triggerGameOver(score) {
        if (this.gameOver) return

        this.gameOver = true
        this.spawnManager?.stop?.()
        
        const currentHigh = Number(localStorage.getItem("highscore") ?? 0)

        if (score > currentHigh) {
            localStorage.setItem("highscore", score)
        }

        this.engine.gameOverScore = score

        this.engine.goToScene("gameover")
    }
}