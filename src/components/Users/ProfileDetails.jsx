import { useEffect, useState } from "react"
import "./Users.css"
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/userService";

export const ProfileDetails=({currentUser})=>{
    const [user, setUser]=useState({})

    const { userId } = useParams();
    const navigate = useNavigate();
    console.log(userId);

    useEffect(() => {
        getUserById(userId).then((data) => {
          const userObj = data[0];
          console.log(data);
          setUser(userObj);
        });
      }, [userId]);


    return( <section className="user">
    <header className="user-header">{user.name}</header>
         <div>
             <span className="user-info">City:</span>
              {user.city} 
         </div>
         <div>
             <span className="user-info">State:</span>
             {user.state?.state_name}
         </div>
         <div>
             <span className="user-info">Email:</span>
             {user.email}
         </div>
         <div>
             <span className="user-info"># of Events:</span>
             {user.events?.length}
         </div> 
         <div className="btn-container">
                {user.id===currentUser.id &&(
                    <button className="btn btn-edit" onClick={()=>{navigate(`/profile/${user.id}/edit`)}}>Edit</button>
                )}
                
            </div>
 </section>
);
};
