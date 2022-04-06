import React, { useContext, useMemo, useState, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";
import Studentcontext from "./Context";
//  get details of each student
const Studentcard = ({ student }) => {
  const avg = useMemo(() => {
    const total = student.grades.reduce(
      (totalCalories, grade) => totalCalories + Number(grade),
      0
    );
    const avg = total / student.grades.length;
    return avg;
  });

  const percentage = student.grades.map((grd) => (grd / 100) * 100);
  const { students, setStudents, searchResults, setSearchResults } =
    useContext(Studentcontext);
  const [expandable, setExpandable] = useState(false);
  const showTests = useCallback(() => {
    setExpandable(!expandable);
  }, [expandable]);

  //tags logic and save to students items
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter") {
      const newTags = tags;
      newTags.push(tag);
      setTags(newTags);
      setTag("");
      if (searchResults.length < students.length) {
        const newStudents = formatJSON(searchResults);
        setSearchResults(newStudents);
      } else {
        const newStudents = formatJSON(students);
        setStudents(newStudents);
        setSearchResults(newStudents);
      }
    }
  };
  const formatJSON = (data) => {
    let result = [];
    data.forEach((item) => {
      if (item.id === student.id) {
        result.push({
          city: item.city,
          company: item.company,
          email: item.email,
          firstName: item.firstName,
          grades: item.grades,
          id: item.id,
          lastName: item.lastName,
          pic: item.pic,
          skill: item.skill,
          tags: tags,
        });
      } else {
        result.push(item);
      }
    });

    return result;
  };

  return (
    <>
      <div className="studentContainer" data-testid={`stu-${student.id}`}>
        <img className="studentImage" src={student.pic} alt="studentImage" />
        <div className="studentDetails">
          <p className="studentName">
            {student.firstName + " " + student.lastName}
          </p>
          <p className="paddLeft">Email: {student.email}</p>
          <p className="paddLeft">Company:{student.company}</p>
          <p className="paddLeft"> Average:{avg} %</p>
          {expandable ? (
            <div className="paddLeft">
              {percentage.map((perc, index) => (
                <p key={index}>
                  {" "}
                  Test:{index + 1} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {perc} %
                </p>
              ))}
            </div>
          ) : (
            ""
          )}
          <div>
            {student.tags ? (
              <div>
                {student.tags.map((tag, index) => (
                  <span key={index} className="tagedItem">
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              ""
            )}
            <input
              className="tagedInput paddLeft"
              type="text"
              name="tag"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
              placeholder="add tag"
              onKeyPress={(e) => {
                addTag(e);
              }}
            />
          </div>
        </div>
        <div className="showTests">
          {!expandable ? (
            <span>
              {" "}
              <AddIcon onClick={showTests} />{" "}
            </span>
          ) : (
            <span>
              {" "}
              <MinimizeIcon onClick={showTests} />{" "}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Studentcard;
