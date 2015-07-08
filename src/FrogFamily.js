var frogFamilyId = 0;

var FrogFamily = function(){
	this.id = frogFamilyId++;
	this.frogs = [];
	this.eggs = [];
	this.tadpoles = [];
	this.froglets = [];
	this.babyfrogs = [];
};

FrogFamily.prototype.addFrog = function(frogSprite){
	
	frogSprite._onDead = function(deadFrog){
		// remove from array
		this.frogs = this.frogs.filter(function(frog){
			if (frog._id===deadFrog._id) {
				return false;
			}
		}.bind(this));

		this.checkPondEmpty();

	}.bind(this);

	this.frogs.push(frogSprite);
}

FrogFamily.prototype.lifebarUpdate = function(){
	for (var i=0; i<this.frogs.length; i++) {
		this.frogs[i]._lifebar.update();
	}
}

FrogFamily.prototype.checkPondEmpty = function(){

	var allEmpty = true;
	for (var i=0; i<Pond._families.length; i++) {
		var family = Pond._families[i];

		for (var j=0; j<family.eggs.length; j++) {

			if (family.eggs[j].alive) {
				allEmpty = false;
				break;
			}
		}

		for (var j=0; j<family.tadpoles.length; j++) {

			if (family.tadpoles[j].alive) {
				allEmpty = false;
				break;
			}
		}

		for (var j=0; j<family.froglets.length; j++) {

			if (family.froglets[j].alive) {
				allEmpty = false;
				break;
			}
		}

		for (var j=0; j<family.babyfrogs.length; j++) {

			if (family.babyfrogs[j].alive) {
				allEmpty = false;
				break;
			}
		}

		for (var j=0; j<family.frogs.length; j++) {

			if (family.frogs[j].alive) {
				allEmpty = false;
				break;
			}
		}

	}
	if (allEmpty) {
		Pond._gameOver = true;
		game.state.start('MainMenu');
	}
}
