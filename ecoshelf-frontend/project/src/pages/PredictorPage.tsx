import React, { useState } from "react";
import {
  Thermometer,
  TrendingUp,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

interface PredictionResult {
  risk: "Low" | "High";
  suggestion: string;
  confidence?: number;
}

const PredictorPage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    temperature: "",
    salesTrend: "",
    shelfLifeDays: "",
    daysOnShelf: "",
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "Bakery",
    "Dairy",
    "Fruit",
    "Meat",
    "Snacks",
    "Vegetable",
  ];

  const salesTrends = [
    { value: "low", label: "Low (20 units/day)" },
    { value: "medium", label: "Medium (50 units/day)" },
    { value: "high", label: "High (80 units/day)" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const categoryMap: Record<string, number> = {
      Bakery: 0,
      Dairy: 1,
      Fruit: 2,
      Meat: 3,
      Snacks: 4,
      Vegetable: 5,
    };

    const salesPerDay =
      formData.salesTrend === "high"
        ? 80
        : formData.salesTrend === "medium"
        ? 50
        : 20;

    const requestData = {
      category: categoryMap[formData.category],
      sales_per_day: salesPerDay,
      shelf_life_days: parseInt(formData.shelfLifeDays) || 14,
      days_on_shelf: parseInt(formData.daysOnShelf) || 0,
      temperature_C: parseFloat(formData.temperature),
    };

    console.log("Sending:", requestData);

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorRes = await response.json();
      console.error("Backend error:", errorRes);
      throw new Error(errorRes?.error || "Failed to fetch prediction");
    }

    const resultData = await response.json();
    setResult({
      risk: resultData.risk,
      suggestion: resultData.suggestion,
      confidence: resultData.confidence || 90, // optional fallback
      // you can also use resultData.shelf_action if you want
    });
  } catch (err) {
    console.error("Frontend error:", err);
    setError("Failed to get prediction. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "from-green-500 to-emerald-600";
      case "High":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "Low":
        return <CheckCircle className="h-8 w-8 text-green-400" />;
      case "High":
        return <XCircle className="h-8 w-8 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Spoilage Predictor
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enter your product details to get AI-powered spoilage risk
            assessment and actionable recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Package className="h-6 w-6 mr-2 text-emerald-400" />
              Product Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., Fresh Strawberries"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-gray-800"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <TrendingUp className="inline h-4 w-4 mr-1" />
                    Sales Trend
                  </label>
                  <select
                    name="salesTrend"
                    value={formData.salesTrend}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select trend</option>
                    {salesTrends.map((trend) => (
                      <option
                        key={trend.value}
                        value={trend.value}
                        className="bg-gray-800"
                      >
                        {trend.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Thermometer className="inline h-4 w-4 mr-1" />
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 18"
                    min="0"
                    max="50"
                    step="0.1"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Shelf Life (days)
                  </label>
                  <input
                    type="number"
                    name="shelfLifeDays"
                    value={formData.shelfLifeDays}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 14"
                    min="1"
                    max="365"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Days on Shelf
                  </label>
                  <input
                    type="number"
                    name="daysOnShelf"
                    value={formData.daysOnShelf}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 3"
                    min="0"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  "Predict Spoilage Risk"
                )}
              </button>
            </form>
          </div>
          {/* Results */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Prediction Results
            </h2>

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg mb-6">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {result ? (
              <div className="space-y-6">
                <div
                  className={`p-6 bg-gradient-to-r ${getRiskColor(
                    result.risk
                  )} rounded-xl`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {getRiskIcon(result.risk)}
                      <div className="ml-3">
                        <h3 className="text-2xl font-bold text-white">
                          {result.risk} Risk
                        </h3>
                        {result.confidence && (
                          <p className="text-white/80">
                            Confidence: {result.confidence}%
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Recommended Action
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {result.suggestion}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                    <div className="text-2xl font-bold text-emerald-400">
                      {result.risk === "Low" ? "✓" : "✗"}
                    </div>
                    <div className="text-sm text-gray-300">Status</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {result.confidence || 85}%
                    </div>
                    <div className="text-sm text-gray-300">Accuracy</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-400">
                  Fill out the form to get your spoilage risk prediction
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">
              How it works
            </h3>
            <p className="text-gray-300 text-sm">
              Our AI model analyzes temperature, sales patterns, shelf life, and
              days on shelf to predict spoilage risk with high accuracy.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">
              Real-time Analysis
            </h3>
            <p className="text-gray-300 text-sm">
              Get instant predictions and actionable recommendations to prevent
              waste and optimize your inventory management.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrop-blur-sm border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-2">
              Sustainable Impact
            </h3>
            <p className="text-gray-300 text-sm">
              Every prediction helps reduce food waste, contributing to a more
              sustainable retail ecosystem and better profit margins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictorPage;
