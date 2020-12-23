class Food {
    constructor() {
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage('Images/milk.png');
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1;
        }
    }

    getFoodStock() {
        return this.foodStock;
    }

    display() {
        background(46, 139, 87);

        fill("white");
        strokeWeight(15);
        stroke("black");
        textSize(60);
        if (lastFed >= 12) {
            text("Last Feed : " + lastFed % 12 + " PM", 140, 100);
        } else if (lastFed == 0) {
            text("Last Feed : 12 AM", 140, 100);
        } else {
            text("Last Feed : " + lastFed + " AM", 140, 100);
        }
        var x = 70,
            y = 100;
        imageMode(CENTER);
        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 70;
                    y = y + 120;
                }
                image(this.image, x, y, 150, 150);
                x = x + 70;
            }
        }
    }

    bedroom() {
        background(bedroom, 550, 500);
    }

    garden() {
        background(garden, 550, 500);
    }

    washroom() {
        background(washroom, 550, 500);
    }
    Lroom() {
        background(Lroom, 550, 500);
    }
}
