
import "./Events.css";

import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { getAllEvents } from '../../services/eventServices';
import { useNavigate } from "react-router-dom";

export const EventMap = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filterType, setFilterType] = useState('all');  // Add this

    const navigate=useNavigate()

    useEffect(() => {
        getAllEvents().then((array) => {
            setEvents(array)
        })
    }, [])

    // container style
    const containerStyle = {
        width: '100%',
        height: '800px'  // height
    };

    return (
        <div className="map-container" style={{ width: '100%', height: '500px' }}>
            <LoadScript googleMapsApiKey="AIzaSyDonHnNDAcDpmFCYwUsLiDWluSPlAcd2p0">
                <GoogleMap
                    center={{ lat: 40.7128, lng: -74.0060 }}
                    zoom={5}
                    mapContainerStyle={containerStyle}
                >
                    {events
                        .map(event => {
                            // Make sure your event has latitude and longitude data
                            const position = {
                                lat: parseFloat(event.latitude), // Adjust these field names
                                lng: parseFloat(event.longitude) // based on your data structure
                            };
                            
                            return (
                                <div key={event.id}>
                                <Marker
                                    position={position}
                                    onClick={() => setSelectedEvent(event)}
                                />
                                
                                {selectedEvent && selectedEvent.id === event.id && (
                                    <InfoWindow
                                        position={position}
                                        onCloseClick={() => setSelectedEvent(null)}
                                    >
                                        <div >
                                            <h3 >{event.title}</h3>
                                            <p>{event.date}</p>
                                            <p>{event.time}</p>
                                            <p>{event.city},{event.state.state_name}</p>
                                            <p>${event.price}</p>
                                            <div>
                                                <button 
                                                    className="btn"
                                                    onClick={() => {
                                                        navigate(`/events/${event.id}`);
                                                      }}
                                                >
                                                    More info
                                                </button>
                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </div>
                            );
                        })}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}