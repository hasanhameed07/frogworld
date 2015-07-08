var Froglet = function(i, angle){
	this._id = i;
	this.index = i;
	this.x = 0;
	this.y = 0;
	this.angle = angle;
};

Froglet.prototype.show = function(){
	this.sprite = game.add.sprite(this.x, this.y, 'froglet');
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.angle = -1*this.angle*10;
    game.add.tween(this.sprite).to( { x: this.x+(this.angle*40)  , y:  this.y+getRandom(10,50) }, Pond.FROGLET_SPEED, Phaser.Easing.Linear.None, true);
	this.sprite._id = this.index;
	this.sprite._type = this.type;
};