import { useEffect, useState } from "react";
import "./Forms.css";
import {
  createDanceInEvent,
  deleteDanceInEventsByEventId,
  getAllDances,
  getDancesByEventId,
} from "../../services/danceServices";
import { getAllAges, getAllStates, getCoordinates } from "../../services/extraServices";
import { editEvent, getEventById } from "../../services/eventServices";
import { useNavigate, useParams } from "react-router-dom";

export const EditEventForm = ({ currentUser }) => {
  const [thisEvent, setEvent] = useState({});
  const [allDanceTypes, setAllDanceTypes] = useState([]);
  const [allAges, setAllAges] = useState([]);
  const [states, setAllStates] = useState([]);
  const [currentDances, setCurrentDances] = useState([]);
  const [dancesChanged, setDancesChanged] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [isAddressChanged, setIsAddressChanged] = useState(false);

  const { eventid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEventById(eventid).then((data) => {
      const eventObj = data[0];
      setEvent(eventObj);
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
    getDancesByEventId(eventid).then((array) => setCurrentDances(array));
  }, [eventid]);



  const handleDanceChange = (event) => {
    setDancesChanged(true);

    const targetDanceId = Number(event.target.id);
    const isDanceAlreadySelected = currentDances.some(
      (currentDance) => currentDance.danceTypeId === targetDanceId
    );

    if (isDanceAlreadySelected) {
      // Remove the dance if it's already selected
      setCurrentDances((prevDances) =>
        prevDances.filter((dance) => dance.danceTypeId !== targetDanceId)
      );
    } else {
      // Add the dance if it's not already selected
      const newDance = {
        eventId: parseInt(eventid),
        danceTypeId: targetDanceId,
      };

      setCurrentDances((prevDances) => [...prevDances, newDance]);
    }
  };

  const handleAddressChange = (field, value) => {
    setIsAddressChanged(true);
    setAddressError("");
    const copy = { ...thisEvent };
    copy[field] = value;
    setEvent(copy);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setAddressError("")

    try {
      let coordinates = {
        latitude: thisEvent.latitude,
        longitude: thisEvent.longitude
      };
       // Only get new coordinates if address-related fields have changed
       if (isAddressChanged) {
        const stateName = states.find(s => s.id === parseInt(thisEvent.stateId))?.state_name;
        coordinates = await getCoordinates(thisEvent.address, thisEvent.city, stateName);
      }

    const editedEvent = {
      id: thisEvent.id,
      title: thisEvent.title,
      venue: thisEvent.venue,
      venueLink: thisEvent.venueLink,
      address: thisEvent.address,
      city: thisEvent.city,
      stateId: parseInt(thisEvent.stateId),
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
      date: thisEvent.date,
      userId: currentUser.id,
      price: parseInt(thisEvent.price),
      ageId: parseInt(thisEvent.ageId),
      description: thisEvent.description
    };

    
      // Update the event first
      await editEvent(editedEvent);

      // Then delete existing dances associated with the event
      await deleteDanceInEventsByEventId(eventid);

      // Finally, create the new dances in the event
      await createDanceInEvent(currentDances);

      // Navigate to the event details page after successful save
      navigate(`/events/${eventid}`);
    } catch (error) {
      console.error("Error saving the event: ", error);
      // Show an error message to the user, or handle it appropriately
      if (error.message.includes('coordinates')) {
        setAddressError("Failed to get coordinates for the address. Please check the address and try again.");
      } else {
        setAddressError("There was an issue saving your event. Please try again later.");
      }
    }
  };

  return (
    <form className="form-group">
      <h2>Edi Event</h2>
      <fieldset>
          <label>
            Title:
            <input
              className="form-control"
              type="text"
              value={thisEvent.title ? thisEvent.title : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.title = event.target.value;
                setEvent(copy);
              }}
            />
          </label>

      </fieldset>{" "}
      <fieldset>
          <label>
            Venue:
            <input
              className="form-control"
              type="text"
              value={thisEvent.venue ? thisEvent.venue : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.venue = event.target.value;
                setEvent(copy);
              }}
            />
          </label>
      </fieldset>{" "}
      <fieldset>
          <label>
            Venue link:
            <input
              className="form-control"
              type="text"
              value={thisEvent.venueLink ? thisEvent.venueLink : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.venueLink = event.target.value;
                setEvent(copy);
              }}
            />
          </label>
      </fieldset>
      <fieldset>
          <label>
            Address:
            <input
              className="form-control"
              type="text"
              value={thisEvent.address ? thisEvent.address : ""}
              onChange={(event) => handleAddressChange('address', event.target.value)}
            />
          </label>
      </fieldset>
      <fieldset>
          <label>
            City:
            <input
              className="form-control"
              type="text"
              value={thisEvent.city ? thisEvent.city : ""}
              onChange={(event) =>  handleAddressChange('city', event.target.value)}
            />
          </label>
      </fieldset>
      <fieldset>
          <label>
            State:
            <select
              value={thisEvent.stateId}
              name="stateId"
              onChange={(event) => handleAddressChange('stateId', event.target.value)}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </label>
      </fieldset>
      {addressError && <div className="error-message">{addressError}</div>}
      <fieldset>
          <label>
            Date:
            <input
              className="form-control"
              type="text"
              value={thisEvent.date ? thisEvent.date : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.date = event.target.value;
                setEvent(copy);
              }}
            />
          </label>
      </fieldset>
      <fieldset>
          <label>
            Price:
            <input
              className="form-control"
              type="text"
              value={thisEvent.price ? thisEvent.price : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.price = event.target.value;
                setEvent(copy);
              }}
            />
          </label>
      </fieldset>
      <fieldset>
          <label>
            Age Group:
            <select
              value={thisEvent.ageId}
              name="ageId"
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy[event.target.name] = event.target.value;
                setEvent(copy);
              }}
            >
              <option value="Select Age">Select Age</option>
              {allAges.map((age) => (
                <option key={age.id} value={age.id}>
                  {age.name}
                </option>
              ))}
            </select>
          </label>
      
      </fieldset>
      <fieldset>
          <label>
            Description:
            <input
              className="form-control"
              type="text"
              value={thisEvent.description ? thisEvent.description : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.description = event.target.value;
                setEvent(copy);
              }}
            />
          </label>
      </fieldset>
      <fieldset>
          <label>Types of Dances:
          {allDanceTypes.map((dance) => {
            return (
              <div key={dance.id}>
                <input
                  type="checkbox"
                  id={dance.id}
                  checked={currentDances.some(
                    (currentDance) => currentDance.danceTypeId === dance.id
                  )}
                  onChange={handleDanceChange}
                />
                {dance.type}
              </div>
            );
          })}</label>
      </fieldset>
      <fieldset>
          <button className="form-btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        
      </fieldset>
    </form>
  );
};
