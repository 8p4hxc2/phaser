const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

let snakeHead = null;
let snakeBody = [];
let bodyPath = [];
let food = null;
let keyboard;
let directionX = 0;
let directionY = 0;
const SPEED = 200;

function preload() {
  game.load.image('body', 'assets/box.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.setBounds(0, 0, 800, 600);

  addHead();
  addFood();
  snakeBody.push();
  addBody();
  addBody();
  addBody();
  addBody();

  keyboard = game.input.keyboard.createCursorKeys();
}

function update() {
  moveSnake();
  handleKeyboard();

  game.physics.arcade.overlap(snakeHead, food, eat, null, this);
}

function render() {
  game.debug.spriteInfo(snakeHead, 32, 32);
}

function moveSnake() {
  snakeHead.body.angularVelocity = 0;
  snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, SPEED));
  checkBoundaries();

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

function checkBoundaries() {
  if (snakeHead.x > game.world.bounds.width) {
    snakeHead.x = 0;
  }

  if (snakeHead.x < 0) {
    snakeHead.x = game.world.bounds.width;
  }

  if (snakeHead.y > game.world.bounds.height) {
    snakeHead.y = 0;
  }

  if (snakeHead.y < 0) {
    snakeHead.y = game.world.bounds.height;
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

function addFood() {
  food = game.add.sprite(Math.floor(Math.random() * 800), Math.floor(Math.random() * 600), 'body');
  food.anchor.setTo(0.5, 0.5);
  game.physics.enable(food, Phaser.Physics.ARCADE);
}

function moveFood() {
  food.x = Math.floor(Math.random() * 800);
  food.y = Math.floor(Math.random() * 600);
}
