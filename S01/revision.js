const firstName = 'Aymeric';
console.log(firstName);

let age = 22;
age++;

console.log(age);

const test = true + 1;
const test2 = 125 + '9';
console.log(test);
console.log(test2);

console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());

function displayUser(firstName, age) {
    // Back apostrophe avant le Bonjour pour faire fonctionner cette facon d'écrire
    console.log(`Bonjour je m'appelle ${firstName} et j'ai ${age} ans`);
}

displayUser('Yakim', 19);

const fruits = ['Kiwi', 'Banane', 'Fraise', 'Pamplemousse', 'Mangue'];

for (let fruit of fruits) {
    console.log(fruit);
}

fruits.push('Pomme');
console.log('=================')

fruits.forEach(f => console.log(f));

const sum = (a, b) => a + b;

const result = sum(12, 8);
console.log(result);

const filtre = fruits.filter(f => f.length > 6);
console.log(filtre);

const numbers = [10, 20, 30, 40];
const MULTIPLIER = 3;

const product = numbers.map(n => n * MULTIPLIER).filter(n => n > 75).map(n => n + 9);
console.log(product);
console.log(numbers);

const avenger = {
    hero: 'Spider-Man',
    alterEgo: 'Peter Parker',
    movies: [{ title: 'Spider-Man 1' }, { title: 'Spider-Man 2' }, { title: 'Spider-Man 3' }, { title: 'Amazing Spider-Man' }, { title: 'Amazing Spider-Man 2' }, { title: 'Spider-Man : Homecoming' }, { title: 'Spider-Man : Far from Home' }, { title: 'Spider-Man : No way Home' }]
};

const avenger = {
    hero: 'Iron Man',
    alterEgo: 'Tony Stark',
    movies: [{ title: 'Iron Man 1' }, { title: 'Iron Man 2' }, { title: 'Iron Man 3' }, { title: 'Avengers' }, { title: 'Avengers : Age of Ultron' }, { title: 'Avengers : Infinity War' }, { title: 'Avengers : Endgame' }, { title: 'Spider-Man : Homecoming' }, { title: 'Captain America : Civil War' }]
};

class Avenger {
    constructor(hero, alterEgo, movies) {
        this.hero = hero;
        this.alterEgo = alterEgo;
        this.movies = movies;
    }

}

const oneAvenger = new Avenger('Hulk', 'Bruce Baner', [{ title: 'The Incredible Hulk' }, { title: 'Thor 3 : Ragnarock' }, { title: 'Avengers' }, { title: 'Avengers : Age of Ultron' }, { title: 'Avengers : Infinity War' }, { title: 'Avengers : Endgame' }])
console.log(oneAvenger);

console.log(avenger.hero);