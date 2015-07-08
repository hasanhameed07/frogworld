var Tadpole = function(i, angle){
	this._id = i;
	this.index = i;
	this.x = 0;
	this.y = 0;
	this.angle = angle;
};

Tadpole.prototype.show = function(){
	this.sprite = game.add.sprite(this.x, this.y, 'tadpole');
    this.sprite.animations.add('swim');
    this.sprite.animations.play('swim', 14, true);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.angle = -1*this.angle*10;
    game.add.tween(this.sprite).to( { x: this.x+(this.angle*10)  , y:  this.y+getRandom(10,40)}, Pond.TADPOLE_SPEED, Phaser.Easing.Quadratic.InOut, true);
 	game.add.tween(this.sprite.scale).to( { x: 1.4, y: 1.4 }, Pond.TADPOLE_SPEED, Phaser.Easing.Quadratic.Out, true);
    // game.add.tween(this.sprite).to( {scale:150}, 1000, Phaser.Easing.Linear.None, true);
	this.sprite._id = this.index;
};