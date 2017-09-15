let snakeHead = null;
let snakeBody = [];
let bodyPath = [];
let food = null;
let enemies = [];
let keyboard;
let directionX = 0;
let directionY = 0;
const SPEED = 200;

function preload() {
  game.load.image('body', 'assets/box.png');
  game.load.image('enemy', 'assets/enemy.gif');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.setBounds(0, 0, 800, 600);

  addHead();
  addFood();
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();
  addEnemy();
  snakeBody.push();
  addBody();
  addBody();
  addBody();
  addBody();

  keyboard = game.input.keyboard.createCursorKeys();
}

function update() {
  moveSnake();
  moveEnemies();
  handleKeyboard();

  game.physics.arcade.overlap(snakeHead, food, eat, null, this);
  game.physics.arcade.overlap(snakeHead, enemies, hit, null, this);
}

function render() {
  game.debug.spriteInfo(snakeHead, 32, 32);
}

function moveSnake() {
  snakeHead.body.angularVelocity = 0;
  snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, SPEED));
  checkBoundaries(snakeHead);

  if (bodyPath.length > 0) {
    var part = bodyPath.pop();

    part.setTo(snakeHead.x, snakeHead.y);

    bodyPath.unshift(part);

    for (var i = 1; i <= snakeBody.length - 1; i++) {
      snakeBody[i].x = (bodyPath[i * 6]).x;
      snakeBody[i].y = (bodyPath[i * 6]).y;
    }
  }
}

function handleKeyboard() {
  if (keyboard.left.isDown) {
    snakeHead.body.angularVelocity = -SPEED;
  } else if (keyboard.right.isDown) {
    snakeHead.body.angularVelocity = SPEED;
  }
}

function checkBoundaries(who) {
  if (who.x > game.world.bounds.width) {
    who.x = 0;
  }

  if (who.x < 0) {
    who.x = game.world.bounds.width;
  }

  if (who.y > game.world.bounds.height) {
    who.y = 0;
  }

  if (who.y < 0) {
    who.y = game.world.bounds.height;
  }
}

function addHead() {
  snakeHead = game.add.sprite(300, 300, 'body');
  snakeHead.anchor.setTo(0.5, 0.5);
  game.physics.enable(snakeHead, Phaser.Physics.ARCADE);
}

function addBody() {
  let body = game.add.sprite(snakeHead.x, snakeHead.y, 'body');
  body.anchor.setTo(0.5, 0.5);
  snakeBody.push(body);

  for (var i = 0; i < 6; i++) {
    bodyPath.push(new Phaser.Point(snakeHead.x, snakeHead.y));
  }
}

function eat(head, food) {
  moveFood();
  addBody();
}

function hit(head, enemy) {
  //console.log('hit enemy');
}

function addFood() {
  food = game.add.sprite(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 'body');
  food.anchor.setTo(0.5, 0.5);
  game.physics.enable(food, Phaser.Physics.ARCADE);
}

function moveFood() {
  food.x = Math.floor(Math.random() * 800);
  food.y = Math.floor(Math.random() * 600);
}

function addEnemy() {
  let enemy = game.add.sprite(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 'enemy');
  enemy.anchor.setTo(0.5, 0.5);
  game.physics.enable(enemy, Phaser.Physics.ARCADE);
  enemies.push(enemy);
}

function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    let move = game.rnd.integerInRange(0, 50);

    if (move < 10) {
      enemies[i].body.angularVelocity = game.rnd.integerInRange(-200, 200);
    }
    enemies[i].body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(enemies[i].angle, SPEED));
    checkBoundaries(enemies[i]);
  }
}

module.exports = {
  preload: preload,
  create: create,
  update: update,
  render: render
};
