
const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");

networkCanvas.width = 300;
carCanvas.width = 200;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road = new Road(carCanvas.width/2,carCanvas.width*0.9);
const N = 10;
const cars = generateCars(N);
let bestCar = cars[0];
let defaultBestCar = '{"levels":[{"inputs":[0,0,0,0.08121414863744125,0.5027566803730799],"outputs":[0,0,1,1,1,0],"biases":[0.114246128541176,0.1372179977835926,-0.29863651503961214,-0.14498903594103335,-0.16016910620297295,0.18563161196513414],"weights":[[-0.2103266407015241,0.09315592726338144,-0.09310422747383312,-0.2658786040008864,0.2711360772463711,-0.039361662513074866],[-0.4938622497720295,-0.23033950795069114,-0.4585085887379116,-0.4180890471789623,0.11608580347193831,0.020537774488990416],[-0.13116562324991737,-0.24327938767956678,0.2396607789077697,-0.3174807890945338,-0.04419180953990977,-0.2314086067605868],[0.10125683416315037,0.2236304320122278,0.47609495121207485,0.22973838305091385,-0.2580716881262527,0.21424858034897726],[0.03505714750819937,0.22548520663925622,-0.16677982557569257,0.4598807681988718,-0.23875051796723407,0.10732079606495594]]},{"inputs":[0,0,1,1,1,0],"outputs":[1,0,0,0],"biases":[-0.24151186336228037,0.31522998722421747,-0.10542832373821312,0.0791551242741505],"weights":[[-0.05456064436699119,-0.3478338129428008,0.15515697486876123,-0.19460691474826605],[-0.28371558813720704,0.3810697995481829,-0.14145910586430266,-0.32455042581974314],[0.1810799175705436,0.3246487964475635,-0.18964740128729612,-0.29416294936445864],[-0.04114230909597892,-0.30079801408752416,-0.10326303717369298,-0.09731611953762889],[-0.035693220092113884,-0.40992091643614614,0.09667931586795761,-0.21693422465518686],[-0.11109420447594874,0.36001462862152567,-0.3344983916966049,-0.3470690381708941]]}]}';
if(localStorage.getItem("bestBrain")){
    let isFirstCarChange = false;
    for(let car of cars){
        car.brain = JSON.parse(localStorage.getItem("bestBrain"));
        if(isFirstCarChange){
            NeuralNetwork.mutate(car.brain,0.1);
        }
        isFirstCarChange =  true;
    }
} else{
    //  comment or delete this else if you don't want a default brain
    let isFirstCarChange = false;
    for(let car of cars){
        car.brain = JSON.parse(defaultBestCar);
        if(isFirstCarChange){
            NeuralNetwork.mutate(car.brain,0.1);
        }
        isFirstCarChange =  true;
    }
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50,"NPC",2,getRandomColor()),
    new Car(road.getLaneCenter(0), -300, 30, 50,"NPC",2,getRandomColor()),
    new Car(road.getLaneCenter(2), -300, 30, 50,"NPC",2,getRandomColor()),
    new Car(road.getLaneCenter(0), -500, 30, 50,"NPC",2,getRandomColor()),
    new Car(road.getLaneCenter(1), -500, 30, 50,"NPC",2,getRandomColor()),
    new Car(road.getLaneCenter(1), -700, 30, 50,"NPC",2,getRandomColor()),
    new Car(road.getLaneCenter(2), -700, 30, 50,"NPC",2,getRandomColor())
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

    for(let npcCar of traffic){
        npcCar.update(road.borders,[]);//empty if you don't want that they collid with each other generating a bad traffic and that they don't collide with themselves
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
    
    for(let npcCar of traffic){
        npcCar.draw(carCtx);
    }

    carCtx.globalAlpha = 0.2;
    for(let car of cars){
        car.draw(carCtx);
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx,true);

    carCtx.restore();
    

    networkCtx.lineDashOffset = -time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}
