# map-project

This project demonstrates a genetic algorithm that simulates car evolution based on saved networks.

## Features

- **Save the Network**: Save the neural network of the car currently in front.
- **Delete Network**: Remove the current network from localStorage.

## FAQ

#### Why does the car already work?

By default, a functional network is saved to demonstrate the project's capabilities. To remove it, locate and comment out the following block in main.js:

```javascript
else{
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
```

#### Can I add more cars for training?

Yes, the global variable N in main.js determines the number of cars generated from the initial network.

## Acknowledgements

- Thanks to [Radu](https://github.com/gniziemazity) for all his teaching that make possible this project.
