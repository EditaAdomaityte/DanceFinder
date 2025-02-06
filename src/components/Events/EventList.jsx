import { useEffect, useState } from "react";
import "./Events.css";
import { getAllEvents } from "../../services/eventServices";
import { Event } from "./Event";
import { EventFilterBar } from "./EventFilterBar";
import { getAllDances, getDancesInEvent } from "../../services/danceServices";
import { getAllAges, getAllStates } from "../../services/extraServices";

export const EventList = ({ currentUser }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [selectedState, setSelectedState] = useState("Select State");
  const [allDanceTypes, setAllDanceTypes] = useState([]);
  const [selectedDanceType, setSelectedDanceType] = useState("Select Dance");
  const [allAges, setAllAges] = useState([]);
  const [selectedAge, setSelectedAge] = useState("Select Age Group");
  const [allDancesInEvent,setAllDancesInEvent]=useState([])

  useEffect(() => {
    getAllEvents().then((eventArray) => {
      setAllEvents(eventArray);
    });
    getAllDances().then((danceArray) => {
      setAllDanceTypes(danceArray);
    });
    getAllAges().then((ageArray) => {
      setAllAges(ageArray);
    });
    getAllStates().then((stateArray) => {
      setAllStates(stateArray);
    });
    getDancesInEvent().then((array)=>{
        setAllDancesInEvent(array)
    })
  }, []);


  useEffect(() => {
    let filtered = allEvents;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedState !== "Select State") {
      filtered = filtered.filter((event) => {
        const state = allStates.find((s) => s.id === event.stateId);
        return state.state_name === selectedState;
      });
    }
    if (selectedAge !== "Select Age Group") {
      filtered = filtered.filter((event) => {
        const thisAge = allAges.find((a) => a.id === event.ageId);
        return thisAge.name === selectedAge;
      });
    }
    if (selectedDanceType !== "Select Dance") {
        filtered = filtered.filter((event) => {
          // Check if any of the danceTypeInEvent entries for this event match the selected dance type
         const foundDances= allDancesInEvent.filter(
            (danceInEvent) =>danceInEvent.danceTypeId === parseInt(selectedDanceType)
          );
          // Check if any of the found dances have the same eventId as the current event
          return foundDances.find((danceInEvent)=>danceInEvent.eventId===event.id)
        });}
    
    setFilteredEvents(filtered);
  }, [
    searchTerm,
    allEvents,
    selectedAge,
    allAges,
    selectedDanceType,
    allDanceTypes,
    selectedState,
    allStates,
    allDancesInEvent
  ]);

  return (
    <>
      <div className="dance">
        <h2>All Events</h2>
        <EventFilterBar
          setSearchTerm={setSearchTerm}
          allDanceTypes={allDanceTypes}
          allAges={allAges}
          allStates={allStates}
          selectedAge={selectedAge}
          selectedDanceType={selectedDanceType}
          selectedState={selectedState}
          setSelectedAge={setSelectedAge}
          setSelectedState={setSelectedState}
          setSelectedDanceType={setSelectedDanceType}
        />
        <div className="event-list">
          {filteredEvents.map((event) => {
            return (
            
              <Event  key={event.id} event={event} currentUser={currentUser} />
            
            );
          })}
        </div>
      </div>
    </>
  );
};
