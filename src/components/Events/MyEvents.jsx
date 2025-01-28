import { useEffect, useState } from "react"
import "./Events.css"
import { getAllEvents } from "../../services/eventServices"
import { Link } from "react-router-dom"
import { Event } from "./Event"


export const MyEvents=({currentUser})=>{
    const [allEvents, setAllEvents]=useState([])
    const [myEvents,setMyEvents]=useState([])

    useEffect(()=>{
        getAllEvents().then((eventArray)=>{
            setAllEvents(eventArray)
        })
    },[])

    useEffect(()=>{
        const filteredEvents=allEvents.filter(event=> event.user?.id === parseInt(currentUser?.id)
        )
        setMyEvents(filteredEvents)
    },[allEvents])
    console.log(myEvents)

    return(
        <>
        <div className="events">
            <h2>My Events</h2>
            <div>
                {myEvents.map((event)=>{
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