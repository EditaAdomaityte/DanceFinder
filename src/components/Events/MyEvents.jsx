import { useEffect, useState } from "react";
import "./Events.css";
import { getAllEvents } from "../../services/eventServices";
import { Link, useNavigate } from "react-router-dom";
import { Event } from "./Event";
import { getAttendanceByUserId } from "../../services/extraServices";
import { AttendingEvent } from "./AteendingEvent";

export const MyEvents = ({ currentUser }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [userAttendance, setUserAttendance] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    Promise.all([
      getAllEvents(),
      getAttendanceByUserId(currentUser?.id)
    ])
    .then(([eventArray, attendanceArray]) => {
      setAllEvents(eventArray);
      setUserAttendance(attendanceArray);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    });
  }, [currentUser]);
  

  useEffect(() => {
    const filteredEvents = allEvents.filter(
      (event) => event.user?.id === parseInt(currentUser?.id)
    );
    setMyEvents(filteredEvents);
  }, [allEvents,currentUser]);

  const navigate = useNavigate();

  useEffect(() => {
    const userEvents = userAttendance.map((attendanceRec) => {
      return allEvents.find((event) => event.id === attendanceRec.eventId);
    });
    setEventsAttending(userEvents);
  }, [userAttendance, allEvents]);

  if (isLoading) {
    return <div>Loading events...</div>;
  }


  return (
    <>
      <div className="posts">
        {currentUser.isOrganizer === true && (
          <div className="events">
            <h2>My Events</h2>
            <div>
             <div className="btn-container"> <button
                className="btn btn-edit"
                onClick={() => {
                  navigate(`/newevent`);
                }}
              >
                Create New Event
              </button>
            </div>
            <div className="event-list">
              {myEvents.map((event) => {
                return (
                  <Event
                    key={event.id}
                    event={event}
                    currentUser={currentUser}
                  />
                );
              })}
            </div>
           </div>
          </div>
        )}
        {currentUser.isOrganizer === false && (
          <div className="events">
             <h2>My Events</h2>
            {eventsAttending.map((event) => {
              return (
                <AttendingEvent key={event.id} event={event} currentUser={currentUser} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
