
import { useEffect, useState } from "react"
import "./Forms.css"
import { useNavigate, useParams } from "react-router-dom";
import { getAllStates } from "../../services/extraServices";
import { editProfile, getUserById } from "../../services/userService";


export const EditProfileForm=({currentUser})=>{
    const [profile,setProfile]=useState({})
    const [states, setAllStates] = useState([]);

    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getAllStates().then((stateArray) => {
              setAllStates(stateArray);
            });
        getUserById(userId).then((data)=>{
            const userObj = data [0];
            setProfile(userObj)
        })
    },[])

    const handleSave=(event)=>{
        event.preventDefault();
        const editedProfile={
            id: currentUser.id,
            name: profile.name,
            city: profile.city,
            stateId: profile.stateId,
            email: profile.email,
            isOrganizer: profile.isOrganizer
        };

        editProfile(editedProfile).then(()=>{
            navigate(`/profile/${userId}`);
        });
    }

    return(
        <form className="form-group">
        <h2>Edit Profile</h2>
        <fieldset>
            <div className="form-group">
                <label>
                    Name:
                    <input 
                        className="form-control"
                        type="text"
                        value={profile.name? profile.name :""}
                        onChange={(event)=>{
                            const copy={...profile};
                            copy.name=event.target.value
                            setProfile(copy)
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
                        value={profile.city? profile.city :""}
                        onChange={(event)=>{
                            const copy={...profile};
                            copy.city=event.target.value
                            setProfile(copy)
                        }}
                    />
                </label>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label>State:
                    <select 
                        value={profile.stateId}
                        name="stateId"
                        onChange={(event)=>{
                            const copy={...profile};
                            copy [event.target.name]=event.target.value
                            setProfile(copy)
                        }}
                    >
                    <option value="">Select State</option>
                    {states.map((state)=>(
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
                    Email:
                    <input 
                        className="form-control"
                        type="text"
                        value={profile.email? profile.email :""}
                        onChange={(event)=>{
                            const copy={...profile};
                            copy.email=event.target.value
                            setProfile(copy)
                        }}
                    />
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
    )
}