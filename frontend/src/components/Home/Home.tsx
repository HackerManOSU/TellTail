import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
    const [opacity, setOpacity] = useState(1);

    // Calculates opacity based on scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 300, 0);
      setOpacity(newOpacity);
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">

          <div className="p-8 mt-4 flex lg:flex-row items-left font-semibold h-screen flex-col fade" style={{ opacity }}>

            <div className="flex flex-col items-left lg:w-1/2">
              <p className="text-7xl">Identify Your Pets</p>
              <p className="mt-8 text-3xl font-light">Quick, Easy, Anywhere</p>
            </div>
            
            <div className="flex justify-center lg:w-1/2 h-1/2"> 
              <img src="src\components\Home\scottishfold.jpg" alt="cat" className="w-1/3  mt-8 rounded-lg  " />
              <img src="src\components\Home\goldenretriever.jpg" alt="dog" className="w-1/3 mt-8 rounded-lg " />
              <img src="src\components\Home\cat2.jpg" alt="dog" className="w-1/3  mt-8 rounded-lg" />
            </div>
          </div>




        <div className="flex justify-between">
          <div className="w-1/2 p-4 border-4 border-tertiary rounded-lg mr-2">
            <h2 className="text-3xl font-bold mb-4">Easily Identify Your Pets</h2>
            <p className="text-lg">Upload a picture and get quickly results</p>
          </div>
          <div className="w-1/2 p-4 border-4 border-tertiary rounded-lg ml-2">
            <h2 className="text-3xl font-bold mb-4">Access Anywhere</h2>
            <p className="text-lg">Find out more about your pet anywhere with our offline access</p>
          </div>
        </div>

        <div className="flex justify-between mt-12 bg-tertiary rounded-lg text-white mt-20">
          <div className="w-1/2 p-4">
            <img src="src\components\Home\profile.jpg" alt="profile" className="w-full rounded-lg" />
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Learn More About Your Pet</h2>
            <p className="text-lg">Get a profile for your specific pet's breed to learn more about it.</p>
          </div>
        </div>

        <div className="flex flex-col border-4 border-secondary rounded-lg mt-12 items-center ">
          <h2 className="text-3xl font-bold">Share With Others</h2>
          <p className="text-lg">Download your pet's profile as a PDF and share it with friends and family.</p>
        </div>



        
    </div>

  )
}

export default Home


