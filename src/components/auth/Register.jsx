import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"
import { getAllStates } from "../../services/extraServices"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    stateId: 0,
    city: "",
    isOrganizer: false,

  })
  const [states, setAllStates] = useState([]);


useEffect(() => {
    getAllStates().then((stateArray) => {
      setAllStates(stateArray);
    });
  }, []);

  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "dance_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }

    //covernt to number if it is state select field:
    if(evt.target.id ==="stateId"){
      copy[evt.target.id]=parseInt(evt.target.value)
    }else{
    copy[evt.target.id] = evt.target.value}
    setUser(copy)
  }

  return (
   
    <main className="container-register" style={{ textAlign: "center" }}><section>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>💃Dance Finder🕺</h1>
        <h2>Please Register</h2>
        <div className="form-group">
        <fieldset>
          
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
        </fieldset>
        <fieldset>
            <input
              onChange={updateUser}
              type="text"
              id="city"
              className="form-control"
              placeholder="Enter your City"
              required
              autoFocus
            />
        </fieldset>
        <fieldset>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
        </fieldset>
        <fieldset>
                <label>
            <select
                
                id="stateId"
                onChange={updateUser}>
                    <option value="Select a State">Select State</option>
                    {states.map((state)=>(
                        <option key={state.id} value={state.id}>
                            {state.state_name}
                        </option>
                    )
                    )}
                </select></label>
        </fieldset>
        {}
       
        <fieldset>
          
            <label>
              <input
                onChange={(evt) => {
                  const copy = { ...user }
                  copy.isOrganizer = evt.target.checked
                  setUser(copy)
                }}
                type="checkbox"
                id="isOrganizer"
              />
              I am an organizer{" "}
            </label>
          
        </fieldset></div>
        <fieldset>
          
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          
        </fieldset>
      </form>
       </section>
       <section>
        <Link to="/login">Go back to Log In Page!</Link>
      </section>
    </main>
  )
}
