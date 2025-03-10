import React from 'react'

import CatDropField from '../Drop Fields/CatDropField'
import DogDropField from '../Drop Fields/DogDropField'

interface DropPageProps {
  title: string
}

const DropPage: React.FC<DropPageProps> = ({ title }) => {
  return (
    <div className='min-h-screen w-[100vw] bg-background text-center flex flex-col items-center'>

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
