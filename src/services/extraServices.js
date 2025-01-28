export const getAllAges = () => {
    return fetch("http://localhost:8088/ages").then((res)=>res.json())
}

export const getAllStates = () => {
    return fetch("http://localhost:8088/states").then((res)=>res.json())
}