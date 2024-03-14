
const canvas = document.getElementById("main-canvas");


canvas.height = window.innerHeight;//mirar
canvas.width = 200;

const ctx = canvas.getContext("2d");

let car = new Car(100, 100, 30, 50);
car.draw(ctx)