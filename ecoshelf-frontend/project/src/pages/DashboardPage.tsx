import React, { useState } from 'react';
// lucide-react 
import { 
  Package, AlertTriangle, TrendingUp, DollarSign, Clock, 
  Plus, Edit, Trash2, Download, Filter, Search, Bell 
} from 'lucide-react';

// recharts 
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line
} from 'recharts';

interface InventoryItem {
  id: string;
  product_name: string;
  category: string;
  sales_per_day: number;
  shelf_life_days: number;
  days_on_shelf: number;
  temperature: number;
  wastage_risk: number;
  location: string;
  quantity: number;
  price: number;
  supplier: string;
  batch_number: string;
  expiry_date: string;
}
interface Alert {
  id: string;
  message: string;
}

const DashboardPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterRisk, setFilterRisk] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<InventoryItem | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<InventoryItem | null>(null);
  const [showRestockModal, setShowRestockModal] = useState<InventoryItem | null>(null);

  // Sample data based on your dataset
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: '1',
      product_name: 'Bread',
      category: 'Bakery',
      sales_per_day: 62,
      shelf_life_days: 21,
      days_on_shelf: 0,
      temperature: 25.4,
      wastage_risk: 0,
      location: 'Shelf A-1',
      quantity: 45,
      price: 3.99,
      supplier: 'Local Bakery',
      batch_number: 'LB-2025-001',
      expiry_date: '2025-01-30'
    },
    {
      id: '2',
      product_name: 'Lettuce',
      category: 'Vegetable',
      sales_per_day: 47,
      shelf_life_days: 23,
      days_on_shelf: 6,
      temperature: 11.4,
      wastage_risk: 0,
      location: 'Shelf A-2',
      quantity: 32,
      price: 2.49,
      supplier: 'Fresh Greens Co',
      batch_number: 'FG-2025-045',
      expiry_date: '2025-01-25'
    },
    {
      id: '3',
      product_name: 'Chicken',
      category: 'Meat',
      sales_per_day: 16,
      shelf_life_days: 3,
      days_on_shelf: 2,
      temperature: 7.7,
      wastage_risk: 1,
      location: 'Shelf C-1',
      quantity: 8,
      price: 12.99,
      supplier: 'Premium Meats',
      batch_number: 'PM-2025-089',
      expiry_date: '2025-01-11'
    },
    {
      id: '4',
      product_name: 'Cheese',
      category: 'Dairy',
      sales_per_day: 29,
      shelf_life_days: 20,
      days_on_shelf: 4,
      temperature: 14.8,
      wastage_risk: 0,
      location: 'Shelf A-1',
      quantity: 25,
      price: 8.99,
      supplier: 'Dairy Fresh',
      batch_number: 'DF-2025-234',
      expiry_date: '2025-01-28'
    },
    {
      id: '5',
      product_name: 'Apple',
      category: 'Fruit',
      sales_per_day: 95,
      shelf_life_days: 29,
      days_on_shelf: 16,
      temperature: 13,
      wastage_risk: 0,
      location: 'Shelf A-2',
      quantity: 67,
      price: 4.99,
      supplier: 'Orchard Fresh',
      batch_number: 'OF-2025-156',
      expiry_date: '2025-02-05'
    }
  ]);

  const [newItem, setNewItem] = useState({
    product_name: '',
    category: '',
    sales_per_day: '',
    shelf_life_days: '',
    temperature: '',
    location: '',
    quantity: '',
    price: '',
    supplier: '',
    expiry_date: ''
  });

  const categories = ['All', 'Bakery', 'Vegetable', 'Meat', 'Dairy', 'Fruit', 'Snacks'];
  const riskLevels = ['All', 'Low Risk', 'High Risk'];

  const getRiskLevel = (wastage_risk: number) => {
    return wastage_risk === 1 ? 'High Risk' : 'Low Risk';
  };

  const getRiskColor = (wastage_risk: number) => {
    return wastage_risk === 1 
      ? 'border-red-500 bg-red-500/10 text-red-400'
      : 'border-green-500 bg-green-500/10 text-green-400';
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expiryDate: string) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days <= 0) return { status: 'Expired', color: 'text-red-400' };
    if (days <= 3) return { status: 'Expires Soon', color: 'text-orange-400' };
    if (days <= 7) return { status: 'Expires This Week', color: 'text-yellow-400' };
    return { status: 'Fresh', color: 'text-green-400' };
  };

  // Analytics data
  const wasteData = [
    { name: 'Mon', prevented: 24, actual: 8 },
    { name: 'Tue', prevented: 31, actual: 12 },
    { name: 'Wed', prevented: 28, actual: 6 },
    { name: 'Thu', prevented: 35, actual: 15 },
    { name: 'Fri', prevented: 42, actual: 9 },
    { name: 'Sat', prevented: 38, actual: 11 },
    { name: 'Sun', prevented: 29, actual: 7 }
  ];

  const categoryData = [
    { name: 'Dairy', value: 35, color: '#10B981' },
    { name: 'Vegetables', value: 28, color: '#3B82F6' },
    { name: 'Fruits', value: 22, color: '#8B5CF6' },
    { name: 'Bakery', value: 15, color: '#F59E0B' }
  ];

  const revenueImpactData = [
    { month: 'Jan', saved: 2450, lost: 890, net: 1560 },
    { month: 'Feb', saved: 3120, lost: 760, net: 2360 },
    { month: 'Mar', saved: 2890, lost: 920, net: 1970 },
    { month: 'Apr', saved: 3560, lost: 680, net: 2880 },
    { month: 'May', saved: 4230, lost: 540, net: 3690 },
    { month: 'Jun', saved: 3980, lost: 710, net: 3270 }
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || filterCategory === 'All' || item.category === filterCategory;
    const matchesRisk = !filterRisk || filterRisk === 'All' || 
                       (filterRisk === 'High Risk' && item.wastage_risk === 1) ||
                       (filterRisk === 'Low Risk' && item.wastage_risk === 0);
    
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const stats = {
    totalItems: inventoryItems.reduce((sum, item) => sum + item.quantity, 0),
    highRiskItems: inventoryItems.filter(item => item.wastage_risk === 1).length,
    expiringSoon: inventoryItems.filter(item => getDaysUntilExpiry(item.expiry_date) <= 3).length,
    totalValue: inventoryItems.reduce((sum, item) => sum + (item.quantity * item.price), 0),
    avgSalesPerDay: Math.round(inventoryItems.reduce((sum, item) => sum + item.sales_per_day, 0) / inventoryItems.length),
    wasteReduction: 42
  };

  const handleAddItem = () => {
    if (!newItem.product_name || !newItem.category) return;
    
    const item: InventoryItem = {
      id: Date.now().toString(),
      product_name: newItem.product_name,
      category: newItem.category,
      sales_per_day: parseInt(newItem.sales_per_day) || 0,
      shelf_life_days: parseInt(newItem.shelf_life_days) || 7,
      days_on_shelf: 0,
      temperature: parseFloat(newItem.temperature) || 20,
      wastage_risk: 0,
      location: newItem.location || 'Shelf A-1',
      quantity: parseInt(newItem.quantity) || 1,
      price: parseFloat(newItem.price) || 0,
      supplier: newItem.supplier || 'Unknown',
      batch_number: `BN-${Date.now()}`,
      expiry_date: newItem.expiry_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setInventoryItems([...inventoryItems, item]);
    setNewItem({
      product_name: '',
      category: '',
      sales_per_day: '',
      shelf_life_days: '',
      temperature: '',
      location: '',
      quantity: '',
      price: '',
      supplier: '',
      expiry_date: ''
    });
    setShowAddModal(false);
  };

  const handleEditItem = (updatedItem: InventoryItem) => {
    setInventoryItems(inventoryItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setShowEditModal(null);
  };

  const handleDeleteItem = (itemId: string) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== itemId));
    setShowDeleteModal(null);
  };

  const handleRestockItem = (itemId: string, additionalQuantity: number) => {
    setInventoryItems(inventoryItems.map(item => 
      item.id === itemId 
        ? { ...item, quantity: item.quantity + additionalQuantity, days_on_shelf: 0 }
        : item
    ));
    setShowRestockModal(null);
  };

  const getRecentAlerts = () => {
    const alerts = [];
    
    inventoryItems.forEach(item => {
      const daysUntilExpiry = getDaysUntilExpiry(item.expiry_date);
      
      if (item.wastage_risk === 1) {
        alerts.push({
          id: item.id,
          type: 'high-risk',
          message: `${item.product_name} is at high wastage risk`,
          severity: 'critical',
          time: '2 hours ago',
          action: 'Apply discount or donate'
        });
      }
      
      if (daysUntilExpiry <= 3 && daysUntilExpiry > 0) {
        alerts.push({
          id: item.id,
          type: 'expiry',
          message: `${item.product_name} expires in ${daysUntilExpiry} days`,
          severity: 'high',
          time: '1 hour ago',
          action: 'Apply 20% discount'
        });
      }
      
      if (item.quantity <= 5) {
        alerts.push({
          id: item.id,
          type: 'low-stock',
          message: `${item.product_name} is low in stock (${item.quantity} left)`,
          severity: 'medium',
          time: '3 hours ago',
          action: 'Reorder inventory'
        });
      }
    });
    
    return alerts.slice(0, 4);
  };

  const recentAlerts = getRecentAlerts();

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard & Analytics</h1>
            <p className="text-gray-300">Real-time insights and comprehensive analytics for your retail operations</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="today" className="bg-gray-800">Today</option>
              <option value="week" className="bg-gray-800">This Week</option>
              <option value="month" className="bg-gray-800">This Month</option>
            </select>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="h-4 w-4 mr-2 inline" />
              Export
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2 inline" />
              Add Item
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="h-6 w-6 text-blue-400" />
              <span className="text-2xl font-bold text-white">{stats.totalItems}</span>
            </div>
            <p className="text-gray-300 text-sm">Total Items</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <span className="text-2xl font-bold text-white">{stats.highRiskItems}</span>
            </div>
            <p className="text-gray-300 text-sm">High Risk</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-6 w-6 text-orange-400" />
              <span className="text-2xl font-bold text-white">{stats.expiringSoon}</span>
            </div>
            <p className="text-gray-300 text-sm">Expiring Soon</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-6 w-6 text-emerald-400" />
              <span className="text-2xl font-bold text-white">${stats.totalValue.toFixed(0)}</span>
            </div>
            <p className="text-gray-300 text-sm">Total Value</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <span className="text-2xl font-bold text-white">{stats.avgSalesPerDay}</span>
            </div>
            <p className="text-gray-300 text-sm">Avg Sales/Day</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <span className="text-2xl font-bold text-white">{stats.wasteReduction}%</span>
            </div>
            <p className="text-gray-300 text-sm">Waste Reduction</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Waste Prevention Chart */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Waste Prevention This Week</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Bar dataKey="prevented" fill="#10B981" name="Waste Prevented (kg)" />
                <Bar dataKey="actual" fill="#EF4444" name="Actual Waste (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Impact */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Revenue Impact</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueImpactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Line type="monotone" dataKey="saved" stroke="#10B981" strokeWidth={3} name="Revenue Saved" />
                <Line type="monotone" dataKey="lost" stroke="#EF4444" strokeWidth={3} name="Revenue Lost" />
                <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={3} name="Net Impact" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
            
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {riskLevels.map(risk => (
                <option key={risk} value={risk === 'All' ? '' : risk} className="bg-gray-800">
                  {risk}
                </option>
              ))}
            </select>
            
            <button className="px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
              <Filter className="h-4 w-4 mr-2 inline" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Inventory Table & Recent Alerts */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Inventory Table */}
          <div className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Inventory Items</h3>
            </div>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-medium">Product</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Category</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Qty</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Risk</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Expiry</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => {
                    const expiryStatus = getExpiryStatus(item.expiry_date);
                    
                    return (
                      <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div>
                            <h4 className="text-white font-medium">{item.product_name}</h4>
                            <p className="text-gray-400 text-sm">{item.supplier}</p>
                          </div>
                        </td>
                        <td className="p-4 text-gray-300">{item.category}</td>
                        <td className="p-4 text-white">{item.quantity}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs border ${getRiskColor(item.wastage_risk)}`}>
                            {getRiskLevel(item.wastage_risk)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-white text-sm">{new Date(item.expiry_date).toLocaleDateString()}</div>
                          <div className={`text-xs ${expiryStatus.color}`}>
                            {expiryStatus.status}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => setShowRestockModal(item)}
                              className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                              title="Restock"
                            >
                              <Package className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setShowEditModal(item)}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setShowDeleteModal(item)}
                              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Recent Alerts</h3>
              <Bell className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg border border-white/10 bg-white/5">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white text-sm font-medium">{alert.message}</p>
                    <span className="text-gray-400 text-xs flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs mb-2">Suggested: {alert.action}</p>
                  <button className="text-emerald-400 text-xs hover:text-emerald-300 transition-colors">
                    Take Action →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Add New Item</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newItem.product_name}
                    onChange={(e) => setNewItem({...newItem, product_name: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">Select category</option>
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Supplier</label>
                  <input
                    type="text"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Location</label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Sales Per Day</label>
                  <input
                    type="number"
                    value={newItem.sales_per_day}
                    onChange={(e) => setNewItem({...newItem, sales_per_day: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Shelf Life (days)</label>
                  <input
                    type="number"
                    value={newItem.shelf_life_days}
                    onChange={(e) => setNewItem({...newItem, shelf_life_days: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Temperature (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newItem.temperature}
                    onChange={(e) => setNewItem({...newItem, temperature: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={newItem.expiry_date}
                    onChange={(e) => setNewItem({...newItem, expiry_date: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={handleAddItem}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Add Item
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Edit Item</h3>
                <button 
                  onClick={() => setShowEditModal(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Product Name</label>
                  <input
                    type="text"
                    value={showEditModal.product_name}
                    onChange={(e) => setShowEditModal({...showEditModal, product_name: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Quantity</label>
                  <input
                    type="number"
                    value={showEditModal.quantity}
                    onChange={(e) => setShowEditModal({...showEditModal, quantity: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={showEditModal.price}
                    onChange={(e) => setShowEditModal({...showEditModal, price: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Location</label>
                  <input
                    type="text"
                    value={showEditModal.location}
                    onChange={(e) => setShowEditModal({...showEditModal, location: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={() => handleEditItem(showEditModal)}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setShowEditModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/20 p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete "{showDeleteModal.product_name}"? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleDeleteItem(showDeleteModal.id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button 
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Restock Modal */}
        {showRestockModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/20 p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">Restock Item</h3>
              <p className="text-gray-300 mb-4">
                Current stock: {showRestockModal.quantity} units
              </p>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm mb-2">Additional Quantity</label>
                <input
                  type="number"
                  min="1"
                  defaultValue="10"
                  id="restock-quantity"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    const quantity = parseInt((document.getElementById('restock-quantity') as HTMLInputElement).value);
                    handleRestockItem(showRestockModal.id, quantity);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Restock
                </button>
                <button 
                  onClick={() => setShowRestockModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;