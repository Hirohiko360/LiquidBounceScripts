var scriptName = "snake";
var scriptAuthor = "Senk Ju";
var scriptVersion = 1.0;

var GL11 = Java.type("org.lwjgl.opengl.GL11");
var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");

var snake;
var lastKey;
var food;
var score;

var blockSize = 20;
var fieldWidth = 400;
var fieldHeight = 300;
var snakeSpeed = 3;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function setupGame() {
    snake = [
        {
            x: 0,
            y: 0
        }
    ];

    moveFood();

    lastKey = 208;
    score = 0;
}

function moveFood() {
    var foodX = getRandomInt(0, fieldWidth / blockSize);
    var foodY = getRandomInt(0, fieldHeight / blockSize);

    food = {
        x: foodX,
        y: foodY
    }
}

function drawRect(paramXStart, paramYStart, paramXEnd, paramYEnd, color) {
    var alpha = (color >> 24 & 0xFF) / 255;
    var red = (color >> 16 & 0xFF) / 255;
    var green = (color >> 8 & 0xFF) / 255;
    var blue = (color & 0xFF) / 255;

    GL11.glEnable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glEnable(GL11.GL_LINE_SMOOTH);

    GL11.glPushMatrix();
    GL11.glColor4f(red, green, blue, alpha);
    GL11.glBegin(GL11.GL_TRIANGLE_FAN);
    GL11.glVertex2d(paramXEnd, paramYStart);
    GL11.glVertex2d(paramXStart, paramYStart);
    GL11.glVertex2d(paramXStart, paramYEnd);
    GL11.glVertex2d(paramXEnd, paramYEnd);

    GL11.glEnd();
    GL11.glPopMatrix();

    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);

    GL11.glColor4f(1, 1, 1, 1);
}

function SnakeModule() {

    this.getName = function () {
        return "Snake";
    }

    this.getDescription = function () {
        return "Allows you to play a game of Snake in LiquidBounce.";
    }

    this.getCategory = function () {
        return "Misc";
    }

    this.onEnable = function () {
        setupGame();
    }

    this.onKey = function (event) {
        var key = event.getKey();

        if (key === 205 && lastKey !== 203 || key === 203 && lastKey !== 205
            || key === 200 && lastKey !== 208 || key === 208 && lastKey !== 200) {

            lastKey = key;
        }
    }

    this.onUpdate = function () {
        if (mc.thePlayer.ticksExisted % snakeSpeed === 0) {
            if (snake[0].x === food.x && snake[0].y === food.y) {
                score += 1;
                moveFood();
                snake.push({
                    x: snake[0].x,
                    y: snake[0].y
                })
            }

            for (var i = snake.length - 1; i > 0; i--) {
                if (i - 1 >= 0) {
                    snake[i].x = snake[i - 1].x;
                    snake[i].y = snake[i - 1].y;
                }
            }

            switch (lastKey) {
                case 205: // Right
                    snake[0].x += 1;

                    break;

                case 203: // Left
                    snake[0].x -= 1

                    break;

                case 200: // Up
                    snake[0].y -= 1;

                    break;


                case 208: // Down
                    snake[0].y += 1;

                    break;
            }

            // Snake collided with itself
            for (var i = 1; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    setupGame();
                }
            }
        }
    }

    this.onRender2D = function (event) {
        var resolution = new ScaledResolution(mc);

        var width = resolution.getScaledWidth();
        var height = resolution.getScaledHeight();

        var startX = width / 2 - fieldWidth / 2;
        var startY = height / 2 - fieldHeight / 2;

        drawRect(startX, startY, startX + fieldWidth, startY + fieldHeight, 0x7E000000);

        for (var index in snake) {
            var snakeStartX = snake[index].x * blockSize + startX;
            var snakeStartY = snake[index].y * blockSize + startY;

            drawRect(snakeStartX, snakeStartY, snakeStartX + blockSize, snakeStartY + blockSize, (index == 0) ? 0xFF339960 : 0xFF3CB371);
        }

        // Snake out of bounds
        if (snake[0].x * blockSize + startX >= startX + fieldWidth || snake[0].x * blockSize + startX < startX || snake[0].y * blockSize + startY < startY || snake[0].y * blockSize + startY >= startY + fieldHeight) {
            setupGame();
        }

        var foodX = food.x * blockSize + startX;
        var foodY = food.y * blockSize + startY;

        drawRect(foodX, foodY, foodX + blockSize, foodY + blockSize, 0xFFDC143C);

        mc.fontRendererObj.drawStringWithShadow("Score: " + score, startX + 10, startY + 10, 10395294);
    }
}


var snakeModule = new SnakeModule();

function onEnable() {
    moduleManager.registerModule(snakeModule);
}

function onDisable() {
    moduleManager.unregisterModule(snakeModule);
}