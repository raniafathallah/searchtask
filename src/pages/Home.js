import React, { useState, useRef, useContext } from "react";
import Studentcard from "../components/Studentcard";
import "../App.css";
import Studentcontext from "../components/Context";
//  search and filter all items
//  able to add tag to any item before and after adding tags
//  get list of students card that include details and avg tests

const Home = () => {
  const [searchInputName, setsearchInputName] = useState("");
  const [searchInputTag, setsearchInputTag] = useState("");
  const inputEl = useRef("");
  const inputEl2 = useRef("");
  const { students, searchResults, setSearchResults } =
    useContext(Studentcontext);
  // search logic
  const getsearchInputName = () => {
    searchByNames(inputEl.current.value);
  };
  const getsearchInputTag = () => {
    searchByTags(inputEl2.current.value);
  };
  const searchByNames = (searchInputName) => {
    setsearchInputName(searchInputName);
    if (searchInputName !== "") {
      const newList = searchResults.filter((stu) =>
        (stu.firstName + "" + stu.lastName)
          .toLowerCase()
          .includes(searchInputName.toLowerCase())
      );
      setSearchResults(newList);
    } else {
      setSearchResults(students);
    }
  };
  const searchByTags = (searchInputTag) => {
    setsearchInputTag(searchInputTag);
    if (searchInputTag !== "") {
      const newList = searchResults.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchInputTag.toLowerCase());
      });

      setSearchResults(newList);
    } else {
      setSearchResults(students);
    }
  };
  // end search logic

  return (
    <>
      <div className="studentList">
        <input
          ref={inputEl}
          type="text"
          placeholder="Search by Name"
          value={searchInputName}
          onChange={getsearchInputName}
        />
        <input
          ref={inputEl2}
          type="text"
          placeholder="Search by Tag"
          value={searchInputTag}
          onChange={getsearchInputTag}
        />
        {/* disp searched items */}
        {searchResults.length > 0
          ? searchResults.map((student, index) => (
              <div key={student.id}>
                <Studentcard student={student} />
              </div>
            ))
          : "No students available"}
      </div>
    </>
  );
};
export default Home;
