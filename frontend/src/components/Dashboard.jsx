import React from 'react';

function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-neutralBlack mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-secondary mb-2">Weather Forecast</h2>
          <p className="text-neutralBlack">Sunny, 28°C</p>
          <p className="text-neutralBlack">Rain expected tomorrow</p>
        </div>
        <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-secondary mb-2">Market Prices</h2>
          <p className="text-neutralBlack">Rice: $0.50/kg</p>
          <p className="text-neutralBlack">Wheat: $0.30/kg</p>
        </div>
        <div className="bg-neutralWhite p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-secondary mb-2">Crop Recommendations</h2>
          <p className="text-neutralBlack">Best: Maize</p>
          <p className="text-neutralBlack">Alternative: Soybean</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;