import React from 'react'
import arrow from '../assets/icons/arrow.svg'
import { Link } from 'react-router-dom';

const InfoBox = ( { text, link, btnText } ) => {
  return(
    <div className='info-box bg-white p-4 rounded-lg shadow-lg'>
      <h4 className='text-clip sm:text-2xl font-bold'>{text}</h4>
      <Link to={link} className='neo-brutalism-white neo-btn'> {btnText} 
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </Link>
    </div>
  );
};

const renderContent = {
  1: ( 
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I am <span className='font-semibold'>Sankhapali</span> 👋
        <br/> I am a full-stack developer and a 3D Artist.
      </h1> 
    ),
  2: ( 
      <InfoBox 
        text='I am a full-stack developer'
        link='/about'
        btnText='Learn more'
    />
    ),
  3: ( 
      <InfoBox 
        text='I am a 3D Artist and a Developer'
        link='/projects'
        btnText='View projects'
    />
  ),
  4: ( 
      <InfoBox 
        text='Interested?'
        link='/contact'
        btnText='Get in touch'
    />
  ),
}


const HomeInfo = ( {currentStage} ) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo