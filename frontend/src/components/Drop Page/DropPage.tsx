import React from 'react'

import CatDropField from '../Drop Fields/CatDropField'
import DogDropField from '../Drop Fields/DogDropField'

interface DropPageProps {
  title: string
}

const DropPage: React.FC<DropPageProps> = ({ title }) => {
  return (
    <div className='h-[90vh] w-[100vw] bg-[#fff] text-center flex flex-col items-center'>

      <div className=' top-[15dvh]'>

        <h1 className='text-8xl lg:text-9xl text-primary'>Upload a {title}</h1>

      </div>
      
      <div className='w-full h-full flex items-top justify-center pt-10'>
        {(title == "Cat") ? <CatDropField /> : <DogDropField />}
      </div>

    </div>
  )
}

export default DropPage
