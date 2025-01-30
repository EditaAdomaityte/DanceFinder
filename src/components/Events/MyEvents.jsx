import { useEffect, useState } from "react"
import "./Events.css"
import { getAllEvents } from "../../services/eventServices"
import { Link, useNavigate } from "react-router-dom"
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

    const navigate=useNavigate()

    return(
        <>
        <div className="events">
            <h2>My Events</h2>
            <div>
                <button className="btn btn-secondary" onClick={()=>{navigate(`/newevent`)}}>Create New Event</button>
            </div>
            <div>
                {myEvents.map((event)=>{
                    return(
                            <Event key={event.id} event={event} currentUser={currentUser}/>
                        )
                })}
            </div>
            
        </div>
        </>
    )
}