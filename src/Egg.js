var Egg = function(i){
	this._id = i;
	this.index = i;
	this.x = 0;
	this.y = 0;
};

Egg.prototype.show = function(){
	this.sprite = game.add.sprite(this.x, this.y, 'egg');
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	var angle = getRandom(1500,3600);
	angle = (getRandom(0,2)===0)? angle : angle*-1 ;
	game.add.tween(this.sprite).to( { x: this.x + 25 * (this.index-2), y: this.y+15}, 1000, Phaser.Easing.Quadratic.InOut, true);
	game.add.tween(this.sprite).to( { angle: angle }, Pond.EGG_ROTATE_SPEED, Phaser.Easing.Linear.None, true);
	this.sprite._id = this.index;
};