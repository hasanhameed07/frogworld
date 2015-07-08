var frogId = 0;
var Frog = function(familyId, type){
	this.id = frogId++;
	this.familyId = familyId;
	this.type = type;
	this.x = 0;
	this.y = 0;
};

Frog.prototype.show = function(){
	this.sprite = game.add.sprite(this.x, this.y , this.type);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite._name = getName(this.type);
	this.sprite._id = this.id;
	this.sprite._type = this.type;
	this.sprite._familyId = this.familyId;
	this.sprite._onDead = function(){};

	if (this.type.indexOf('frogbaby')===-1){
		// adult frog related stuff
		this.sprite._animation = this.sprite.animations.add('awake');
	 	this.sprite._animation._loop = game.time.events.loop(Phaser.Timer.SECOND*4,   function(){
	    	this.sprite.animations.play('awake', 20, false);
		}, this);
		// set lifebar
		this.sprite._lifebar = new Lifebar(this.x, this.y);
		this.sprite._lifebar.set(20);
		this.sprite._lifebar.onLifeFull(this.dead, this);
	}

};

Frog.prototype.dead = function(){
	// on frog dead
	if (this.type.indexOf('frogbaby')!==-1){
		return false;
	}
	this.dead = true;
	game.time.events.remove(this.sprite._animation._loop);
	this.sprite.frame = 2;
	game.add.tween(this.sprite).to( { alpha:0 }, Phaser.Timer.SECOND*2, Phaser.Easing.Linear.None, true).onComplete.add(function(){
		this.sprite.destroy();

		this.sprite._onDead.call(this, this.sprite);
	}, this);
};
