
function lerp(A,B,t){
    return A + (B-A)*t;//t = 0 return  A , t=1 return B
}

function getIntersection(A,B,C,D){//20:24
//To know if the line from point A to point B intersect with the line from point C to D.
    const tTop = (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
}