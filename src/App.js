import React from "react";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import SignupForm from "./userAuthentication/signup";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}
export default App;
