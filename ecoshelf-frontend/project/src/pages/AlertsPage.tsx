import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, X, Bell, Filter, Search, Calendar } from 'lucide-react';

interface Alert {
  id: string;
  type: 'expiry' | 'temperature' | 'stock' | 'donation' | 'system';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  location: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  suggestedAction: string;
  affectedItems?: number;
}

const AlertsPage = () => {
  const [filterSeverity, setFilterSeverity] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'expiry',
      severity: 'critical',
      title: 'Critical Expiry Alert',
      message: 'Dairy products in Shelf A-3 expire today',
      location: 'Shelf A-3',
      timestamp: '2025-01-09T10:30:00Z',
      status: 'active',
      suggestedAction: 'Apply 30% discount immediately or donate to NGO',
      affectedItems: 12
    },
    {
      id: '2',
      type: 'temperature',
      severity: 'high',
      title: 'Temperature Spike Detected',
      message: 'Frozen section temperature rose to -10°C',
      location: 'Frozen Section',
      timestamp: '2025-01-09T09:15:00Z',
      status: 'acknowledged',
      suggestedAction: 'Check cooling system and move items to backup freezer',
      affectedItems: 45
    },
    {
      id: '3',
      type: 'stock',
      severity: 'medium',
      title: 'Low Stock Warning',
      message: 'Organic vegetables below minimum threshold',
      location: 'Shelf A-2',
      timestamp: '2025-01-09T08:45:00Z',
      status: 'active',
      suggestedAction: 'Reorder from supplier within 24 hours',
      affectedItems: 8
    },
    {
      id: '4',
      type: 'donation',
      severity: 'low',
      title: 'Donation Opportunity',
      message: 'Bakery items suitable for donation available',
      location: 'Shelf B-1',
      timestamp: '2025-01-09T07:20:00Z',
      status: 'resolved',
      suggestedAction: 'Contact local food bank for pickup',
      affectedItems: 15
    },
    {
      id: '5',
      type: 'system',
      severity: 'medium',
      title: 'Sensor Malfunction',
      message: 'Humidity sensor in produce section not responding',
      location: 'Produce Section',
      timestamp: '2025-01-09T06:00:00Z',
      status: 'active',
      suggestedAction: 'Replace sensor and calibrate system',
      affectedItems: 0
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10 text-red-400';
      case 'high': return 'border-orange-500 bg-orange-500/10 text-orange-400';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      case 'low': return 'border-blue-500 bg-blue-500/10 text-blue-400';
      default: return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'expiry': return <Clock className="h-5 w-5" />;
      case 'temperature': return <AlertTriangle className="h-5 w-5" />;
      case 'stock': return <CheckCircle className="h-5 w-5" />;
      case 'donation': return <Bell className="h-5 w-5" />;
      case 'system': return <X className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-500/20 text-red-400';
      case 'acknowledged': return 'bg-yellow-500/20 text-yellow-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = !filterSeverity || alert.severity === filterSeverity;
    const matchesType = !filterType || alert.type === filterType;
    const matchesStatus = !filterStatus || alert.status === filterStatus;
    
    return matchesSearch && matchesSeverity && matchesType && matchesStatus;
  });

  const stats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    resolved: alerts.filter(a => a.status === 'resolved').length
  };

  const handleAcknowledge = (alertId: string) => {
    // Handle acknowledge action
    console.log('Acknowledging alert:', alertId);
  };

  const handleResolve = (alertId: string) => {
    // Handle resolve action
    console.log('Resolving alert:', alertId);
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Alerts & Notifications</h1>
            <p className="text-gray-300">Monitor critical events and take immediate action</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              <Bell className="h-4 w-4 mr-2 inline" />
              Mark All Read
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-6 w-6 text-blue-400" />
              <span className="text-2xl font-bold text-white">{stats.total}</span>
            </div>
            <p className="text-gray-300 text-sm">Total Alerts</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <Bell className="h-6 w-6 text-red-400" />
              <span className="text-2xl font-bold text-white">{stats.active}</span>
            </div>
            <p className="text-gray-300 text-sm">Active Alerts</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <X className="h-6 w-6 text-orange-400" />
              <span className="text-2xl font-bold text-white">{stats.critical}</span>
            </div>
            <p className="text-gray-300 text-sm">Critical</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-2xl font-bold text-white">{stats.resolved}</span>
            </div>
            <p className="text-gray-300 text-sm">Resolved</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="" className="bg-gray-800">All Severities</option>
              <option value="critical" className="bg-gray-800">Critical</option>
              <option value="high" className="bg-gray-800">High</option>
              <option value="medium" className="bg-gray-800">Medium</option>
              <option value="low" className="bg-gray-800">Low</option>
            </select>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="" className="bg-gray-800">All Types</option>
              <option value="expiry" className="bg-gray-800">Expiry</option>
              <option value="temperature" className="bg-gray-800">Temperature</option>
              <option value="stock" className="bg-gray-800">Stock</option>
              <option value="donation" className="bg-gray-800">Donation</option>
              <option value="system" className="bg-gray-800">System</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="" className="bg-gray-800">All Statuses</option>
              <option value="active" className="bg-gray-800">Active</option>
              <option value="acknowledged" className="bg-gray-800">Acknowledged</option>
              <option value="resolved" className="bg-gray-800">Resolved</option>
            </select>
            
            <button className="px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              <Filter className="h-4 w-4 mr-2 inline" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={`p-6 rounded-2xl border backdrop-blur-sm ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{alert.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(alert.status)}`}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>📍 {alert.location}</span>
                      {alert.affectedItems && alert.affectedItems > 0 && (
                        <span>📦 {alert.affectedItems} items affected</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {alert.status === 'active' && (
                    <>
                      <button 
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm hover:bg-yellow-500/30 transition-colors"
                      >
                        Acknowledge
                      </button>
                      <button 
                        onClick={() => handleResolve(alert.id)}
                        className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30 transition-colors"
                      >
                        Resolve
                      </button>
                    </>
                  )}
                  {alert.status === 'acknowledged' && (
                    <button 
                      onClick={() => handleResolve(alert.id)}
                      className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30 transition-colors"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">Suggested Action:</h4>
                <p className="text-gray-300 text-sm">{alert.suggestedAction}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Alerts Found</h3>
            <p className="text-gray-300">All systems are running smoothly or no alerts match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;