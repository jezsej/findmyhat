const prompt = require('prompt-sync')({ sigint: true });
const pathCharacter = '*';
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';



class Field {

    constructor(field) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = pathCharacter;
    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    static generateField(height, width, percentage = 0.1) {
        let field = new Array(height).fill(0).map(el => {
            return new Array(width)
        }); // Create an empty array of arrays the height of the field

        for (let i = 0; i < height; i++) { // Loop through the height of the field
            for (let j = 0; j < width; j++) { // Loop through the width of the field
                const prob = Math.random(); // Generate a random number between 0 and 1
                field[i][j] = prob > percentage ? fieldCharacter : hole; // If the random number is greater than the percentage, add a field character, otherwise add a hole
            }
        }

        // Set the "hat" location

        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)

        }

        // Make sure the "hat" is not at the starting point

        while (hatLocation.x === 0 && hatLocation.y === 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }

        field[hatLocation.y][hatLocation.x] = hat;

        return field;
    }

    isInBounds() {
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }

    isHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }

    isHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }

    runGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.isInBounds()) {
                console.log('Out of bounds instruction!');
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log('Sorry, you fell down a hole!');
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log('Congrats, you found your hat!');
                playing = false;
                break;
            }
            // Update the current location on the map
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    askQuestion() {
        const answer = prompt('Which way? ').toUpperCase();
        switch (answer) {
            case 'W':
                this.locationX -= 1;
                this.print();
                break;
            case 'S':
                this.locationX += 1;
                this.print();
                break;
            case 'A':
                this.locationY -= 1;
                this.print();
                break;
            case 'D':
                this.locationY += 1;
                this.print();
                break;
            default:
                console.log('Enter W, A, S or D.');
                this.askQuestion();
                break;
        }
    }




}


module.exports = Field;