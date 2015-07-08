Pond.events = {

	attachDrag: function (sprites) {
		var i = 0
			frogsLength = sprites.length,
			frog = null;
		for (; i<frogsLength; i++) {
			frog = sprites[i];
			if (frog.inputEnabled) {
				continue;
			}
			// attach events
			frog.inputEnabled = true;
		    frog.input.enableDrag();
			frog.input.boundsRect = Pond.BOUNDS;

		    frog.events.onInputOver.add(Pond.events.onOver, this);
		    frog.events.onInputOut.add(Pond.events.onOut, this);
		    frog.events.onDragStart.add(Pond.events.onDragStart, this);
		    frog.events.onDragStop.add(Pond.events.onDragStop, this);

   			frog.dragPosition = new Phaser.Point(frog.x, frog.y);
   		}
	},

	onOver: function (sprite, pointer) {
    	sprite.tint = 0xDDFFDD;
    	// show name
    	if (sprite._text) {
    		sprite._text.x = sprite.x;
    		sprite._text.y = sprite.y-65;
	   	 	sprite._text.visible = true;
    	}
    	else {
	    	sprite._text = game.add.text(sprite.x , sprite.y-65, sprite._name, { fill: 'white', font: 'normal 12pt Arial' });
	    	sprite._text.anchor.x = 0.5;
	    	sprite._text.anchor.y = 0.5;
	    	sprite._text.setShadow(1, 2, 'rgba(0,0,0,0.5)', 2);
	    }
	    // show lifebar
   		sprite._lifebar.show();
	},

	onOut: function (sprite, pointer) {
	    sprite.tint = 0xffffff;
    	sprite._text.visible = false;
    	sprite._lifebar.hide();
	},

	onDragStart: function (sprite, pointer) {

	    sprite.dragPosition.set(sprite.x, sprite.y);
    	sprite._text.visible = false;
    	sprite._lifebar.hide();
    	// used to reset frog when already attracted to mating
	    if (!sprite._initX) {
		    sprite._initX = sprite.x;
		    sprite._initY = sprite.y;
		}
		// find matches & mark available
		Pond._families.forEach(function(family, i){

			family.frogs.forEach(function(frog, j){
			    if (sprite._type==='frog-male' && sprite._id!==frog._id && frog._type==='frog-female' && !frog._mating && (!sprite._mated || sprite._mated.indexOf(frog._id)===-1))
			    {
			      	Pond.events.markAvailable(frog);
			    }
			});
		});
	},

	markAvailable: function(sprite){
		
		sprite._ico = game.add.sprite(sprite.x - 16, sprite.y-80, 'ico-heart');
	},

	update: function  () {

	},

	onDragStop: function (sprite, pointer) {

    	sprite._lifebar.updateCords(sprite.x, sprite.y);

    	var isOverlapped = false;

    	// check if dropped on a match
		Pond._families.forEach(function(family, i){

			family.frogs.forEach(function(frog, j){
				sprite._mating = false;
			    if (sprite._type==='frog-male' && sprite._id!==frog._id && frog._type==='frog-female' && (!sprite._mated || sprite._mated.indexOf(frog._id)===-1) && sprite.overlap(frog))
			    {
			    	if (!frog._mating) {
			    		// lets do it!
			    		Pond.events.matingStart(sprite, frog);
			    	}
			    	else {
			    		// move back to its own place
						game.add.tween(sprite).to( { x: sprite._initX, y: sprite._initY }, 500, Phaser.Easing.Linear.None, true).onComplete.add(function(){
	    					sprite._lifebar.updateCords(sprite._initX, sprite._initY);
						}, this);
			      	}
			      	isOverlapped = true;
			    }
			    if (frog._ico)
				    frog._ico.destroy();
			
			});
		});

	    if (!isOverlapped) {
		    sprite._initX = sprite.x;
		    sprite._initY = sprite.y;
	    }
	},

	matingStart: function(sprite, againstSprite){

		sprite._mating = true;
		againstSprite._mating = true;
		// maintain history
		if (!sprite._mated)
			sprite._mated = [];
		sprite._mated.push(againstSprite._id);

		// sit aside
		game.add.tween(sprite).to( { x: againstSprite.x + sprite.width, y: againstSprite.y }, 500, Phaser.Easing.Linear.None, true);

		// create eggs
		game.time.events.add(Phaser.Timer.SECOND, function(){

			var loopLength = getRandom(5,8);
			var i = 0;
		 	game.time.events.repeat(100 , loopLength,   function(){

				var egg = new Egg(i); 
				egg.x = againstSprite.x;
				egg.y = getRandom(againstSprite.y + 55 , againstSprite.y + 55);
				egg.show();
				Pond._families[sprite._familyId].eggs.push(egg.sprite);

				// on last egg
				if (i+1===loopLength) {
					Pond.events.destroySomeEggs(sprite);
				}
				i++;

			}, this);
		}, this);
	},

	/*
	 * Destroy some random eggs as in reality
	 */
	destroySomeEggs: function(sprite){
		game.time.events.add(Pond.EGG_TTL, function(){
			var j = 0;
			var i = 0;
			var eggs = Pond._families[sprite._familyId].eggs;
			var loopLength = getRandom(2, 3);

		 	game.time.events.repeat(300 , loopLength, function(){

				do {
					j = getRandom(0, eggs.length);
				}
				while(!eggs[j].alive);

				game.add.tween(eggs[j]).to( { alpha:0 }, 700, Phaser.Easing.Linear.None,true);
				eggs[j].alive = false;

				if (i+1===loopLength) {
					Pond._families[sprite._familyId].eggs = eggs;
					Pond.events.turnToTadpole(sprite);
				}
				i++;

			}, this);
		}, this);
	},

	turnToTadpole: function(sprite){
		game.time.events.add(Phaser.Timer.SECOND, function(){
			var i = 0;
			var eggs = Pond._families[sprite._familyId].eggs;
			var loopLength = eggs.length;
			var angle = loopLength * -1;

		 	game.time.events.repeat(300 , loopLength, function(){

				if (eggs[i].alive) {
				    var tadpole = new Tadpole(i, angle); 
					tadpole.x = eggs[i].x;
					tadpole.y = eggs[i].y;
					tadpole.show();
					Pond._families[sprite._familyId].eggs[i].destroy();
					Pond._families[sprite._familyId].tadpoles.push(tadpole.sprite);
					angle += 2;
				}

				if (i+1===loopLength) {
					Pond.events.turnToFroglet(sprite);
				}
				i++;

			}, this);
		}, this);
	},

	turnToFroglet: function(sprite){

		game.time.events.add(Pond.TADPOLE_TTL, function(){
			var i = 0;
			var tadpoles = Pond._families[sprite._familyId].tadpoles;
			var loopLength =  tadpoles.length;
			var angle = loopLength * -1;

		 	game.time.events.repeat(300 , loopLength, function(){

				if (tadpoles[i].alive) {
				 	var froglet = new Froglet(i, angle); 
					froglet.x = tadpoles[i].x;
					froglet.y = tadpoles[i].y;
					froglet.show();
					Pond._families[sprite._familyId].tadpoles[i].destroy();
					Pond._families[sprite._familyId].froglets.push(froglet.sprite);
					angle += 2;
				}

				if (i+1===loopLength) {
					Pond.events.turnToBabyFrog(sprite);
				}
				i++;

			}, this);
		}, this);
	},


	turnToBabyFrog: function(sprite){

		game.time.events.add(Pond.FROGLET_TTL, function(){
			var i = 0;
			var froglets = Pond._families[sprite._familyId].froglets;
			var loopLength = froglets.length;
			var angle = loopLength * -1;

		 	game.time.events.repeat(300 , loopLength, function(){

				if (froglets[i].alive) {

					var type = (getRandom(0,2)===0)? 'frogbaby-male' : 'frogbaby-female' ;
					if (i+1===loopLength) {
						// make sure all babyfrogs aren't of same gender
						type = Pond.events.getUniqueType(type, Pond._families[sprite._familyId].babyfrogs);
					}
					var babyfrog = new Frog(sprite._familyId, type); 
					babyfrog.x = getXWithinBounds(froglets[i].x, Pond.BABYFROG_WIDTH);
					babyfrog.y = getYWithinBounds(froglets[i].y, Pond.BABYFROG_HEIGHT)
					babyfrog.show();
					Pond._families[sprite._familyId].froglets[i].destroy();
					Pond._families[sprite._familyId].babyfrogs.push(babyfrog.sprite);
				}

				if (i+1===loopLength) {
					Pond.events.turnToFrog(sprite);
				}
				i++;

			}, this);
		}, this);
	},

	turnToFrog: function(sprite){
		game.time.events.add(Pond.BABYFROG_TTL, function(){
			var i = 0;
			var babyfrogs = Pond._families[sprite._familyId].babyfrogs;
			var loopLength = babyfrogs.length;
			var angle = loopLength * -1;
			var family = new FrogFamily();

		 	game.time.events.repeat(300 , loopLength, function(){

				if (babyfrogs[i].alive) {

					var type = (babyfrogs[i]._type==='frogbaby-male')? 'frog-male' : 'frog-female' ;
					var frog = new Frog(family.id, type); 
					frog.x = getXWithinBounds(babyfrogs[i].x, Pond.FROG_WIDTH);
					frog.y = getYWithinBounds(babyfrogs[i].y-10, Pond.FROG_HEIGHT)
					frog.show();
					Pond._families[sprite._familyId].babyfrogs[i].destroy();
					family.addFrog(frog.sprite);
				}

				if (i+1===loopLength) {
					Pond.events.attachDrag(family.frogs);
				}
				i++;

			}, this);
			Pond._families.push(family);

		}, this);
	},


	getUniqueType: function(type, sprites){
		
		var i = 0
			frogsLength = sprites.length,
			same = true;
		for (; i<frogsLength; i++) {
			if (sprites[i]._type!==type ) {
				same = false;
				return type;
			}
		}
		return  (type==='frogbaby-female')? 'frogbaby-male' : 'frogbaby-female' ;
	}

};

