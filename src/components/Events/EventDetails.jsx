import { useEffect, useState } from "react";
import "./Events.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../services/eventServices";

export const EventDetails = ({ currentUser }) => {
  const [event, setEvent] = useState({});

  const { eventId } = useParams();
  const navigate = useNavigate();
  console.log(eventId);

  useEffect(() => {
    getEventById(eventId).then((data) => {
      const eventObj = data[0];
      console.log(data);
      setEvent(eventObj);
    });
  }, [eventId]);

  return (
    <section className="event">
       <header className="event-header">{event.title}</header>
            <div>
                <span className="event-info">Organizer:</span>
                <Link to={`/profile/${event.userId}`}>{event.user?.name}</Link>
            </div>
            <div>
                <span className="event-info">Venue:</span>
                {event?.venue}
            </div>
            <div>
                <span className="event-info">Address:</span>
                {event.address}, {event.city}, {event.state}
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
                <span className="event-info"># of people attending:</span>
                {event.attendance?.length}
            </div>
            <div>
                <span className="event-info">Type of Dance:</span>
                <Link to={`/dances/${event.danceType?.id}`}>{event.danceType?.type}</Link>
            </div>
            <div>
                <span className="event-info">Description:</span>
                {event.description}
            </div> 
    </section>
  );
};
