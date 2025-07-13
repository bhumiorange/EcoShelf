import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, LayoutDashboard, Package, AlertTriangle, BarChart3, Users, Brain } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Leaf },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/predictor', label: 'Predictor', icon: Brain },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
    { path: '/about', label: 'About', icon: Users },
  ];

  return (
    <nav className="relative z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-purple-500/10 backdrop-blur-xl border-b border-white/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
              <Leaf className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="text-xl font-bold text-white">EcoShelf AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path) 
                      ? 'text-emerald-400 bg-emerald-500/20' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/50 backdrop-blur-xl rounded-lg mt-2 border border-white/10">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.path) 
                        ? 'text-emerald-400 bg-emerald-500/20' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;