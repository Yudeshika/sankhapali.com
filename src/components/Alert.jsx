import React from 'react';

const Alert = ({ type, text }) => {  // Destructure the props object here
  return (
    <div className='absolute top-10 left-10 right-0 flex justify-center items-center'>
        <div className={`${type === 'danger' ? 'bg-red-300' : 'bg-blue-300'} p-2 text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex items-center`} role='alert'>
            <p className={`${type === 'danger' ? 'bg-red-300' : 'bg-blue-300'} flex rounded-full uppercase px-2 py-1 font-semibold mr-3`}>
                {type === 'danger' ? 'Failed' : 'Success'} 
            </p>
            <p className='mr-2 text-left'>
                {text}
            </p>
        </div>
    </div>
  );
}

export default Alert;