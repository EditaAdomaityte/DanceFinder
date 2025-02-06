import "./Dances.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllDances } from "../../services/danceServices";
import { DanceDetails } from "./DanceDetails";


export const DanceList = () => {
  const [allDances, setAllDances] = useState([]);

  useEffect(() => {
    getAllDances().then((danceArray) => {
      setAllDances(danceArray);
    });
  }, []);


  return (
    <>
      <div className="dance">
        <h2>Types of Dances</h2>
        <div>
          {allDances.map((dance) => {
            return (
              <div key={dance.id} className="dance">
                <div className="header">
                  <Link to={`/dances/${dance.id}`}><h3>{dance.type}</h3>
                    </Link>
                </div>
                <article>
                  
                  <div>
                  <span className="dance-info"> Origin: </span>{dance.origin}
                  </div>
                  <div>
                  <span className="dance-info"> Description: </span>{dance.short}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};