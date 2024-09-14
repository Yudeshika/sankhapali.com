import React from 'react'
import PortfolioItem from '../components/PortfolioItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';

const portfolios = [
  {
    name: "My Awesome Project",
    screenshots: [
      "https://placeholder.com/400x300",
      "https://placeholder.com/400x300",
      "https://placeholder.com/400x300",
    ],
    highlights: [
      "Implemented user authentication",
      "Responsive design",
      "Integration with third-party APIs",
    ],
    technologies: [
      { name: "React", icon: <FaReact size={30} /> },
      { name: "Node.js", icon: <FaNodeJs size={30} /> },
      { name: "Database", icon: <FaDatabase size={30} /> },
    ],
  },
  {
    name: "My Awesome Project",
    screenshots: [
      "https://placeholder.com/400x300",
      "https://placeholder.com/400x300",
      "https://placeholder.com/400x300",
    ],
    highlights: [
      "Implemented user authentication",
      "Responsive design",
      "Integration with third-party APIs",
    ],
    technologies: [
      { name: "React", icon: <FaReact size={30} /> },
      { name: "Node.js", icon: <FaNodeJs size={30} /> },
      { name: "Database", icon: <FaDatabase size={30} /> },
    ],
  }
];

const projects = () => {
  return (
    <div className="mt-10">
      <div className="container mt-10">
        <h1>Portfolio Projects</h1>

        {portfolios.map((project, index) => (
          <PortfolioItem key={index} project={project} />
        ))}

      </div>
    </div>
  )
}

export default projects