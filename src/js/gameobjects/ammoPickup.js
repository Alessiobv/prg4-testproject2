import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from "../resources"

export class AmmoPickup extends Actor {
    constructor(x, y, amount) {
        super({
            pos: new Vector(x, y),
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive
        })

        this.amount = amount
    }

    onInitialize(engine) {
        this.graphics.use(Resources.AmmoImage.toSprite())
        this.scale = new Vector(0.5, 0.5)

        this.on("collisionstart", evt => {
            const other = evt.other?.owner
            if (!other) return

            if (other.hasTag?.("Player")) {
                other.addAmmo(this.amount)
                this.kill()
            }
        })
    }
}