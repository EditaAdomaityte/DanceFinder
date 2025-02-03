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
