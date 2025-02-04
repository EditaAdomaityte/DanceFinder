export const getAllDances = () => {
  return fetch("http://localhost:8088/danceTypes").then((res) => res.json());
};
export const getDancesById = (danceId) => {
  return fetch(`http://localhost:8088/danceTypes?id=${danceId}`).then((res) =>
    res.json()
  );
};

export const createDanceInEvent = async (array) => {
  for (const dance of array) {
    const newDanceEntry = {
      danceTypeId: dance.danceTypeId,
      eventId: dance.eventId,
    };
    await fetch(`http://localhost:8088/danceTypeInEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDanceEntry),
    });
  }
};

export const getDancesByEventId=(eventId)=>{
    return fetch (`http://localhost:8088/danceTypeInEvent?eventId=${eventId}&_expand=danceType`).then((res) =>
        res.json()
      );
}

export const deleteDanceInEventsByEventId = async(eventId)=>{
  
   const response=await fetch(`http://localhost:8088/danceTypeInEvent?eventId=${eventId}`)
   const dancesInEventArray= await response.json()//result is array that has objects with eventId
   
   for (const dance of dancesInEventArray){//deleting every object in the array
    await fetch (`http://localhost:8088/danceTypeInEvent/${dance.id}`,{
        method: "DELETE"})}
   
  } 

