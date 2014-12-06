module KodingSpy.Controller {
    export interface ControllerDelegate {
        ():void;
    }

    export class CharacterController implements KodingSpy.Interfaces.ICharacterController{
        character: KodingSpy.Model.Character;
        game: KodingSpy.Game;
        sprite: Phaser.Sprite;

        constructor(game:KodingSpy.Game) {
            this.game = game;
        }

        create(lucy:KodingSpy.Model.Character) {
            this.character = lucy;
            var lucyPosition = KodingSpy.Utils.getWorldPosition(this.character.position.x, this.character.position.y);
            this.sprite = this.game.add.sprite(lucyPosition.x, lucyPosition.y, 'lucy');

            this.sprite.animations.add('idle0', [1], 24,  false);
            this.sprite.animations.add('idle1', [0], 24,  false);
            this.sprite.animations.add('idle2', [2], 24,  false);
            this.sprite.animations.add('idle3', [3], 24,  false);

            this.updateDirection();
        }

        moveBy(x :number , y: number, next: ControllerDelegate) : void {

            var currentPos = this.character.position;
            var newPos = new KodingSpy.Model.TileCoordinate(currentPos.x + x, currentPos.y + y);
            var worldPos = KodingSpy.Utils.getWorldPosition(newPos.x, newPos.y);
            var delta = Math.abs(x || y);

            // var animationName = 'walk'+ this.character.direction;
            // var animation = this.sprite.animations.play(animationName);

            var moveTween = this.game.add.tween(this.sprite).to({
                'x':worldPos.x,
                'y':worldPos.y},
                delta * 500);
            moveTween.onComplete.add(next);
            moveTween.start();

            this.character.position = newPos;
        }

        rotateTo(direction: KodingSpy.Model.Direction, next: ControllerDelegate) : void {
            this.updateDirection();
            next();
        }

        updateDirection() {
            var animationName = 'idle' + this.character.direction;
            this.sprite.animations.play(animationName);
        }

    }
}