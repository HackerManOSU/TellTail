import { Link } from 'react-router-dom';
import cat from './cat-upload-image.webp';
import dog from './dog-upload-image.webp';

const Upload = () => {
  return (
    <div className="bg-background min-h-screen w-full relative">
    
      <div className="max-w-6xl mx-auto px-4 py-20">
        
        <h2 className="py-4 text-center text-3xl font-bold border-4 border-primary rounded-xl px-6 text-primary">
          Navigate to the following pages to identify your pet!
        </h2>

        <div className="flex flex-1 justify-between gap-2 py-10">
          {/* Cat Portion */}
          <Link to="/upload/cat" className="w-1/2 p-4 flex-1">
            <div className="flex flex-col items-center p-4 h-full rounded-xl bg-gray-200 hover:bg-primary hover:text-white group">
              <img alt="Cat" src={cat} className="w-70 h-70 object-cover rounded-lg" />
              <h3 className="text-2xl mt-2 text-primary group-hover:text-white">Cats</h3>
            </div>
          </Link>

          {/* Dog Portion */}
          <Link to="/upload/dog" className="w-1/2 p-4 flex-1">
            <div className="flex flex-col items-center p-4 h-full rounded-xl bg-gray-200 hover:bg-primary hover:text-white group">
              <img alt="Dog" src={dog} className="w-100 h-100 object-cover rounded-lg" />
              <h3 className="text-2xl mt-2 text-primary group-hover:text-white">Dogs</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Upload;
