import portraitImg from './dogimage.png';
import portraitImg1 from './catimage.png';

const Instructions = () => {
  return (
    <div className="relative bg-backround text-primary h-screen flex flex-col items-center justify-center">


            <img src={portraitImg} alt="Dog Portrait" className="absolute top-4 left-4 w-24 h-24 " />


            <img src={portraitImg1} alt="Cat Portrait" className="absolute top-4 right-4 w-24 h-24 " />


            <img src={portraitImg} alt="Dog Portrait" className="absolute bottom-4 right-4 w-24 h-24 " />


            <img src={portraitImg1} alt="Cat Portrait" className="absolute bottom-4 left-4 w-24 h-24 " />

     
      <div>
        <h1 className="text-4xl font-bold text-primary mb-6">Instructions</h1>
      </div>

      <div>
        <p className="text-center text-4xl py-2 text-primary decoration-tertiary">
          Use TailTell to identify your pets in <b>3 easy steps!</b>
        </p>
      </div>

      <div className="w-1/2 flex flex-col mt-12 mx-auto align-center text-center">
        <div className="w-full p-4 border-4 border-tertiary rounded-lg mb-4">
          <h2 className="text-2xl font-bold mb-4">1. Navigate to the "Upload" page</h2>
        </div>

        <div className="w-full p-4 border-4 border-tertiary rounded-lg mb-4">
          <h2 className="text-2xl font-bold mb-4">2. Upload a picture of your pet in the drop field</h2>
        </div>

        <div className="w-full p-4 border-4 border-tertiary rounded-lg mb-4">
          <h2 className="text-2xl font-bold mb-4">3. Press "Continue" and get your results!</h2>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
