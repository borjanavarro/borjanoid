export function updateObjectIfNeeded(obj1, obj2) {
    const outputObject = {};
    Object.keys(obj1)
    .forEach(obj => outputObject[obj] = (obj2.hasOwnProperty(obj) ? obj2[obj] : obj1[obj]));
    return outputObject;
 }