import React from "react";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import SignupForm from "./userAuthentication/signup";
import Login from "./userAuthentication/login";
import Profile from "./components/home";
import ViewProfile from "./userAuthentication/updateProfile";
import ForgetPassword from "./userAuthentication/forgetpassword";
import ExpenseTracker from "./components/expenses";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Profile />} />
        <Route path="/update" element={<ViewProfile />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/expenses" element={<ExpenseTracker />} />
      </Routes>
    </Router>
  );
}
export default App;
