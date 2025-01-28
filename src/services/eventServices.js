export const getAllEvents = () => {
    return fetch("http://localhost:8088/events?_expand=user&_expand=ageRange&_expand=danceType&_embed=attendance").then((res)=>res.json())
}

export const getEventById = (eventId) => {
    return fetch(`http://localhost:8088/events?id=${eventId}&_expand=user&_expand=age&_expand=danceType&_embed=attendance`).then((res)=>res.json())
}