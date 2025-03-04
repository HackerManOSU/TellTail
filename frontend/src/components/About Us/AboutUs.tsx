import Collapsible from './Collapsible';
import nathanielImg from './nathaniel.jpg';
import troyImg from './troy.jpg';
import raedImg from './raed.jpg';
import christianImg from './christian.jpg';
import samImg from './sam.png';
import zaneImg from './zane.jpg';
import stephenImg from './stephen.jpg';
import dogImage from './dogimage.png'; 

const teamMembers = [
  {
    name: "Nathaniel White", img: nathanielImg,
    description: "Hello! I am a CS major from Southern California, and between cats and dogs, I will choose cats everytime.",
    link: "https://www.linkedin.com/in/nathaniel-white-1371a8278",
  },
  {
    name: "Sam Neale", img: samImg,
    description: "Hi! I am Computer Science major from Spokane, Washington. I am a big fan of both cats and dogs.",
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
    name: "Stephen Tsui", img: stephenImg,
    description: "Hi! I'm a Computer Science major from Belmont, California. I'm a dog person but I also like cats.",
    link: "",
  },
  {
    name: "Troy Diaz", img: troyImg,
    description: "Hey everyone, I'm a Computer Science major from Kaua'i, Hawai'i. Dogs are better!",
    link: "https://www.linkedin.com/in/troykvdiaz?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Zane Garvey", img: zaneImg,
    description: "Hellur! I am a Junior Computer Science major from Milwaukie, Oregon. Dogs are definitely better!",
    link: "https://www.linkedin.com/in/zane-garvey",
  },
];

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-background relative">
      
      <img
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
      />

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

        <div className="flex flex-wrap justify-center gap-5 w-full">
          {teamMembers.map((member, index) => (
            <div key={index} className="m-[10px] w-[300px]">
              <div className="w-full aspect-[3/4] overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover block border-8 border-500 border-primary rounded-sm"
                />
              </div>
              <Collapsible name={member.name}>
                <p>{member.description}</p>
                <a
                  className="text-[#664C36] underline"
                  href={member.link}
                >
                  See more!
                </a>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
