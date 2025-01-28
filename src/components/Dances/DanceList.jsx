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
  console.log(allDances)

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
                <div>
                  
                  <div className="dance-info">
                   Origin: {dance.origin}
                  </div>
                  <div className="dance-info">
                   Description: {dance.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};