import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar=({currentUser})=>{
    const navigate=useNavigate()

    return(
    <ul className="navbar">
        <li className="navbar-item">
            <Link to="/events">All Events</Link>
        </li>
        <li className="navbar-item">
            <Link to="/events/myevents">My Events</Link>
        </li>
        <li className="navbar-item">
        <Link className="navbar-link" to={`/profile/${currentUser.id}`}>
          Profile
        </Link>
      </li>
        <li className="navbar-item">
            <Link to="/organizers">Organizers</Link>
        </li>
        <li className="navbar-item">
            <Link to="/dances">Types of Dances</Link>
        </li>

        {localStorage.getItem("dance_user") ? (
        <li className="navbar-item navbar-logout">
            <Link
                className="navbar-link"
                 to=""
                 onClick={() => {
                 localStorage.removeItem("dance_user")
                 navigate("/", { replace: true })
                 }}
            >
            Logout
            </Link>
        </li>
        ) : (
            ""
        )}
    </ul>)
}