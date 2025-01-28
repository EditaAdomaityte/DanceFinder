import { useNavigate } from "react-router-dom";
import "./Forms.css";
import { useEffect, useState } from "react";
import { getAllDances } from "../../services/danceServices";
import { getAllAges, getAllStates } from "../../services/extraServices";

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
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

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

  return <>NewEventForm</>;
};
