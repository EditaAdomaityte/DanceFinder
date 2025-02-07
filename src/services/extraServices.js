export const getAllAges = () => {
  return fetch("http://localhost:8088/ages").then((res) => res.json());
};

export const getAllStates = () => {
  return fetch("http://localhost:8088/states").then((res) => res.json());
};

export const addAttendance = (attendance) => {
  return fetch("http://localhost:8088/attendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attendance),
  }).then((res) => res.json());
};


export const deleteAttendance = (attendingId)=>{
  
    return fetch(`http://localhost:8088/attendance/${attendingId}`, {
        method: "DELETE",})
  } 

export const getAttendanceByUserId=(userId)=>{
    return fetch(`http://localhost:8088/attendance?userId=${userId}`).then((res) => res.json());
}

