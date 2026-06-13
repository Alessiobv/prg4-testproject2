 import { Scene, Vector, Actor, BoundingBox } from "excalibur"
 import { Player } from "../gameobjects/player.js"
 import { Bullet } from "../gameobjects/bullet.js"
 import { TreeMS1 } from "../gameobjects/enemies/TreeMS1.js"
 import { Resources } from '../resources.js'
 
 export class LevelOne extends Scene {
    onInitialize(engine) {
        const mapWidth = 4110
        const mapHeight = 4110

        const background = new Actor({
            pos: new Vector(0, 0)
        })

        background.graphics.use(Resources.Background.toSprite())
        background.graphics.anchor = new Vector(0, 0)
        background.scale = new Vector(1, 1)
        this.add(background);

        const centerX = mapWidth / 2
        const centerY = mapHeight / 2

        this.player = new Player(centerX, centerY)
        this.add(this.player)
        
        this.treems1 = new TreeMS1(centerX + 300, centerY)
        this.add(this.treems1)

        this.camera.strategy.elasticToActor(this.player, 0.1, 0.1)
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, mapWidth, mapHeight))

        engine.input.pointers.primary.on('down', (evt) => {
            console.log("EXACT BULLET VECTOR BEING USED -> X:", this.player.facingVector.x, "Y:", this.player.facingVector.y)
            const spawnOffset = this.player.facingVector.scale(24)
            let spawnX = this.player.pos.x + spawnOffset.x
            const spawnY = this.player.pos.y + spawnOffset.y

            if (this.player.facingVector.y === -1 && this.player.facingVector.x === 0) {
                spawnX -= 8
            }

            const bullet = new Bullet(spawnX, spawnY, this.player.facingVector)
            this.add(bullet)
        })
        
        background.z = -1
        this.player.z = 10
        this.treems1.z = 5
    }
 }