export const getAllEvents = () => {
  return fetch(
    "http://localhost:8088/events?_expand=user&_expand=ageRange&_expand=state&_embed=attendance"
  ).then((res) => res.json());
};

export const getEventById = (eventid) => {
  return fetch(
    `http://localhost:8088/events?id=${eventid}&_expand=user&_expand=age&_expand=state&_embed=attendance`
  ).then((res) => res.json());
};

export const createNewEvent = (newEventObj) => {
  return fetch("http://localhost:8088/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEventObj),
  }).then((res) => res.json());
};

export const deleteEvent = (eventid) => {
  return fetch(`http://localhost:8088/events/${eventIid}`, {
    method: "DELETE",
  });
};

export const editEvent = (event) => {
  return fetch(`http://localhost:8088/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
};
