var Lifebar = function(x,y){
  
    y = y  - 45;
    var TOTAL_WIDTH = 70;
    var TOTAL_HEIGHT = 7;
    var TOTAL_LIFE_WIDTH = 68;
    var TOTAL_LIFE_HEIGHT = 5;

    var bmd = game.add.bitmapData(TOTAL_WIDTH, TOTAL_HEIGHT);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, TOTAL_WIDTH, TOTAL_HEIGHT);
    bmd.ctx.fillStyle = '#00685e';
    bmd.ctx.fill();

    this.bglife = game.add.sprite(x, y, bmd);
    this.bglife.anchor.set(0.5);
    this.bglife.visible = false;

    bmd = game.add.bitmapData(TOTAL_LIFE_WIDTH, TOTAL_LIFE_HEIGHT);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, TOTAL_LIFE_WIDTH, TOTAL_LIFE_HEIGHT);
    bmd.ctx.fillStyle = '#00f910';
    bmd.ctx.fill();

    this.widthLife = new Phaser.Rectangle(0, 0, 0, bmd.height);
    this.totalLife = TOTAL_LIFE_WIDTH;

    this.life = game.add.sprite(x - this.bglife.width/2 +1, y, bmd);
    this.life.anchor.y = 0.5;
    this.life.cropEnabled = true;
    this.life.crop(this.widthLife);
    this.life.visible = false;

    game.time.events.loop(1500, this.cropLife, this);
};

Lifebar.prototype.cropLife = function(){
    if(this.widthLife.width >= this.totalLife){
      this.widthLife.width = this.totalLife;
      if (this.onLifeFull)
      	this.onLifeFull.call(this.onLifeFullContext, this.onLifeFullContext);
    }
    else {
      game.add.tween(this.widthLife).to( { width: (this.widthLife.width + (this.totalLife / 20)) }, 1500, Phaser.Easing.Linear.None, true);
    }
};

Lifebar.prototype.onLifeFull = function(fn, context){
	this.onLifeFull = fn;
	this.onLifeFullContext = context;
};

Lifebar.prototype.update = function(){
    this.life.updateCrop();
};

Lifebar.prototype.set = function(width){
 	if(width >= this.totalLife){
      	width = this.totalLife;
  	}
  	else {
  		this.widthLife.width += width;
  	}
};

Lifebar.prototype.updateCords = function(x, y){
    this.bglife.x = x;
    this.bglife.y = y - 45;
    this.life.x = x - this.bglife.width/2 +1;
    this.life.y = y - 45;
};

Lifebar.prototype.show = function(){
	this.life.visible = true;
	this.bglife.visible = true;
};

Lifebar.prototype.hide = function(){
	this.life.visible = false;
	this.bglife.visible = false;
};
