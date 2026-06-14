import { ImageSource, Loader } from "excalibur"

// voeg hier jouw eigen resources toe
const Resources = {
    GameOver: new ImageSource('./images/GameOver.png'),
    Background: new ImageSource('./images/BackgroundZelda.png'),
    LinkAttack: new ImageSource('./images/LinkAttackSprite.png'),
    LinkDownWalk: new ImageSource('./images/LinkDownWalk.png'),
    LinkUpWalk: new ImageSource('./images/LinkUpWalking.png'),
    LinkLeftWalk: new ImageSource('./images/LinkLeftWalking.png'),
    LinkIdle: new ImageSource('./images/LinkStandingStill.png'),
    
    TreeMonSmallOne: new ImageSource('./images/TreeMS1.png'),
    TreeMonSmallOneAttack: new ImageSource('./images/TreeMS1A.png'),
    TreeMonSmallTwo: new ImageSource('./images/TreeMS2.png'),
    TreeMonSmallTwoAttack: new ImageSource('./images/TreeMS2A.png'),
    TreeMonSmallThree: new ImageSource('./images/TreeMS3.png'),
    TreeMonSmallThreeAttack: new ImageSource('./images/TreeMS3A.png'),
    TreeMonBigOne: new ImageSource('./images/TreeMB1.png'),
    TreeMonBigOneAttack: new ImageSource('./images/TreeMB1A.png'),
    TreeMonBigTwo: new ImageSource('./images/TreeMB2.png'),
    TreeMonBigTwoAttack: new ImageSource('./images/TreeMB2A.png'),
    TreeMonBigThree: new ImageSource('./images/TreeMB3.png'),
    TreeMonBigThreeAttack: new ImageSource('./images/TreeMB3A.png'),
    BossMon: new ImageSource('./images/BossMove.png'),
    BossMonAttack: new ImageSource('./images/BossAttack.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }