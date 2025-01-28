import "./Events.css"

export const Event=({event})=>{
    return(
        <div className="event">
            <div className="header">
                <h3>{event.title}</h3>
            </div>
            <div>
                <div className="event-info">
                    Event Date {event.date}
                </div>
                <div className="event-info">
                    Location: {event.city}, {event.state}
                </div>
                <div className="event-info">
                   # of people attending : {event.attendance.length}
                </div>
            </div>  
        </div>
    )
}