import { useEffect, useState } from "react";
import "./Events.css";
import { getAllEvents } from "../../services/eventServices";
import { Event } from "./Event";
import { EventFilterBar } from "./EventFilterBar";
import { getAllDances } from "../../services/danceServices";
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
  }, []);

  console.log(allAges);

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
        const dance = allDanceTypes.find((d) => d.id === event.danceTypeId);
        return dance.type === selectedDanceType;
      });
    }
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
  ]);

  return (
    <>
      <div className="posts">
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
        <div>
          {filteredEvents.map((event) => {
            return (
              <Event key={event.id} event={event} currentUser={currentUser} />
            );
          })}
        </div>
      </div>
    </>
  );
};
