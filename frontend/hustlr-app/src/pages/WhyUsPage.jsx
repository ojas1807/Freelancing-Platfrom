import { motion } from "framer-motion";
import { Rocket, ShieldCheck, TrendingUp, Users, Zap, Award, MessageSquare, Clock } from "lucide-react";

const WhyUsPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-400" />,
      title: "Smart Job Matching",
      description: "Our AI-powered recommendation system connects freelancers with projects that truly match their skills and preferences."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
      title: "Secure Payments",
      description: "Escrow-based payment system ensures freelancers get paid on time and clients only pay for satisfactory work."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Growth Tools",
      description: "Built-in analytics and insights help freelancers track their progress and identify growth opportunities."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Talent Network",
      description: "Clients gain access to a vetted community of skilled professionals across various industries."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "Quick Hiring",
      description: "Streamlined hiring process reduces time-to-hire by 60% compared to traditional platforms."
    },
    {
      icon: <Award className="w-8 h-8 text-green-400" />,
      title: "Quality Assurance",
      description: "Our rating system and portfolio verification ensure you're working with top-tier talent."
    }
  ];

  const stats = [
    { value: "3x", label: "Faster Hiring" },
    { value: "85%", label: "Project Success Rate" },
    { value: "24/7", label: "Support Available" },
    { value: "100%", label: "Payment Protection" }
  ];

  const creators = [
    { name: "Pritam Ninganaik", role: "Full Stack Developer" },
    { name: "Shreyash Narvekar", role: "UI/UX Designer" },
    { name: "Ojas Patrikar", role: "Backend Architect" },
    { name: "Radhika Lakhani", role: "Product Manager" }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Why Choose Hustlr?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing the freelancing ecosystem with smart technology and human-centered design
          </p>
        </motion.section>

        {/* Problem Statement */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-8 mb-16 border border-gray-700"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">The Freelancing Challenge</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 mt-1 text-blue-400" />
                  <div>
                    <h3 className="font-medium text-white">For Freelancers</h3>
                    <p className="text-gray-400">
                      Finding relevant jobs, managing multiple projects, and ensuring timely payments 
                      are constant struggles in today's fragmented market.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-1 text-purple-400" />
                  <div>
                    <h3 className="font-medium text-white">For Clients</h3>
                    <p className="text-gray-400">
                      Identifying skilled professionals who match specific requirements is time-consuming 
                      and often leads to mismatched expectations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Solution */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">The Hustlr Solution</h2>
            <p className="text-gray-400 mb-8">
              We're bridging the gap with a platform that combines intelligent matching, structured project 
              management, and secure payments - all wrapped in an intuitive interface.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 bg-opacity-20 rounded-lg flex items-center justify-center mb-6 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-8 mb-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-8">By The Numbers</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4"
                >
                  <p className="text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center text-white mb-8">Meet The Creators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {creators.map((creator, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {creator.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{creator.name}</h3>
                  <p className="text-gray-400">{creator.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Ready to Transform Your Freelancing Experience?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of freelancers and clients who are already benefiting from Hustlr's innovative platform.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-8 rounded-md font-medium transition-all shadow-lg shadow-blue-500/20"
          >
            Get Started Now
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
};

export default WhyUsPage;