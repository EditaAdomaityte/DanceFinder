import { useEffect, useState } from "react";
import "./Users.css";
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
    <section className="user">
      <h2>{user.name}</h2>
      <div className="user-info2">
        <span className="user-info1">City:</span>
        {user.city}
      </div>
      <div className="user-info2">
        <span className="user-info1">State:</span>
        {user.state?.state_name}
      </div>
      <div className="user-info2">
        <span className="user-info1">Email:</span>
        {user.email}
      </div>
      <div className="user-info2">
        <span className="user-info1"># of Events:</span>
        {user.events?.length}
      </div>
      <div>
        {user.id === currentUser.id && (
          <button
            className="btn btn-edit"
            onClick={() => {
              navigate(`/profile/${user.id}/edit`);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </section>
  );
};
