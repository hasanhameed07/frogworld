Pond.MainMenu = function(game){};

Pond.MainMenu.prototype = {
	
	create: function(){
		// display images
	 	bmd = game.add.bitmapData(Pond.GAME_WIDTH, Pond.GAME_HEIGHT);
	    bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, Pond.GAME_WIDTH, Pond.GAME_HEIGHT);
		bmd.ctx.fillStyle = '#047556';
		bmd.ctx.fill();
    	this.life = game.add.sprite(0, 0, bmd);

		if (Pond._gameOver) {
			Pond._gameOver = false;
			this.add.text(Pond.GAME_WIDTH/2, Pond.GAME_HEIGHT/2 - 100, "Game Over", { font: "44px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" }).anchor.setTo(0.5,0.5);
		}
		else {
			this.add.sprite(Pond.GAME_WIDTH/2, Pond.GAME_HEIGHT/2 - 100, 'title').anchor.setTo(0.5,0.5);
		}
		// add the button that will start the game
		this.add.button(Pond.GAME_WIDTH/2, Pond.GAME_HEIGHT/2 + 120, 'button-start', this.startGame, this, 1, 0, 2).anchor.setTo(0.5,0.5);
	},

	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};