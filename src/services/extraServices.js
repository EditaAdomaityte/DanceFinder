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

export const getCoordinates = async (address, city, state) => {
  
  const fullAddress = `${address}, ${city}, ${state}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`// Using OpenStreetMap's Nominatim API (free to use)
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates');
  }
  
  const data = await response.json();
  
  if (data.length === 0) {
    throw new Error('Address not found');
  }
  
  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon)
  };
};
