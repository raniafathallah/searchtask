import { render, screen, cleanup } from "@testing-library/react";
import Studentcard from "../Studentcard";
afterEach(() => {
  cleanup();
});

test("should test student details ", () => {
  const student_1 = {
    city: "Fushë-Muhurr",
    company: "Yadel",
    email: "iorton0@imdb.com",
    firstName: "Ingaberg",
    grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
    id: "1",
    lastName: "Orton",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
    skill: "Oracle",
  };
  render(<Studentcard student={student_1} />);
  const userElement = screen.getByTestId("stu-1");
  expect(userElement).toBeInTheDocument();
  expect(userElement).toHaveTextContent(student_1.firstName);
  expect(userElement).toHaveTextContent(student_1.lastName);
  expect(userElement).toHaveTextContent(student_1.company),
    expect(userElement).toHaveTextContent(student_1.email);
  expect(userElement).toContainHTML(student_1.pic);
});

test("should test student avg ", () => {
  const student_1 = {
    city: "Fushë-Muhurr",
    company: "Yadel",
    email: "iorton0@imdb.com",
    firstName: "Ingaberg",
    grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
    id: "1",
    lastName: "Orton",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
    skill: "Oracle",
  };
  const Total = student_1.grades.reduce(
    (totalCalories, grade) => totalCalories + Number(grade),
    0
  );
  const avg = Total / student_1.grades.length;

  render(<Studentcard student={student_1} />);
  const userElement = screen.getByTestId("stu-1");
  expect(userElement).toBeInTheDocument();
  expect(userElement).toHaveTextContent(avg);
});

test("should test student tags appear ", () => {
  const student_1 = {
    city: "Fushë-Muhurr",
    company: "Yadel",
    email: "iorton0@imdb.com",
    firstName: "Ingaberg",
    grades: ["78", "100", "92", "86", "89", "88", "91", "87"],
    id: "1",
    lastName: "Orton",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
    skill: "Oracle",
    tags: ["tag1", "tag2"],
  };
  render(<Studentcard student={student_1} />);
  const userElement = screen.getByTestId("stu-1");
  expect(userElement).toBeInTheDocument();
  expect(userElement).toHaveTextContent("tag1");
  expect(userElement).toHaveTextContent("tag2");
});
