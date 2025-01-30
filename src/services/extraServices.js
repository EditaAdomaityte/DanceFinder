export const getAllAges = () => {
    return fetch("http://localhost:8088/ages").then((res)=>res.json())
}

export const getAllStates = () => {
    return fetch("http://localhost:8088/states").then((res)=>res.json())
}

export const addAttendance = (attendance)=>{

return fetch("http://localhost:8088/attendance",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(attendance)
    })
}

export const deleteAttendance = (eventId, currentsutomerId)=>{
  
    return fetch(`http://localhost:8088/attendance?eventId=${eventId}&&_userId=`, {
        method: "DELETE",})
  } 