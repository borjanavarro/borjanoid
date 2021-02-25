export function updateObjectIfNeeded(obj1, obj2) {
    const outputObject = {};
    Object.keys(obj1)
    .forEach(obj => outputObject[obj] = (obj2.hasOwnProperty(obj) ? obj2[obj] : obj1[obj]));
    
    return outputObject;
 }

 export function generateRandomVector() {
    const MAXIMUM_VALUE = 10;
    const MINIMUM_VALUE = 3;
    const top = Math.random() * ( MAXIMUM_VALUE - MINIMUM_VALUE ) + MINIMUM_VALUE;
    const left = MAXIMUM_VALUE + 5 - top;
    const MOD = Math.sqrt(Math.pow(top, 2) + Math.pow(left, 2));

    return {top: -top/ MOD, left: left / MOD}
}
