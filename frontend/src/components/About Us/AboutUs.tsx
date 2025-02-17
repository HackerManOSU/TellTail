import './AboutUs.css';
import Collapsible from './Collapsible';
import nathanielImg from './nathaniel.jpg';
import troyImg from './troy.jpg';
import raedImg from './raed.jpg';
import christianImg from './christian.jpg';
import portraitImg from './portrait.jpg';
import samImg from './sam.png';

const teamMembers = [
  {
    name: "Nathaniel White", img: nathanielImg,
    description: "Hello! I am a CS major from Southern California, and between cats and dogs, I will choose cats everytime.",
    link: "https://www.linkedin.com/in/nathaniel-white-1371a8278",
  },
  {
    name: "Sam Neale", img: samImg,
    description: "Hi! I am Computer Sceince major from Spokane, Washington. I am a big fan of both cats and dogs.",
    link: "",
  },
  {
    name: "Raed Kabir", img: raedImg,
    description: "Hello, I am a Computer Science & Math major from Santa Clara, California. I love both cats and dogs equally :)",
    link: "https://www.linkedin.com/in/kabirrraed/",
  },
  {
    name: "Christian DeVore", img: christianImg,
    description: "Hi, my name is Christian! I'm currently a junior majoring in Computer Science at Oregon State University, and I'm from Portland, OR. I grew up a cat person but I've definitely grown to love dogs as well!",
    link: "https://www.linkedin.com/in/christian-devore/",
  },
  {
    name: "Stephen Tsui", img: portraitImg,
    description: "",
    link: "",
  },
  {
    name: "Troy Diaz", img: troyImg,
    description: "Hey everyone, I'm a computer science major from Kaua'i, Hawai'i. Dogs are better!",
    link: "https://www.linkedin.com/in/troykvdiaz?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Zane Garvey", img: portraitImg,
    description: "",
    link: "",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-backround max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-6">About Us</h1>

      <p className="text-lg text-gray-700 mb-4">
        Welcome to our site! We are dedicated to helping you learn more about your pet,
        from its breed to other potential insights!
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
        {teamMembers.map((member, index) => (
          <div key={index} className="img-container">
            <div className="img-wrapper">
              <img src={member.img} alt={member.name} />
            </div>
            <Collapsible name={member.name}>
              <p>{member.description}</p>
              <a className="descriptionLink" href={member.link}>See more!</a>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
