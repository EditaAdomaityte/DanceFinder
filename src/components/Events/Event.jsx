import { Link, useNavigate } from "react-router-dom"
import "./Events.css"

export const Event=({event,currentUser})=>{
    const navigate=useNavigate()

    return(
        <div className="event">
            <Link to ={`/events/${event.id}`} key={event.id}>
            <div className="header">
                <h3>{event.title}</h3>
            </div>
            <div>
                <div className="event-info">
                    Event Date {event.date}
                </div>
                <div className="event-info">
                    Location: {event.city}, {event.state?.state_name}
                </div>
                <div className="event-info">
                   # of people attending : {event.attendance.length}
                </div>
            </div> </Link>
            <div className="btn-container">
                {event.user?.id===currentUser.id &&(
                    <button className="btn btn-edit" onClick={()=>{navigate(`/events/${event.id}/edit`)}}>Edit</button>
                )}
                
            </div>
        </div>
    )
}