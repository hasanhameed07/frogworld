### FrogWorld
#### Frogs lifecycle simulation and game

###Datatypes Structure:

- Pond (base class holding all frogworld objects and config)
	- Pond._families (Array of FrogFamily objects)
		- FrogFamily (A Class)
			-- Eggs 	(array of Egg objects)
			-- Tadpoles (array of Tadpole objects)
			-- Froglets (array of Froglets objects)
			-- BabyFrog (array of Frog objects with type=frogbaby)
			-- Frogs 	(array of Frog objects)
