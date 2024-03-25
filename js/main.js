
const canvas = document.getElementById("main-canvas");


canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50,"KEYS");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50,"NPC",2)
];

animate();

function animate(){

    for(let i = 0;i <traffic.length;i++){
        traffic[i].update(road.borders,[]);//empty if you don't want that they collid with each other generating a bad traffic and that they don't collide with themselves
    }

    car.update(road.borders,traffic);
    canvas.height = window.innerHeight;
    ctx.save();
    ctx.translate(0,-car.y+(canvas.height*0.7));//mirar si es this.car

    road.draw(ctx);
    for(let i = 0; i < traffic.length;i++){
        traffic[i].draw(ctx,"red");
    }
    car.draw(ctx,"blue");
    ctx.restore();
    requestAnimationFrame(animate);
}
