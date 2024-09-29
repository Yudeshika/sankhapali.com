import React from 'react'
import PortfolioItem from '../components/PortfolioItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';

import portfolios from '../data/projects.json';

const projects = () => {
  return (
    <div className="flex items-center justify-center w-full mt-20"
    style={{ 
      backgroundImage: 'url(/images/bg-about.png)', 
      backgroundRepeat: 'repeat-y' 
    }}
    >
      <div className="container max-w-screen-xl">
        <h1 className="text-blue-100 text-3xl py-10">Portfolio Projects</h1>

        {portfolios.map((project, index) => (
          <PortfolioItem key={index} project={project} />
        ))}

      </div>
    </div>
  )
}

export default projects