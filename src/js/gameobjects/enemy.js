import { Actor, Vector, CollisionType } from "excalibur"
import { AmmoPickup } from "./ammoPickup.js"

export class Enemy extends Actor {
    constructor(x, y, config) {
        super({
            pos: new Vector(x, y),
            width: config.width || 32,
            height: config.height || 32,
            collisionType: config.collisionType || CollisionType.Active
        })

        this.ammoDrop = config.ammoDrop || 5
        this.hp = config.hp || 10
        this.speed = config.speed || 50

        this.playerInContact = false
        this.contactTarget = null
        this.attackCooldown = 250
        this.attackTimer = 0

        this.player = null

        this.addTag("Enemy")
    }

    onInitialize(engine) {
        this.player = engine.currentScene.actors.find(a => a.hasTag("Player"))

        this.on("collisionstart", evt => {
            const other = evt.other?.owner
            if (!other) return

            if (other.hasTag("Player")) {
                this.playerInContact = true
                this.contactTarget = other
                this.attackTimer = 0
            }

            if (other.hasTag?.("bullet")) {
                this.takeDamage(other.damage || 10)
                other.kill()
            }
        })

        this.on("collisionend", evt => {
            const other = evt.other?.owner
            if (!other) return

            if (other.hasTag("Player")) {
                this.playerInContact = false
                this.contactTarget = null
                this.attackTimer = 0
            }
        })
    }

    onPreUpdate(engine, delta) {
        if (!this.player) {
            this.player = engine.currentScene.actors.find(a => a.hasTag("Player"))
        }

        const player = this.player

        if (player) {
            const diff = player.pos.sub(this.pos)

            if (diff.magnitude > 0) {
                const direction = diff.normalize()
                this.vel = direction.scale(this.speed)
            } else {
                this.vel = Vector.Zero
            }
        }

        if (this.playerInContact && this.contactTarget) {
            this.attackTimer += delta

            if (this.attackTimer >= this.attackCooldown) {
                this.attackTimer = 0

                if (this.contactTarget.takeDamage) {
                    this.contactTarget.takeDamage(10, this.engine)
                }
            }
        }

        if (this.vel.x < 0) {
            this.graphics.flipHorizontal = true
        } else if (this.vel.x > 0) {
            this.graphics.flipHorizontal = false
        }
    }

    takeDamage(amount) {
        this.hp -= amount

        console.log(`${this.constructor.name} HP: ${this.hp}`)

        if (this.hp <= 0) {
            this.die()
        }
    }

    getScoreValue() {
        return 10
    }

    die() {
        console.log(`${this.constructor.name} has been defeated`)

        const engine = this.scene?.engine
        const player = engine?.currentScene?.actors.find(a => a.hasTag("Player"))

        if (player?.addScore) {
            player.addScore(this.getScoreValue())
        }

        const dropChance = 0.5

        if (Math.random() < dropChance) {
            const ammoPickup = new AmmoPickup(this.pos.x, this.pos.y, this.ammoDrop)
            engine?.currentScene?.add(ammoPickup)
        }

        this.kill()
    }
}