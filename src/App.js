import React from "react";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import SignupForm from "./userAuthentication/signup";
import Login from "./userAuthentication/login";
import Home from "./components/home";
import Updateprofile from "./userAuthentication/updateProfile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/update" element={<Updateprofile />} />
      </Routes>
    </Router>
  );
}
export default App;
