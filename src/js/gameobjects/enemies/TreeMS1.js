import { Vector, Animation, SpriteSheet, Util } from "excalibur"
import { Enemy } from "../enemy.js"
import { Resources } from "../../resources.js"


export class TreeMS1 extends Enemy {
    constructor(x, y){
        super(x, y, {
            hp: 10,
            speed: 150,
            width: 32,
            height: 32
        })
    }
    
    onInitialize(engine) {
        const treeSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.TreeMonSmallOneSheet,
            grid: {
                rows: 1,         
                columns: 4,      
                spriteWidth: 32, 
                spriteHeight: 32
            }
        })

        const totalFrames = treeSpriteSheet.sprites.length
        const frameIndices = Util.range(0, totalFrames - 1)

        const walkAnimation = Animation.fromSpriteSheet(
            treeSpriteSheet,
            frameIndices,
            120
        )

        this.graphics.use(walkAnimation);
        this.graphics.anchor = new Vector(0.5, 0.5);
    }
}

