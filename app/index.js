global.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('game', require('./states/game.js'));
game.state.add('start', require('./states/start.js'));
game.state.start('start');
