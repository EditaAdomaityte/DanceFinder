import { Link, useNavigate } from "react-router-dom"
import "./Events.css"
import { deleteAttendance } from "../../services/extraServices"
import { useEffect, useState } from "react"

export const AttendingEvent=({event,currentUser})=>{
    const navigate=useNavigate()
    const [isAttending, setIsAttending]=useState(false)

    useEffect(() => {
          // Check if the current user is attending this event
          const attending =event.attendance?.find((attendance)=>attendance.userId===currentUser.id)
          setIsAttending(attending)
        
      }, [ currentUser]);

    const handleIAmOut=(event)=>{
        deleteAttendance(isAttending.id).then(()=>{
            navigate("/events")})}

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
            
                    <button className="btn btn-info" onClick={handleIAmOut}>I'm out!</button>
                
                
            </div>
        </div>
    )
}