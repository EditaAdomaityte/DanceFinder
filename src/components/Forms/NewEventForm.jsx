import { useNavigate } from "react-router-dom";
import "./Forms.css";
import { useEffect, useState } from "react";
import { createDanceInEvent, getAllDances } from "../../services/danceServices";
import { getAllAges, getAllStates } from "../../services/extraServices";
import { createNewEvent } from "../../services/eventServices";

export const NewEventForm = ({ currentUser }) => {
  const navigate = useNavigate();

  const [allDanceTypes, setAllDanceTypes] = useState([]);
  const [selectedDanceType, setSelectedDanceType] = useState(0);
  const [allAges, setAllAges] = useState([]);
  const [selectedAge, setSelectedAge] = useState(0);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [states, setAllStates] = useState([]);
  const [selectedState, setSelectedState] = useState(0);
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedDances, setSelectedDances] = useState([]);

  useEffect(() => {
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

  const handleDanceChange = (event) => {
    const foundDance = selectedDances.find((selectedDance) => {
      return selectedDance.id === Number(event.target.id);
    });
    if (foundDance) {
      console.log(foundDance);
      const newCurrentDance = selectedDances.filter((selectedDance) => {
        return selectedDance.id !== foundDance.id;
      });
      setSelectedDances(newCurrentDance);
    } else {
      const newDance = {
        danceTypeId: Number(event.target.id),
      };
      const addedDances = [...selectedDances, newDance];
      setSelectedDances(addedDances);
      console.log(addedDances)
    }
  };
  const handleSaveEvent = async (event) => {
    event.preventDefault();

    const createdEvent = {
      title: title,
      venue: venue,
      venueLink: link,
      address: address,
      city: city,
      stateId: parseInt(selectedState),
      date: date,
      userId: currentUser.id,
      price: parseInt(price),
      ageId: parseInt(selectedAge),
      description: description,
      danceTypeId: parseInt(selectedDanceType),
    };
    const NewEvent = await createNewEvent(createdEvent);
    console.log (NewEvent)

    if(selectedDances&&selectedDances.length>0){
        const dancesInEventArray=selectedDances.map((dance)=>({
            eventId:NewEvent.id,
            danceTypeId:dance.danceTypeId
        }))
        await createDanceInEvent(dancesInEventArray)
    }
    navigate(`/events/myevents`)
  };

  return (
    <form className="form-group">
      <h2>New Event</h2>
      <fieldset>
        <div className="form-group">
          <label>
            Title:
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                const newTitle = event.target.value;
                setTitle(newTitle);
              }}
            />
          </label>
        </div>
      </fieldset>{" "}
      <fieldset>
        <div className="form-group">
          <label>
            Venue:
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                const newVenue = event.target.value;
                setVenue(newVenue);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Venue link:
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                const newLink = event.target.value;
                setLink(newLink);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Address:
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                const newAddress = event.target.value;
                setAddress(newAddress);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            City:
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                const newCity = event.target.value;
                setCity(newCity);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            State:
            <select
              value={selectedState}
              onChange={(event) => setSelectedState(event.target.value)}
            >
              <option value="Select a State">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Date:
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                const newDate = event.target.value;
                setDate(newDate);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Price:
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                const newPrice = event.target.value;
                setPrice(newPrice);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Age Group:
            <select
              value={selectedAge}
              onChange={(event) => setSelectedAge(event.target.value)}
            >
              <option value="Select Age">Select Age</option>
              {allAges.map((age) => (
                <option key={age.id} value={age.id}>
                  {age.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Description:
            <input
              className="form-control"
              type="text"
              onChange={(event) => {
                const newDescription = event.target.value;
                setDescription(newDescription);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Dance Type:
            <select
              value={selectedDanceType}
              onChange={(event) => setSelectedDanceType(event.target.value)}
            >
              <option value="Select a Dance Type">Select Dance Type</option>
              {allDanceTypes.map((dance) => (
                <option key={dance.id} value={dance.id}>
                  {dance.type}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Dance Types:</label>
          {allDanceTypes.map((dance) => {
            return (
              <div key={dance.id}>
                <input
                  type="checkbox"
                  id={dance.id}
                  onChange={handleDanceChange}
                />
                {dance.type}
              </div>
            );
          })}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button type="button" className="form-btn btn-primary" onClick={handleSaveEvent}>
            Save Event
          </button>
        </div>
      </fieldset>
    </form>
  );
};
