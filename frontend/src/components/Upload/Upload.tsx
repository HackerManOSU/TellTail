import { Link } from 'react-router-dom'
import cat from './calico-cat.jpg'
import dog from './dog.jpg'
import portraitImg from './dogimage.png';
import portraitImg1 from './catimage.png';


const Upload = () => {

    return (
        <div className="relative bg-backround text-primary h-screen flex flex-col items-center justify-center">


            <img src={portraitImg} alt="Dog Portrait" className="absolute top-4 left-4 w-24 h-24 " />


            <img src={portraitImg1} alt="Cat Portrait" className="absolute top-4 right-4 w-24 h-24 " />


            <img src={portraitImg} alt="Dog Portrait" className="absolute bottom-4 right-4 w-24 h-24" />


            <img src={portraitImg1} alt="Cat Portrait" className="absolute bottom-4 left-4 w-24 h-24 " />


            <div className="max-w-6xl mx-auto px-4 py-20">
                <h2 className="py-4 text-center text-3xl font-bold">Navigate to the following pages to identify your pet!</h2>
                <div className="flex flex-1 justify-between gap-2 py-10">
                  
                    <Link to="/upload/cat" className='w-1/2 p-4 flex-1'>
                        <div className="flex flex-col items-center p-4 h-full rounded-xl bg-backround hover:bg-primary hover:text-white border-4 border-primary transition-colors duration-300">
                            <img alt="Cat" src={cat} width="50%" />
                            <h3 className="text-2xl mt-2">Cats</h3>
                        </div>
                    </Link>

                    <Link to="/upload/dog" className='w-1/2 p-4 flex-1'>
                        <div className="flex flex-col items-center p-4 h-full rounded-xl bg-backround hover:bg-primary hover:text-white border-4 border-primary transition-colors duration-300">
                            <img alt="Dog" src={dog} width="50%" />
                            <h3 className="text-2xl mt-2">Dogs</h3>
                        </div>
                    </Link>



                </div>
            </div>
        </div>
    );
}

export default Upload