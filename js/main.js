
const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");

networkCanvas.width = 300;
carCanvas.width = 200;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road = new Road(carCanvas.width/2,carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50,"AI");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50,"NPC",2)
];

animate();

function animate(time){

    for(let i = 0;i <traffic.length;i++){
        traffic[i].update(road.borders,[]);//empty if you don't want that they collid with each other generating a bad traffic and that they don't collide with themselves
    }

    car.update(road.borders,traffic);
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-car.y+(carCanvas.height*0.7));

    road.draw(carCtx);
    for(let i = 0; i < traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx,"blue");
    carCtx.restore();
    

    networkCtx.lineDashOffset = -time/50;
    Visualizer.drawNetwork(networkCtx,car.brain);
    requestAnimationFrame(animate);
}
