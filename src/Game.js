Pond.Game = function(game){
	// define needed variables for Pond.Game
	this._player = null;
	this._PondGroup = null;
	Pond._families = [];
};

Pond.Game.prototype = {
	create: function(){
		// start the physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// set the global gravity
		this.physics.arcade.gravity.y = 0;
		// display images: background 
		this.add.image(0, 0, 'background');
		// add pause button
		this.add.button(Pond.GAME_WIDTH-48-10, 5, 'button-pause', this.managePause, this);

		// create the player
		var family = new FrogFamily();
		for (var i=0; i<Pond.START_FROG_TYPES.length; i++) {

			var frog = new Frog(family.id, Pond.START_FROG_TYPES[i]); 
			frog.x = getRandom(Pond.FROG_WIDTH, Pond.GAME_WIDTH - Pond.FROG_WIDTH);
			frog.y = getRandom(Pond.FROG_HEIGHT, Pond.GAME_HEIGHT - Pond.FROG_HEIGHT);
			frog.show();
			family.addFrog(frog.sprite);
		}
		Pond._families.push(family);
		Pond.events.attachDrag(family.frogs);
	},

	managePause: function(){
		// pause the game
		this.game.paused = true;
		// add proper informational text
		var pausedText = this.add.text(220, 250, "Game paused.\nClick anywhere to continue.", { font: "36px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" });
		// set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
		}, this);
	},

	update: function () {
		for (var i=0; i<Pond._families.length; i++) {
			Pond._families[i].lifebarUpdate();
		}
	}

};



