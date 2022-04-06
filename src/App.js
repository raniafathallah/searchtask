import "./App.css";
import Home from "./pages/Home";
import axios from "axios";
import Studentcontext from "./components/Context";
import React, { useState, useEffect } from "react";

//  using context and fetch data from api
function App() {
  const [students, setStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const fetchdata = async () => {
    const { data } = await axios.get(
      `https://api.hatchways.io/assessment/students`
    );
    setStudents(data.students);
    setSearchResults(data.students);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <Studentcontext.Provider
        value={{ students, setStudents, searchResults, setSearchResults }}
      >
        <div className="App">
          <Home />
        </div>
      </Studentcontext.Provider>
    </>
  );
}

export default App;
