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

  useEffect(() => {
    getAllEvents().then((eventArray) => {
      setAllEvents(eventArray);
    });
    getAttendanceByUserId(currentUser?.id).then((attendanceArray) => {
      setUserAttendance(attendanceArray);
    });
  }, [currentUser]);
  

  useEffect(() => {
    const filteredEvents = allEvents.filter(
      (event) => event.user?.id === parseInt(currentUser?.id)
    );
    setMyEvents(filteredEvents);
  }, [allEvents]);

  const navigate = useNavigate();

  useEffect(() => {
    const userEvents = userAttendance.map((attendanceRec) => {
      return allEvents.find((event) => event.id === attendanceRec.eventId);
    });
    setEventsAttending(userEvents);
  }, [userAttendance]);

  return (
    <>
      <div className="events">
        <h2>My Events</h2>
        {currentUser.isOrganizer === true && (
          <div>
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  navigate(`/newevent`);
                }}
              >
                Create New Event
              </button>
            </div>
            <div>
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
        )}
        {currentUser.isOrganizer === false && (
          <div>
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
