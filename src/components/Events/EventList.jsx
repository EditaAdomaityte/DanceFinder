import { useEffect, useState } from "react"
import "./Events.css"
import { getAllEvents } from "../../services/eventServices"
import { Link } from "react-router-dom"
import { Event } from "./Event"

export const EventList=()=>{
    const [allEvents, setAllEvents]=useState([])

    useEffect(()=>{
        getAllEvents().then((eventArray)=>{
            setAllEvents(eventArray)
        })
    },[])

    return(
        <>
        <div className="posts">
            <h2>All Events</h2>
            <div>
                {allEvents.map((event)=>{
                    return(
                        <Link to ={`/events/${event.id}`} key={event.id}>
                            <Event event={event}/>
                        </Link>
                    )
                })}
            </div>
        </div>
        </>
    )
}