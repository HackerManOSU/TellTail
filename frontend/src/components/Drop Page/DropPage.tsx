import React from 'react'

import CatDropField from '../Drop Fields/CatDropField'
import DogDropField from '../Drop Fields/DogDropField'

interface DropPageProps {
  title: string
}

const DropPage: React.FC<DropPageProps> = ({ title }) => {
  return (
    <div className='h-[95vh] w-[100vw] bg-[#fff] text-center flex flex-col items-center justify-evenly'>
      <h1 className='text-9xl text-primary'>Upload a {title}</h1>
      {(title == "Cat") ? <CatDropField />
        : <DogDropField />}
    </div>
  )
}

export default DropPage
