
const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");

networkCanvas.width = 300;
carCanvas.width = 200;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road = new Road(carCanvas.width/2,carCanvas.width*0.9);
const N = 500;
const cars = generateCars(N);
let bestCar = cars[0];

if(localStorage.getItem("bestBrain")){
    let isFirstCarChange = false;
    for(let car of cars){
        car.brain = JSON.parse(localStorage.getItem("bestBrain"));
        if(isFirstCarChange){
            NeuralNetwork.mutate(car.brain,0.1);
        }
        isFirstCarChange =  true;
    }

}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50,"NPC",2),
    new Car(road.getLaneCenter(0), -300, 30, 50,"NPC",2),
    new Car(road.getLaneCenter(2), -300, 30, 50,"NPC",2),
    new Car(road.getLaneCenter(0), -500, 30, 50,"NPC",2),
    new Car(road.getLaneCenter(1), -500, 30, 50,"NPC",2),
    new Car(road.getLaneCenter(1), -700, 30, 50,"NPC",2),
    new Car(road.getLaneCenter(2), -700, 30, 50,"NPC",2)
];

animate();

function save(){
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i =1;i <= N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){

    for(let i = 0;i <traffic.length;i++){
        traffic[i].update(road.borders,[]);//empty if you don't want that they collid with each other generating a bad traffic and that they don't collide with themselves
    }
    for(const car of  cars){
        car.update(road.borders,traffic);
    }

    bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+(carCanvas.height*0.7));

    road.draw(carCtx);
    
    for(let i = 0; i < traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }

    carCtx.globalAlpha = 0.2;
    for(let car of cars){
        car.draw(carCtx,"blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx,"blue",true);

    carCtx.restore();
    

    networkCtx.lineDashOffset = -time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}
