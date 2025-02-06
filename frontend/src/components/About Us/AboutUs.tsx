import './AboutUs.css'
import nathanielImg from './nathaniel.jpg';
import portraitImg from './portrait.jpg';

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-6">About Us</h1>

      <p className="text-lg text-gray-700 mb-4">
        Welcome to our site! We are dedicated to helping you learn more about your pet,
        from its breed to other potentional insights!
      </p>
      <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">Our Mission</h2>
      <p className="text-lg text-gray-700 mb-4">
        Our mission is to provide a quick and easy way to learn more about your
        cat or dog. We aim to provide accurate information on your pet's breed,
        age, and potential health information.
      </p>
      <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">Our Team</h2>
      <p className="text-lg text-gray-700 mb-4">
        We are a group of students at Oregon State University with diverse backgrounds,
        all working together to achieve a common goal.
      </p>

      <div className="flex-container">
        <div className="img-container">
          <img src={nathanielImg} alt="Nathaniel White"/>
          <p>Nathaniel White</p>
        </div>

        <div className="img-container">
          <img src={portraitImg} alt="Placeholder Name"/>
          <p>Sam Neale</p>
        </div>

        <div className="img-container">
          <img src={portraitImg} alt="Placeholder Name"/>
          <p>Raed Kabir</p>
        </div>

        <div className="img-container">
          <img src={portraitImg} alt="Placeholder Name"/>
          <p>Christian DeVore</p>
        </div>

        <div className="img-container">
          <img src={portraitImg} alt="Placeholder Name"/>
          <p>Stephen Tsui</p>
        </div>

        <div className="img-container">
          <img src={portraitImg} alt="Placeholder Name"/>
          <p>Troy Diaz</p>
        </div>

        <div className="img-container">
          <img src={portraitImg} alt="Placeholder Name"/>
          <p>Zane Garvey</p>
        </div>
      </div>


    </div>
  )
}

export default AboutUs
