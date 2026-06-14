import { Vector } from "excalibur"
import { TreeMS1 } from "./gameobjects/enemies/TreeMS1.js"
import { TreeMS2 } from "./gameobjects/enemies/TreeMS2.js"
import { TreeMS3 } from "./gameobjects/enemies/TreeMS3.js"
import { TreeMB1 } from "./gameobjects/enemies/TreeMB1.js"
import { TreeMB2 } from "./gameobjects/enemies/TreeMB2.js"
import { TreeMB3 } from "./gameobjects/enemies/TreeMB3.js"
import { Boss } from "./gameobjects/enemies/Boss.js"


export class SpawnManager {
    constructor(scene, player) {
        this.scene = scene
        this.player = player
        
        this.baseInterval = 3000
        this.minInterval = 500
        
        this.difficultyTimer = 0
        this.difficultyIncreaseRate = 30000
        
        this.timer = 0
        this.active = false

        this.spawnTable = [
            { type: TreeMS1, weight: 30 },
            { type: TreeMS2, weight: 30 },
            { type: TreeMS3, weight: 30 },

            { type: TreeMB1, weight: 10 },
            { type: TreeMB2, weight: 10 },
            { type: TreeMB3, weight: 10 },

            { type: Boss, weight: 2 }
        ]
    }

    pickEnemy() {
        const totalWeight = this.spawnTable.reduce((sum, item) => sum + item.weight, 0)

        let random = Math.random() * totalWeight

        for (const item of this.spawnTable) {
            if (random < item.weight) {
                return item.type
            }
            random -= item.weight
        }

        return this.spawnTable[0].type
    }

    start() {
        this.active = true
    }

    stop() {
        this.active = false
    }

    update(engine, delta) {
        if (!this.active) return

        this.timer += delta

        if (this.timer >= this.baseInterval) {
            this.timer = 0
            this.spawnEnemy()
        }
        
        this.difficultyTimer += delta
        if(this.difficultyTimer >= this.difficultyIncreaseRate) {
            this.difficultyTimer = 0
            this.baseInterval -= 200
            
            if(this.baseInterval < this.minInterval) {
                this.baseInterval = this.minInterval
            }
            console.log("Spawn Rate Increased:", this.baseInterval)
        }
    }

    spawnEnemy() {
        const mapSize = 4110

        const side = Math.floor(Math.random() * 4)

        let x = 0
        let y = 0

        if (side === 0) {
            x = Math.random() * mapSize
            y = 0
        } else if (side === 1) {
            x = mapSize
            y = Math.random() * mapSize
        } else if (side === 2) {
            x = Math.random() * mapSize
            y = mapSize
        } else {
            x = 0
            y = Math.random() * mapSize
        }

        const EnemyClass = this.pickEnemy()

        const enemy = new EnemyClass(x, y)

        this.scene.add(enemy)
    }
}