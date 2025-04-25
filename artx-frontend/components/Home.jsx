import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const demoImages = [
  'https://res.cloudinary.com/du8gekexh/image/upload/v1745572607/nxrex8tdtlkfhz8y9tww.png',
  'https://res.cloudinary.com/du8gekexh/image/upload/v1745574099/ir0fp46dwpljgfptdqn1.png',
  'https://res.cloudinary.com/du8gekexh/image/upload/v1745574425/nw4tpzpydel5osigaols.png',
  'https://res.cloudinary.com/du8gekexh/image/upload/v1745572706/iwdswvgkgjpftchnutgc.png',
  'https://res.cloudinary.com/du8gekexh/image/upload/v1745573920/jeuaj1lmolt0azhew6bp.png',
  'https://res.cloudinary.com/du8gekexh/image/upload/v1745574264/nzahiqz439nepuvjn9qq.png',
];

function Home() {
  return (
    <div
      className="flex flex-col bg-white text-gray-800 min-h-screen"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Hero Section */}
      <section className="flex flex-col h-[calc(100vh-64px)] items-center justify-center text-center px-6 pb-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            ArtX
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-gray-600 mb-8">
          Create stunning AI-generated art from simple text prompts — fast, fun, and free to start.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/generate"
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl transition duration-300"
          >
            🎨 Generate Now
          </Link>
        </motion.div>
      </section>

      {/* AI Generated Images Section */}
      <section className="pt-20 pb-15 px-6 bg-neutral-900 text-white">
        <h2 className="text-3xl font-bold text-center mb-10">Explore AI-Generated Art</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {demoImages.map((src, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-xl shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={src}
                alt={`AI Generated ${index}`}
                className="object-cover w-full h-full shadow-2xs rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              />
            </motion.div>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='mt-15 text-center'>
          <Link
            to="/gallary"
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl transition duration-300"
          >
            ✨ Visit Gallary
          </Link>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 w-full px-6">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              name: 'Sarah J.',
              quote: 'This app is magic! I’ve created so many cool images from simple ideas.',
            },
            {
              name: 'David M.',
              quote: 'ArtX has changed how I create content. Super intuitive and powerful!',
            },
            {
              name: 'Lina W.',
              quote: 'I use it every day for my blog and social media. Love the credit system too.',
            },
          ].map(({ name, quote }) => (
            <div key={name} className="bg-white p-6 rounded-xl shadow-md">
              <p className="italic mb-2">“{quote}”</p>
              <p className="font-semibold text-indigo-600">– {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 text-center text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} ArtX. Built with ❤️ using AI.
      </footer>
    </div>
  );
}

export default Home;
