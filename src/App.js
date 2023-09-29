import React from "react";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import SignupForm from "./userAuthentication/signup";
import Login from "./userAuthentication/login";
import Profile from "./components/home";
import ViewProfile from "./userAuthentication/updateProfile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Profile />} />
        <Route path="/update" element={<ViewProfile />} />
      </Routes>
    </Router>
  );
}
export default App;
