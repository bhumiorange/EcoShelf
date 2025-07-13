import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, Heart, Recycle, BarChart3, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  Smarter Shelves,
                </span>
                <br />
                <span className="text-white">Sustainable Retail</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Smart spoilage prediction to power sustainable retail operations and reduce food waste through AI-driven insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/predictor"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                Try the Predictor
                <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Learn More
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="group p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-emerald-500/30 transition-colors">
                  <TrendingDown className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Reduce Waste</h3>
                <p className="text-gray-300">Predict spoilage risk before it happens and take preventive action</p>
              </div>

              <div className="group p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-purple-500/30 transition-colors">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Analytics</h3>
                <p className="text-gray-300">Data-driven insights to optimize your inventory management</p>
              </div>

              <div className="group p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-500/30 transition-colors">
                  <Heart className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Sustainability</h3>
                <p className="text-gray-300">Contribute to a greener future with intelligent waste reduction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI analyzes multiple factors to predict spoilage risk and suggest optimal actions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Input Data</h3>
              <p className="text-gray-300">Enter product details, environment conditions, and sales data</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Analysis</h3>
              <p className="text-gray-300">Our ML model processes the data to predict spoilage risk</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Risk Assessment</h3>
              <p className="text-gray-300">Get color-coded risk levels: Low, Medium, or High</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Action Plan</h3>
              <p className="text-gray-300">Receive tailored suggestions to prevent waste</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="text-4xl font-bold text-emerald-400 mb-2">40%</div>
              <div className="text-gray-300">Reduction in food waste</div>
            </div>
            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="text-4xl font-bold text-purple-400 mb-2">25%</div>
              <div className="text-gray-300">Increase in profitability</div>
            </div>
            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">90%</div>
              <div className="text-gray-300">Prediction accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Retail Operation?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the sustainable retail revolution and start reducing waste today.
            </p>
            <Link
              to="/predictor"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;