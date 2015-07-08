Pond.Preloader = function(game){
};
Pond.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#5B9BB3';
		this.preloadBar = this.add.sprite((Pond.GAME_WIDTH-311)/2, (Pond.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/bg.jpg');
		this.load.image('title', 'img/title.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('ico-heart', 'img/ico_heart.png');
		this.load.image('egg', 'img/egg.png');
		this.load.spritesheet('tadpole', 'img/tadpole.png', 20, 32);
		this.load.spritesheet('froglet', 'img/froglet.png', 30, 48);
		this.load.spritesheet('frogbaby-male', 'img/frogbaby-male.png', Pond.BABYFROG_WIDTH, Pond.BABYFROG_HEIGHT);
		this.load.spritesheet('frogbaby-female', 'img/frogbaby-female.png', Pond.BABYFROG_WIDTH, Pond.BABYFROG_HEIGHT);
		this.load.spritesheet('frog-male', 'img/frog-male.png', Pond.FROG_WIDTH, Pond.FROG_HEIGHT);
		this.load.spritesheet('frog-female', 'img/frog-female.png', Pond.FROG_WIDTH, Pond.FROG_HEIGHT);

		// load spritesheets
		this.load.spritesheet('button-start', 'img/button-start.png', 202, 72);
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};