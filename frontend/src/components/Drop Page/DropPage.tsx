import React from 'react'

import CatDropField from '../Drop Fields/CatDropField'
import DogDropField from '../Drop Fields/DogDropField'
import dogImage from './dogimage.png';

interface DropPageProps {
  title: string
}

const DropPage: React.FC<DropPageProps> = ({ title }) => {
  return (
    <div className='min-h-screen w-[100vw] bg-background text-center flex flex-col items-center relative'>

      {/* <img
        src={dogImage}
        alt="Dog"
        className="absolute top-0 left-0 w-20 h-20 object-cover"
      />

      <img
        src={dogImage}
        alt="Dog"
        className="absolute top-0 right-0 w-20 h-20 object-cover"
      />

      <img
        src={dogImage}
        alt="Dog"
        className="absolute bottom-0 left-0 w-20 h-20 object-cover"
      />

      <img
        src={dogImage}
        alt="Dog"
        className="absolute bottom-0 right-0 w-20 h-20 object-cover"
      /> */}

      <div className='mt-10'>
        <h1 className='text-8xl lg:text-9xl text-primary'>Upload a {title}</h1>
      </div>
      
      <div className='w-full flex items-center justify-center mt-10'>
        <div className='border-4 border-primary rounded-lg p-8 flex items-center justify-center'>
          {title === "Cat" ? <CatDropField /> : <DogDropField />}
        </div>
      </div>

    </div>
  )
}

export default DropPage;
