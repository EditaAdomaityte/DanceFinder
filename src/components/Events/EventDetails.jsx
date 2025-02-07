import { useEffect, useState } from "react";
import "./Event.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteEvent, getEventById } from "../../services/eventServices";
import { addAttendance, deleteAttendance } from "../../services/extraServices";
import { getDancesByEventId } from "../../services/danceServices";

export const EventDetails = ({ currentUser }) => {
  const [event, setEvent] = useState({});
  const [isAttending, setIsAttending] = useState(false);
  const [dances, setDances] = useState([]);

  const { eventid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEventById(eventid).then((data) => {
      const eventObj = data[0];
      setEvent(eventObj);

      // Check if the current user is attending this event
      const attending = eventObj.attendance?.find(
        (attendance) => attendance.userId === currentUser.id
      );
      setIsAttending(attending);
      getDancesByEventId(eventid).then((array) => {
        setDances(array);
      });
    });
  }, [eventid, currentUser.id]);

  const handleDelete = (event) => {
    deleteEvent(eventid).then(() => {
      navigate("/events/myevents");
    });
  };
  const handleIAmIn = async(event) => {
    event.preventDefault();
    const createdAttendance = {
      userId: currentUser.id,
      eventId: parseInt(eventid),
    };

    try{
        await addAttendance(createdAttendance);
      
        await setIsAttending(true);
      
        navigate("/events/myevents");
      }catch (error) {
        console.error("Error saving the attendance: ", error);
        // Show an error message to the user, or handle it appropriately
        alert("There was an issue saving your attendance. Please try again later.");
      }
    };

  // Remove the attendance record for the user from the event
  const handleIAmOut = (event) => {
    deleteAttendance(isAttending.id)
      .then(() => {
        setIsAttending(false);
      })
      .then(() => {
        navigate("/events/");
      });
  };
  const fullAddress = `${event.venue}+${event.address}+ ${event.city}+ ${event.state?.state_name}`;



  return (
    <section className="event">
      <header className="event-header">{event.title}</header>
      <div>
        <span className="event-info">Organizer:</span>
        <Link to={`/profile/${event.userId}`}>{event.user?.name}</Link>
      </div>
      <div>
        <span className="event-info">Venue:</span>
        <Link to={`${event.venueLink}`}>{event.venue}</Link>
      </div>
      <div>
        <span className="event-info">Address:</span>
        <Link to={`https://www.google.com/maps?q=${fullAddress}`}>
          {" "}
          {event.address}, {event.city}, {event.state?.state_name}
        </Link>
      </div>
      <div>
        <span className="event-info">Price to attend($):</span>
        {event.price}
      </div>
      <div>
        <span className="event-info">Date:</span>
        {event.date}
      </div>
      <div>
        <span className="event-info">Age Range:</span>
        {event.age?.name}
      </div>
      <div>
        <span className="event-info">Venue:</span>
        {event.venue}
      </div>
      <div>
        <span className="event-info">Types of Dances:</span>
        {dances.map((dance, index) => {
          return (
            <ul key={dance.danceType.id}>
             <li> <Link  to={`/dances/${dance.danceType.id}`}>
                {dance.danceType.type}
              </Link></li>
              {index<dance.length-1 &&','}{/* Adds a comma except after the last link */}
            </ul>
          );
        })}
      </div>
      <div>
        <span className="event-info">Description:</span>
        {event.description}
      </div>
      <div>
        <span className="event-info"># of people attending:</span>
        {event.attendance?.length}
      </div>
      <div className="btn-container">
        {event.user?.id === currentUser.id && (
          <button
            className="btn btn-edit"
            onClick={() => {
              navigate(`/events/${event.id}/edit`);
            }}
          >
            Edit
          </button>
        )}
        {event.user?.id === currentUser.id && (
          <button className="btn btn-warning" onClick={handleDelete}>
            Delete
          </button>
        )}
        {currentUser.isOrganizer === false && !isAttending && (
          <button className="btn btn-info" onClick={handleIAmIn}>
            I'm in!
          </button>
        )}
        {currentUser.isOrganizer === false && isAttending && (
          <button className="btn btn-info" onClick={handleIAmOut}>
            I'm out!
          </button>
        )}
      </div>
    </section>
  );
};