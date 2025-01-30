export const getAllEvents = () => {
    return fetch("http://localhost:8088/events?_expand=user&_expand=ageRange&_expand=danceType&_expand=state&_embed=attendance").then((res)=>res.json())
}

export const getEventById = (eventId) => {
    return fetch(`http://localhost:8088/events?id=${eventId}&_expand=user&_expand=age&_expand=danceType&_expand=sate&_embed=attendance`).then((res)=>res.json())
}

export const createNewEvent =(newEventObj)=>{
    return fetch("http://localhost:8088/events",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(newEventObj)
    })
}

export const deleteEvent = (eventId)=>{
  
    return fetch(`http://localhost:8088/events/${eventId}`, {
        method: "DELETE",})
  } 

  export const editEvent=(event)=>{
    return fetch (`http://localhost:8088/events/${event.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event)  

    }
    )
  }
