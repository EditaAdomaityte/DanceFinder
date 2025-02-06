import "./Dances.css";
import { useEffect, useState } from "react";
import "./Dances.css";
import { useNavigate, useParams } from "react-router-dom";
import { getDancesById } from "../../services/danceServices";

export const DanceDetails = () => {
  const [dance, setDance] = useState({});

  const { danceId } = useParams();


  useEffect(() => {
    getDancesById(danceId).then((data) => {
      const danceObj = data[0];
      setDance(danceObj);
    });
  }, [danceId]);

  return (
    <section className="dance">
      
      <header className="dance-header">{dance.type}</header>
      <div className="dance-info1">
        <ul>
        <li><span className="dance-info" >Origin:</span>
        {dance.origin}</li>
      
        <li><span className="dance-info"  >Description:</span>
        {dance.description}</li></ul>
      </div>
      <div className="picture">
        {dance.picture && (
          <img src={dance.picture} alt={dance.type} className="dance-image" />
        )}
      </div>
    </section>
  );
};
