import { useEffect, useState } from "react";
import "./Forms.css";
import { getAllDances } from "../../services/danceServices";
import { getAllAges, getAllStates } from "../../services/extraServices";
import { editEvent, getEventById } from "../../services/eventServices";
import { useNavigate, useParams } from "react-router-dom";

export const EditEventForm = ({ currentUser }) => {
  const [thisEvent, setEvent] = useState({});
  const [allDanceTypes, setAllDanceTypes] = useState([]);
  const [allAges, setAllAges] = useState([]);
  const [states, setAllStates] = useState([]);

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
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const editedEvent = {
      id: thisEvent.id,
      title: thisEvent.title,
      venue: thisEvent.venue,
      venueLink: thisEvent.venueLink,
      address: thisEvent.address,
      city: thisEvent.city,
      stateId: parseInt(thisEvent.stateId),
      date: thisEvent.date,
      userId: currentUser.id,
      price: parseInt(thisEvent.price),
      ageId: parseInt(thisEvent.ageId),
      description: thisEvent.description,
      danceTypeId: parseInt(thisEvent.danceTypeId),
    };

    editEvent(editedEvent).then(() => {
      navigate(`/events/${eventid}`);
    });
  };

  return (
    <form className="form-group">
      <h2>Edi Event</h2>
      <fieldset>
        <div className="form-group">
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
        </div>
      </fieldset>{" "}
      <fieldset>
        <div className="form-group">
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
        </div>
      </fieldset>{" "}
      <fieldset>
        <div className="form-group">
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
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Address:
            <input
              className="form-control"
              type="text"
              value={thisEvent.address ? thisEvent.address : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.address = event.target.value;
                setEvent(copy);
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
              value={thisEvent.city ? thisEvent.city : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.city = event.target.value;
                setEvent(copy);
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
              value={thisEvent.stateId}
              name="stateId"
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy[event.target.name] = event.target.value;
                setEvent(copy);
              }}
            >
              <option value="">Select State</option>
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
              value={thisEvent.date ? thisEvent.date : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.date = event.target.value;
                setEvent(copy);
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
              value={thisEvent.price ? thisEvent.price : ""}
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy.price = event.target.value;
                setEvent(copy);
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
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
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
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Dance Type:
            <select
              value={thisEvent.danceTypeId}
              name="danceTypeId"
              onChange={(event) => {
                const copy = { ...thisEvent };
                copy[event.target.name] = event.target.value;
                setEvent(copy);
              }}
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
          <button className="form-btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </fieldset>
    </form>
  );
};
