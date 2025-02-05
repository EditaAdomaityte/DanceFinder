import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Welcome } from "../components/Welcome/Welcome";
import { EventList } from "../components/Events/EventList";
import { EventDetails } from "../components/Events/EventDetails";
import { EditEventForm } from "../components/Forms/EditEventForm";
import { NewEventForm } from "../components/Forms/NewEventForm.jsx";
import { MyEvents } from "../components/Events/MyEvents";
import { ProfileDetails } from "../components/Users/ProfileDetails";
import { EditProfileForm } from "../components/Forms/EditProfileForm";
import { OrganizerList } from "../components/Users/OrganizerList";
import { DanceList } from "../components/Dances/DanceList";
import { DanceDetails } from "../components/Dances/DanceDetails";

export const ApplicationViews = (Authorized) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("dance_user");
    const userObj = JSON.parse(user);
    setCurrentUser(userObj);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="events">
          <Route index element={<EventList currentUser={currentUser} />} />
          <Route
            path=":eventid"
            element={<EventDetails currentUser={currentUser} />}
          />
          <Route
            path=":eventid/edit"
            element={<EditEventForm currentUser={currentUser} />}
          />
          <Route
            path="myevents"
            element={<MyEvents currentUser={currentUser} />}
          />
        </Route>
        <Route
          path="newevent"
          element={<NewEventForm currentUser={currentUser} />}
        />
        <Route path="profile">
          <Route index element={<ProfileDetails currentUser={currentUser} />} />
          <Route
            path=":userId"
            element={<ProfileDetails currentUser={currentUser} />}
          />
          <Route
            path=":userId/edit"
            element={<EditProfileForm currentUser={currentUser} />}
          />
        </Route>
        <Route path="organizers" element={<OrganizerList />} />
        <Route path="dances">
          <Route index element={<DanceList />} />
          <Route path=":danceId" element={<DanceDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};
