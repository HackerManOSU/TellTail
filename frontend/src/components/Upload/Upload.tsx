import { Link } from 'react-router-dom'
import cat from './cat-upload-image.webp'
import dog from './dog-upload-image.webp'

const Upload = () => {

    return (
        <div className="max-w-6xl mx-auto px-4 py-20">
            <h2 className="py-4 text-center text-3xl font-bold">Navigate to the following pages to identify your pet!</h2>
            <div className="flex flex-1 justify-between gap-2 py-10">
                {/* Cat Portion */}
                <Link to="/upload/cat" className='w-1/2 p-4 flex-1'>
                    <div className="flex flex-col items-center p-4 h-full rounded-xl bg-gray-200 hover:bg-primary hover:text-white">
                        <img alt="Cat" src={cat} width="50%"></img>
                        <h3 className="text-2xl mt-2">Cats</h3>
                    </div>
                </Link>
                
                {/* Dog Portion */}
                <Link to="/upload/dog" className='w-1/2 p-4 flex-1'>
                    <div className="flex flex-col items-center p-4 h-full rounded-xl bg-gray-200 hover:bg-primary hover:text-white">
                        <img alt="Dog" src={dog} width="50%"></img>
                        <h3 className="text-2xl mt-2">Dogs</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Upload