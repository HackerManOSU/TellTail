import { useEffect, useState } from 'react';
import cat1 from './home-cat-image.webp';
import cat2 from './home-cat2-image.webp';
import dog1 from './home-dog-image.webp';
import profile1 from './profile.jpg';
import { Link } from 'react-router-dom';
import dogImage from './dogimage.png'; 
import ImageCycle from './imageCycle';
import profile2 from './profile2.jpg';
import profile3 from './profile3.jpg'

const Home = () => {
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const newOpacity = Math.max(1 - scrollY / 400, 0);
    setOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-background min-h-screen w-full relative">
     
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="p-8 mt-4 flex lg:flex-row items-left font-semibold h-screen flex-col " style={{ opacity: opacity, transition: 'opacity 0.5s ease-out' }}>
          <div className="flex flex-col items-left lg:w-1/2 pt-8">
            <p className="text-7xl text-primary">Identify Your Pets</p>
            <p className="mt-8 text-3xl font-light text-primary">Quick, Easy, Anywhere</p>
            
            <Link to="/upload" className="flex flex-col items-center mt-8 p-1 lg:mt-20 lg:w-3/4 bg-tertiary rounded-full">
              <p className="p-2 text-3xl text-primary">Get Started</p>
            </Link>
          </div>

          <div className="flex justify-center lg:w-1/2 flex-grow">
            <img src={cat1} alt="cat" className="w-1/3 h-1/2 mt-8 rounded-lg object-cover" />
            <img src={dog1} alt="dog" className="w-1/3 h-1/2 mt-8 rounded-lg object-cover" />
            <img src={cat2} alt="dog" className="w-1/3 h-1/2 mt-8 rounded-lg object-cover" />
          </div>      
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 p-4 border-4 border-tertiary rounded-lg mr-2">
            <h2 className="text-3xl font-bold mb-4 text-primary">Easily Identify Your Pets</h2>
            <p className="text-lg text-primary">Upload a picture and get results quickly</p>

            <Link to="/instructions" className="flex flex-col items-center p-1 mt-5 lg:w-1/3 bg-tertiary rounded-full">
              <p className="p-1 text-md">Learn More</p>
            </Link>
          </div>
          <div className="w-1/2 p-4 border-4 border-tertiary rounded-lg ml-2">
            <h2 className="text-3xl font-bold mb-4 text-primary">Access Anywhere</h2>
            <p className="text-lg text-primary">Find out more about your pet anywhere with our offline access</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between mt-12 bg-tertiary rounded-lg text-white mt-20">
          <div className="lg:w-1/2 p-4">

            <ImageCycle profile={[profile1, profile2, profile3]} />

          </div>
          <div className="lg:w-1/2 p-4 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-primary">Learn More About Your Pet</h2>
            <p className="text-lg text-primary">Get a profile for your specific pet's breed to learn more about them.</p>
          </div>
        </div>

        <div className="flex flex-col border-4 border-primary rounded-lg mt-12 items-center">
          <h2 className="text-3xl font-bold text-primary">Share With Others</h2>
          <p className="text-lg text-primary">Download your pet's profile as a PDF and share it with friends and family.</p>
        </div>
      </div>
    </div> 
  );
};

export default Home;