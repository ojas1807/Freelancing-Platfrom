import React from "react";
import { Search, Users, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Freelance Life 4.gif')" }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Find Your Perfect <span className="text-white">Freelance Match</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Connect with top talent or find your next gig on Hustlr. We make it easy to collaborate, create, and succeed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/whyus" 
                className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-full text-black font-semibold hover:bg-opacity-20 transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-16 border-4 border-white rounded-full flex justify-center"
          >
            <div className="w-2 h-4 bg-white rounded-full mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Hustlr?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-16">
              We've built the most powerful platform for freelancers and clients to connect and collaborate.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <motion.div variants={item}>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="w-16 h-16 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Easy to Find Work</h3>
                <p className="text-gray-400">
                  Browse thousands of job listings tailored to your skills and interests with our AI-powered matching system.
                </p>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="w-16 h-16 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Top-Tier Talent</h3>
                <p className="text-gray-400">
                  Access a global pool of vetted professionals with verified skills and portfolio for your projects.
                </p>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/10">
                <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Secure Payments</h3>
                <p className="text-gray-400">
                  Our escrow system with smart contracts ensures fair and timely payments for all parties.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "50K+", label: "Active Freelancers" },
              { number: "10K+", label: "Happy Clients" },
              { number: "200K+", label: "Projects Completed" },
              { number: "99%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div variants={item} key={index}>
                <div className="p-6 bg-gray-800 rounded-xl">
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">Works</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get started in just a few simple steps
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 -ml-px"></div>
            
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {[
                { 
                  title: "Create an Account", 
                  description: "Sign up in less than a minute as a freelancer or client.",
                  step: 1,
                  position: "left"
                },
                { 
                  title: "Post or Find a Job", 
                  description: "Clients can post projects and freelancers can browse opportunities.",
                  step: 2,
                  position: "right"
                },
                { 
                  title: "Collaborate", 
                  description: "Use our built-in tools to communicate and work together seamlessly.",
                  step: 3,
                  position: "left"
                },
                { 
                  title: "Get Paid", 
                  description: "Secure payments released when work is completed to your satisfaction.",
                  step: 4,
                  position: "right"
                }
              ].map((item, index) => (
                <motion.div 
                  variants={item.position === 'left' ? 
                    { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } } : 
                    { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } }
                  }
                  key={index}
                  className={`relative ${item.position === 'left' ? 'lg:pr-10' : 'lg:pl-10'}`}
                >
                  <div className={`absolute top-0 ${item.position === 'left' ? '-right-4 lg:right-auto lg:-left-4' : '-left-4 lg:left-auto lg:-right-4'} w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold z-10`}>
                    {item.step}
                  </div>
                  <div className={`p-8 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 ${item.position === 'left' ? 'lg:mr-8' : 'lg:ml-8'}`}>
                    <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Users Say</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                quote: "Hustlr transformed my freelance career. I've doubled my income in just 6 months!",
                name: "Sarah Johnson",
                role: "Graphic Designer"
              },
              {
                quote: "As a startup, finding quality talent was challenging until we discovered Hustlr.",
                name: "Michael Chen",
                role: "Tech Startup Founder"
              },
              {
                quote: "The payment protection gives me peace of mind that I'll get paid for my work.",
                name: "David Rodriguez",
                role: "Web Developer"
              }
            ].map((testimonial, index) => (
              <motion.div variants={item} key={index}>
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <div className="text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="inline w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Start Your Freelance Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of freelancers and businesses already using Hustlr to grow their careers and businesses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/signup" 
                  className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  Create Your Account
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/demo" 
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  Watch Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}