import "./Users.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrganizers } from "../../services/userService";

export const OrganizerList = () => {
  const [allOrganizers, setAllOrganizers] = useState([]);

  useEffect(() => {
    getAllOrganizers().then((organizerArray) => {
      setAllOrganizers(organizerArray);
    });
  }, []);

  return (
    <>
      <div className="user">
        <h2>All Organizers</h2>
        <div>
          {allOrganizers.map((organizer) => {
            return (
              <div key={organizer.id} className="user">
                <div className="header">
                  <Link to={`/profile/${organizer.id}`}>
                    <h3>{organizer.name}</h3>
                  </Link>
                </div>
                <div>
                  <div className="user-info">Cyty: {organizer.city}</div>
                  <div className="user-info">
                    State: {organizer.state?.state_name}
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
