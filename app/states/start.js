let keyboard;

function preload() {}

function create() {
  let key1 = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  key1.onDown.add(startGame, this);
}

function update() {
}

function startGame() {
  game.state.start('game');
}

module.exports = {
  preload: preload,
  create: create,
  update: update
};
