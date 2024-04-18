
class Visualizer{
    static drawNetwork(ctx,network){
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width-margin*2;
        const height = ctx.canvas.height-margin*2;

        Visualizer.drawLevel(ctx,network.levels[0],left,top,width,height);
    }

    static drawLevel(ctx,level,left,top,width,height){
        const right = left+width;
        const bottom = top+height;
        const nodeRadius = 18;

        const {inputs,outputs} = level;

        for(let i = 0; i < inputs.length;i++){
            const x = lerp(left,right,inputs.length == 1 ? 0.5: i/(inputs.length-1));
            ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius,0,Math.PI*2);
            ctx.fillStyle = "white";
            ctx.fill();
            
        }

        for(let i = 0; i < outputs.length;i++){
            const x = lerp(left,right,outputs.length == 1 ? 0.5: i/(outputs.length-1));
            ctx.beginPath();
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.fillStyle = "white";
            ctx.fill();
            
        }

        for(let i = 0;i < inputs.length;i++){
            for(let j = 0; j < outputs.length;j++){
                ctx.beginPath();
                ctx.moveTo(Visualizer.#getNodeX(inputs,i,left,right),bottom);
                ctx.lineTo(Visualizer.#getNodeX(outputs,j,left,right),top);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "orange";
                ctx.stroke();
            }
        }
    }

    static #getNodeX(nodes,index,left,right){
        return lerp(left,right,nodes.length == 1? 0.5:index/(nodes.length-1));
    }
}