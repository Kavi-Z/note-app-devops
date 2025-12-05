import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing_Page/Landing.jsx";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import NotesPage from "./Components/posts_page/NotesPage.jsx";
import CreateNote from "./Components/create_post/CreateNote.jsx";
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<NotesPage />} />
         <Route path="/create-note" element={<CreateNote />} />
      </Routes>
    </Router>
  );
}

export default App;
