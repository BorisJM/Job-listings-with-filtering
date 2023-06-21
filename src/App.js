import { useState } from "react";
import accountImg from "./images/account.svg";
import eyecamImg from "./images/eyecam-co.svg";
import faceitImg from "./images/faceit.svg";
import iconRemove from "./images/icon-remove.svg";
import insureImg from "./images/insure.svg";
import loopStudiousImg from "./images/loop-studios.svg";
import manageImg from "./images/manage.svg";
import myhomeImg from "./images/myhome.svg";
import photosnapImg from "./images/photosnap.svg";
import shortlyImg from "./images/shortly.svg";
import theairFilterImg from "./images/the-air-filter-company.svg";
import { type } from "@testing-library/user-event/dist/type";

const dataJobs = [
  {
    id: 1,
    company: "Photosnap",
    logo: photosnapImg,
    new: true,
    featured: true,
    position: "Senior Frontend Developer",

    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    tools: ["HTML", "CSS", "JavaScript", "Senior", "Frontend"],
  },
  {
    id: 2,
    company: "Manage",
    logo: manageImg,
    new: true,
    featured: true,
    position: "Fullstack Developer",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    tools: ["React", "Python", "Midweight", "Fullstack"],
  },
  {
    id: 3,
    company: "Account",
    logo: accountImg,
    new: true,
    featured: false,
    position: "Junior Frontend Developer",

    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    tools: ["React", "Sass", "JavaScript", "Junior", "Frontend"],
  },
  {
    id: 4,
    company: "MyHome",
    logo: myhomeImg,
    new: false,
    featured: false,
    position: "Junior Frontend Developer",

    postedAt: "5d ago",
    contract: "Contract",
    location: "USA Only",
    tools: ["CSS", "JavaScript", "Junior", "Frontend"],
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: loopStudiousImg,
    new: false,
    featured: false,
    position: "Software Engineer",

    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",

    tools: ["Ruby", "Sass", "JavaScript", "Midweight", "Fullstack"],
  },
  {
    id: 6,
    company: "FaceIt",
    logo: faceitImg,
    new: false,
    featured: false,
    position: "Junior Backend Developer",

    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK Only",
    tools: ["RoR", "Ruby", "Junior", "Backend"],
  },
  {
    id: 7,
    company: "Shortly",
    logo: shortlyImg,
    new: false,
    featured: false,
    position: "Junior Developer",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    tools: ["Sass", "HTML", "JavaScript", "Junior", "Frontend"],
  },
  {
    id: 8,
    company: "Insure",
    logo: insureImg,
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    tools: ["Vue", "Sass", "JavaScript", "Junior", "Frontend"],
  },
  {
    id: 9,
    company: "Eyecam Co.",
    logo: eyecamImg,
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    tools: ["Django", "JavaScript", "Python", "Midweight", "Fullstack"],
  },
  {
    id: 10,
    company: "The Air Filter Company",
    logo: theairFilterImg,
    new: false,
    featured: false,
    position: "Front-end Dev",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    tools: ["React", "Sass", "JavaScript", "Frontend", "Junior"],
  },
];

export default function App() {
  const [showFilter, setShowFilter] = useState(false);
  const [toRender, setToRender] = useState([...dataJobs]);
  const [arrayFilter, setArrayFilter] = useState([]);

  function ArrayDisplay() {
    setToRender(
      dataJobs
        .map((el, i) => {
          if (
            arrayFilter.every((skill) => {
              return el.tools.includes(skill);
            })
          )
            return el;
        })
        .filter((value) => typeof value !== "undefined")
    );
  }

  function handleShowFilter(e) {
    const data = e.target.dataset.tool;
    // setArrayFilter([...arrayFilter, data]);
    arrayFilter.push(data);
    setArrayFilter([...new Set(arrayFilter)]);
    setShowFilter(true);
    ArrayDisplay();
  }

  function handleDelete(el) {
    const indexel = arrayFilter.findIndex((element) => element === el);
    arrayFilter.splice(indexel, 1);
    ArrayDisplay();

    if (arrayFilter.length === 0) {
      setShowFilter(false);
      setToRender([...dataJobs]);
    }
  }

  function ClearAll() {
    setArrayFilter([]);
    setShowFilter(false);
    setToRender([...dataJobs]);
  }

  return (
    <div>
      <div className="header">
        {" "}
        {showFilter && (
          <Filter
            handleClear={ClearAll}
            handleDelete={handleDelete}
            arrayFilter={arrayFilter}
          />
        )}
      </div>

      <List toRender={toRender} setShowFilter={handleShowFilter} />
    </div>
  );
}

function List({ setShowFilter, toRender }) {
  return (
    <div className="list-container">
      {toRender.map((el) => (
        <Offer setShowFilter={setShowFilter} Job={el} key={el?.id} />
      ))}
    </div>
  );
}

function Offer({ Job, setShowFilter }) {
  return (
    <div className={`offer-container ${Job.featured ? "border" : ""}`}>
      <div className="first-column">
        <div className="logo-container">
          <img src={Job.logo} alt="company-logo" className="logo" />
        </div>
        <div className="second-column">
          <ul className="heading-description">
            <li className="list-item">{Job.company}</li>
            {Job.new && <li className="new">new!</li>}
            {Job.featured && <li className="featured">featured</li>}
          </ul>
          <h2>{Job.position}</h2>
          <ul className="main-description">
            <li>{Job.postedAt}</li>
            <li className="circle">{"\u2022"}</li>
            <li>{Job.contract}</li>
            <li className="circle">{"\u2022"}</li>

            <li>{Job.location}</li>
          </ul>
        </div>
      </div>
      <ul className="skills">
        {Job.tools.toReversed().map((tool) => (
          <li
            data-tool={tool}
            onClick={(e) => setShowFilter(e)}
            className="tool"
          >
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Filter({ arrayFilter, handleDelete, handleClear }) {
  return (
    <div className="filter-container">
      <div className="selected-container">
        {arrayFilter.map((el) => (
          <SelectedSkill handleDelete={handleDelete} el={el} />
        ))}
      </div>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

function SelectedSkill({ el, handleDelete }) {
  return (
    <div className="selected-skill">
      <span>{el}</span>{" "}
      <button onClick={() => handleDelete(el)} className="remove-button">
        <img src={iconRemove} alt="icon remove" />
      </button>
    </div>
  );
}
