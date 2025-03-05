import { useCallback, useEffect, useState } from 'react';

interface ImageCycleProp {
    profile: string[];
}

const ImageCycle: React.FC<ImageCycleProp> = ({ profile }) => {
const [imageIndex, setImageIndex] = useState(0);

const cycleImages = useCallback(() => {
    setImageIndex((prevIndex) => {
    const nextIndex = prevIndex === profile.length - 1 ? 0 : prevIndex + 1;
    return nextIndex;
    });
},[profile.length]);

const reverseCycleImages = useCallback(() => {
    setImageIndex((prevIndex) => {
    const nextIndex = prevIndex === 0 ? profile.length - 1 : prevIndex - 1;
    return nextIndex;
    });
},[profile.length]);

useEffect(() => {
    const interval = setInterval(() => {
    cycleImages();
    }, 5000);

    return () => clearInterval(interval);
}, [cycleImages]);

return (
    <div className="relative bg-white rounded-lg overflow-hidden border-4">
        <div className="flex transition-transform duration-500 ease-in-out" style={{transform: `translateX(-${imageIndex * 100}%)`}}>
            {profile.map((img, index) => (
                <div key={index} className="flex-shrink-0 w-full" 
                style={{ transition: 'opacity 0.5s ease-in-out', opacity: imageIndex === index ? 1 : 0 }}>
                    <img 
                        src={img} 
                        alt="profile" 
                        className="w-full max-h-[50vh] rounded-lg object-contain"
                    />
                </div>
            ))}
        </div>
        
        <button onClick={cycleImages} className = "absolute inset-y-0 right-0 font-light text-black text-4xl opacity-10 hover:opacity-100">&gt;</button>
        <button onClick={reverseCycleImages} className = "absolute inset-y-0 left-0 font-light text-black text-4xl opacity-10 hover:opacity-100">&lt;</button>
        
    </div>
);};

export default ImageCycle;
