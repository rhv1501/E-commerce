import { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import { UIContext } from "../context/UI Context/UIContext";

const About = () => {
  const { darkMode } = useContext(UIContext);
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 lg:px-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-500 mb-6 animate-pulse">
              About <span className="text-[#94bbe9]">PKG IT</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Transforming the digital shopping experience with cutting-edge
              technology and exceptional service
            </p>
          </div>

          {/* Our Story */}
          <div
            className={`${
              darkMode
                ? "bg-black/30"
                : "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
            } p-8 rounded-3xl shadow-2xl shadow-[#94bbe9] mb-16`}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <p className="text-gray-300 mb-4">
                  Founded in 2020, PKG IT began with a simple mission: to create
                  an e-commerce platform that puts the customer experience
                  first. What started as a small tech startup has grown into a
                  leading online marketplace for premium products.
                </p>
                <p className="text-gray-300">
                  Our journey has been defined by innovation, perseverance, and
                  an unwavering commitment to quality. Through economic
                  challenges and rapidly changing technology, we've stayed true
                  to our core values while continuously evolving to meet the
                  needs of our customers.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/assets/heroimage.avif"
                    alt="Our journey"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <ValueCard
              title="Innovation"
              description="We constantly push the boundaries of what's possible in e-commerce, integrating cutting-edge technology to create seamless shopping experiences."
              icon="💡"
            />
            <ValueCard
              title="Quality"
              description="We carefully curate our product offerings, ensuring that everything we sell meets the highest standards of quality and craftsmanship."
              icon="⭐"
            />
            <ValueCard
              title="Sustainability"
              description="We're committed to reducing our environmental impact through responsible sourcing, eco-friendly packaging, and carbon-offset shipping."
              icon="🌱"
            />
            <ValueCard
              title="Transparency"
              description="We believe in being open and honest with our customers about our products, pricing, and policies."
              icon="🔍"
            />
            <ValueCard
              title="Customer-First"
              description="Our customers are at the heart of everything we do. We're dedicated to providing exceptional service and support."
              icon="❤️"
            />
            <ValueCard
              title="Community"
              description="We believe in building strong relationships with our customers, suppliers, and the broader communities we serve."
              icon="🤝"
            />
          </div>

          {/* Team Section */}
          <div
            className={`${
              darkMode
                ? "bg-black/30"
                : "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
            } p-8 rounded-3xl shadow-2xl shadow-[#94bbe9] mb-16`}
          >
            <h2 className="text-3xl font-bold text-white mb-10 text-center">
              Meet Our Leadership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TeamMember
                name="Alex Johnson"
                role="Founder & CEO"
                bio="With over 15 years in tech and e-commerce, Alex leads our vision and strategy."
              />
              <TeamMember
                name="Sarah Chen"
                role="CTO"
                bio="Sarah oversees our technical operations and drives innovation across our platform."
              />
              <TeamMember
                name="Michael Rodriguez"
                role="Head of Customer Experience"
                bio="Michael ensures every customer interaction with PKG IT exceeds expectations."
              />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-gray-800 max-w-3xl mx-auto mb-10">
              We're always looking for passionate individuals to join our team
              and help us shape the future of e-commerce.
            </p>
            <a
              href="mailto:pkg-it@example.com"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/50 hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Write us by clicking here
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const ValueCard = ({ title, description, icon }) => {
  const { darkMode } = useContext(UIContext);
  return (
    <div
      className={`${
        darkMode
          ? "bg-black/30"
          : "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
      } p-6 rounded-xl shadow-lg hover:shadow-[#94bbe9] transition-all duration-300 transform hover:scale-105`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const TeamMember = ({ name, role, bio }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 overflow-hidden flex items-center justify-center text-white text-4xl font-bold">
        {name.charAt(0)}
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
      <p className="text-indigo-300 mb-3">{role}</p>
      <p className="text-gray-300">{bio}</p>
    </div>
  );
};

export default About;
