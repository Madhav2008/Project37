var dog, sadDog, happyDog, garden, washroom, database;
var foodS, foodStock;
var fedTime, lastFed, currentTime;
var feed, addFood;
var foodObj;
var gameState, readState;

function preload() {
    sadDog = loadImage("Images/Dog.png");
    happyDog = loadImage("Images/happy dog.png");
    garden = loadImage("Images/Garden.png");
    washroom = loadImage("Images/Wash Room.png");
    bedroom = loadImage("Images/Bed Room.png");
    Lroom = loadImage("Images/Living Room.png");
}

function setup() {
    createCanvas(1532, 714);
    database = firebase.database();

    foodObj = new Food();

    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    fedTime = database.ref('FeedTime');
    fedTime.on("value", function(data) {
        lastFed = data.val();
    });

    readState = database.ref('gameState');
    readState.on("value", function(data) {
        gameState = data.val();
    });

    dog = createSprite(1300, 550, 150, 150);
    dog.addImage(sadDog);
    dog.scale = 0.40;

    feed = createButton("Feed the dog");
    feed.position(1200, 145);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(1210, 95);
    addFood.mousePressed(addFoods);
}

function draw() {
    currentTime = hour();
    if (currentTime == (lastFed + 1)) {
        update("Playing");
        foodObj.garden();
    } else if (currentTime == (lastFed + 2)) {
        update("Sleeping");
        foodObj.bedroom();
    } else if (currentTime == (lastFed + 3)) {
        update("Bathing");
        foodObj.washroom();
    } else if (currentTime == (lastFed + 4)) {
        update("Living");
        foodObj.Lroom();
    } else {
        update("Hungry")
        foodObj.display();
    }

    if (gameState != "Hungry") {
        feed.hide();
        addFood.hide();
        dog.hide();
    }

    drawSprites();
}

function readStock(data) {
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}

function feedDog() {
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
    database.ref('/').update({
        Food: foodObj.getFoodStock(),
        FeedTime: hour(),
        gameState: "Hungry"
    })
}

function addFoods() {
    foodS++;
    database.ref('/').update({
        Food: foodS
    })
}

function update(state) {
    database.ref('/').update({
        gameState: state
    })
}