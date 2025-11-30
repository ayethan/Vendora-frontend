import React from 'react';

const blogPostsData = [
    {
      id: 1,
      image: '/img/gr-stocks-q8P8YoR6erg-unsplash.jpg',
      title: '5 Ways to Style Your Living Room for Spring',
      excerpt: 'As the seasons change, so does our desire to refresh our living spaces. Here are five simple ways to bring the freshness of spring into your living room.',
      link: '/blog/style-living-room-spring'
    },
    {
      id: 2,
      image: '/img/road-trip-with-raj-aa4sXii77zI-unsplash.jpg',
      title: 'The Ultimate Guide to Choosing the Right Gadgets',
      excerpt: 'Navigating the world of electronics can be daunting. Our guide helps you pick the perfect gadgets to fit your lifestyle and budget.',
      link: '/blog/guide-to-gadgets'
    },
    {
      id: 3,
      image: '/img/igor-bumba-rkaahInFlBg-unsplash.jpg',
      title: 'Healthy Eating: Quick and Easy Meal Prep Ideas',
      excerpt: 'Save time and eat healthier with our top meal prep ideas. These simple recipes are perfect for a busy week and taste delicious.',
      link: '/blog/healthy-eating-meal-prep'
    },
];

const BlogPostCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="w-full h-48 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
        <p className="text-gray-600 flex-grow mb-4">{post.excerpt}</p>
        <a href={post.link} className="font-semibold text-indigo-600 hover:text-indigo-800 self-start">
          Read More &rarr;
        </a>
      </div>
    </div>
);

const BlogSection = () => (
    <div className="bg-gray-50 py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">From Our Blog</h2>
          <p className="text-lg text-gray-600 mb-12">Get the latest tips, tricks, and inspiration.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {blogPostsData.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
);

export default BlogSection;