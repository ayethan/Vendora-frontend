import React from 'react';
import { Building, Target, BookOpen, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Founder & CEO',
    bio: 'Jane is the visionary behind Vendora, driven by a passion for creating seamless online shopping experiences.',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'John Smith',
    role: 'Chief Technology Officer',
    bio: 'John leads our tech team, ensuring Vendora stays at the forefront of innovation with a robust and scalable platform.',
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Emily White',
    role: 'Head of Marketing',
    bio: 'Emily crafts the stories that connect our brand with customers, building a community around our products.',
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Michael Brown',
    role: 'Operations Manager',
    bio: 'Michael ensures that every order is processed smoothly and efficiently, from checkout to delivery.',
    image: 'https://i.pravatar.cc/150?img=4',
  },
];

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <Building className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            About Vendora
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            We are a passionate team dedicated to bringing you the best products with an unparalleled shopping experience.
          </p>
        </div>
      </div>

      {/* Our Mission & Story Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="p-8 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-500 text-white mb-5">
              <Target size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to simplify the online marketplace by curating high-quality products and offering them at fair prices. We strive to build a trustworthy platform where customers can shop with confidence and ease, knowing they are getting the best value and service.
            </p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white mb-5">
              <BookOpen size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2023, Vendora started as a small project to solve a big problem: the overwhelming and often misleading online retail space. We envisioned a single destination for quality and transparency. Today, we've grown into a thriving marketplace, serving thousands of happy customers daily.
            </p>
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600">The passionate people behind our success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                  className="mx-auto h-32 w-32 rounded-full mb-4 object-cover ring-4 ring-white"
                  src={member.image}
                  alt={member.name}
                />
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-md text-red-500 font-semibold">{member.role}</p>
                <p className="mt-2 text-sm text-gray-600">{member.bio}</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-blue-600 rounded-2xl shadow-xl text-white text-center p-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Start Shopping?</h2>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">
            Explore our curated collections and find something you'll love.
          </p>
          <a
            href="/product"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition-transform duration-300 transform hover:scale-105"
          >
            Browse Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
