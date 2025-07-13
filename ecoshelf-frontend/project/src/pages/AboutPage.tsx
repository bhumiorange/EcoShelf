import React from 'react';
import { Users, Target, Lightbulb, Zap, Database, Brain, Globe, Award } from 'lucide-react';

const AboutPage = () => {
  const timelineSteps = [
    {
      phase: 'Idea',
      title: 'Problem Identification',
      description: 'Recognized the massive food waste problem in retail',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      phase: 'Research',
      title: 'Data Collection',
      description: 'Gathered retail data and studied spoilage patterns',
      icon: Database,
      color: 'from-blue-500 to-purple-500'
    },
    {
      phase: 'Development',
      title: 'ML Model',
      description: 'Built and trained predictive algorithms',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    {
      phase: 'Launch',
      title: 'Platform Deployment',
      description: 'Created this user-friendly web interface',
      icon: Globe,
      color: 'from-emerald-500 to-blue-500'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'AI/ML Engineer',
      description: 'Specializes in machine learning and predictive analytics',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Full Stack Developer',
      description: 'Frontend and backend development expert',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Emily Johnson',
      role: 'Data Scientist',
      description: 'Retail analytics and sustainability research',
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'David Park',
      role: 'Product Manager',
      description: 'Strategy and business development',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const stats = [
    { value: '40%', label: 'Food Waste Reduction' },
    { value: '2.5M', label: 'Items Analyzed' },
    { value: '500+', label: 'Retailers Served' },
    { value: '90%', label: 'Prediction Accuracy' }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              About EcoShelf AI
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to revolutionize retail sustainability through intelligent food waste prediction and prevention
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Food waste is one of the world's most pressing environmental challenges. In retail alone, 
              millions of tons of food are wasted annually due to poor inventory management and inability 
              to predict spoilage effectively.
            </p>
            <p className="text-gray-300 leading-relaxed">
              EcoShelf AI combines cutting-edge machine learning with real-world retail data to provide 
              actionable insights that reduce waste, increase profitability, and contribute to a more 
              sustainable future.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Impact</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-medium text-emerald-400 mb-1">{step.phase}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </div>
                {index < timelineSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-purple-500"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300">
              A diverse group of innovators passionate about sustainability and technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6 text-center hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-emerald-500/50">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-emerald-400 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Technology Stack</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Machine Learning</h3>
                <p className="text-gray-300 text-sm">Advanced algorithms for accurate spoilage prediction</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Data Processing</h3>
                <p className="text-gray-300 text-sm">Real-time analysis of environmental and sales data</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Cloud Platform</h3>
                <p className="text-gray-300 text-sm">Scalable infrastructure for global retail operations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pb-20">
          <div className="bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Join the Sustainable Retail Revolution</h2>
            <p className="text-xl text-gray-300 mb-8">
              Ready to reduce waste and increase profitability? Let's build a more sustainable future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;