export const getAllDances = () => {
    return fetch("http://localhost:8088/danceTypes").then((res)=>res.json())
}
export const getDancesById = (danceId) => {
    return fetch(`http://localhost:8088/danceTypes?id=${danceId}`).then((res)=>res.json())
}