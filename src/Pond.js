var Pond = {};

Pond.GAME_WIDTH = 900;
Pond.GAME_HEIGHT = 600;

Pond.START_FROG_TYPES = ['frog-female','frog-male','frog-male'];

Pond.FROG_WIDTH = 100;
Pond.FROG_HEIGHT = 100;
Pond.BABYFROG_WIDTH = 80;
Pond.BABYFROG_HEIGHT = 46;

// animation ms
Pond.EGG_ROTATE_SPEED = 25000;
Pond.FROGLET_SPEED = 20000;
Pond.TADPOLE_SPEED = 15000;
Pond.EGG_TTL = 6000;
Pond.TADPOLE_TTL = 7000;
Pond.FROGLET_TTL = 7000;
Pond.BABYFROG_TTL = 7000;

Pond.BOUNDS = new Phaser.Rectangle(Pond.FROG_WIDTH/2, Pond.FROG_HEIGHT/2, Pond.GAME_WIDTH, Pond.GAME_HEIGHT-(Pond.FROG_HEIGHT/2));
