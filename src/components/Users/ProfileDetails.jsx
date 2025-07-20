import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/userService";

export const ProfileDetails = ({ currentUser }) => {
  const [user, setUser] = useState({});

  const { userId } = useParams();
  const navigate = useNavigate();
 
  useEffect(() => {
    getUserById(userId).then((data) => {
      const userObj = data[0];
      setUser(userObj);
    });
  }, [userId]);

  return (
    <section className="section">
      <div className="box">
        <h2 className="title is-4">{user.name}</h2>
  
        <div className="mb-2">
          <span className="has-text-weight-semibold">City:</span> {user.city}
        </div>
  
        <div className="mb-2">
          <span className="has-text-weight-semibold">State:</span> {user.state?.state_name}
        </div>
  
        <div className="mb-2">
          <span className="has-text-weight-semibold">Email:</span> {user.email}
        </div>
  
        <div className="mb-4">
          <span className="has-text-weight-semibold"># of Events:</span> {user.events?.length}
        </div>
  
        {user.id === currentUser.id && (
          <div>
            <button
              className="button is-info is-small"
              onClick={() => navigate(`/profile/${user.id}/edit`)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </section>
  );
  
};
