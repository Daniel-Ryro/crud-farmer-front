import React, { useState, useEffect } from 'react';
import { getProducersRural } from '../services/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [farmsCount, setFarmsCount] = useState(0);
  const [totalHectares, setTotalHectares] = useState(0);
  const [stateData, setStateData] = useState([]);
  const [cultureData, setCultureData] = useState([]);
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const producers = await getProducersRural();
    const farms = producers.length;
    setFarmsCount(farms);

    const hectaresSum = producers.reduce((sum, producer) => sum + parseFloat(producer.total_hectares), 0);
    setTotalHectares(hectaresSum);

    const stateCounts = producers.reduce((stateCounts, producer) => {
      stateCounts[producer.state] = (stateCounts[producer.state] || 0) + 1;
      return stateCounts;
    }, {});
    const stateChartData = Object.keys(stateCounts).map((state) => ({
      name: state,
      value: stateCounts[state],
    }));
    setStateData(stateChartData);

    const cultureCounts = producers.reduce((cultureCounts, producer) => {
      producer.planted_crops.split(',').forEach((culture) => {
        cultureCounts[culture.trim()] = (cultureCounts[culture.trim()] || 0) + 1;
      });
      return cultureCounts;
    }, {});
    const cultureChartData = Object.keys(cultureCounts).map((culture) => ({
      name: culture,
      value: cultureCounts[culture],
    }));
    setCultureData(cultureChartData);

    const arableHectaresSum = producers.reduce((sum, producer) => sum + parseFloat(producer.arable_hectares), 0);
    const vegetationHectaresSum = producers.reduce((sum, producer) => sum + parseFloat(producer.vegetation_hectares), 0);
    const usageChartData = [
      { name: 'Área Agricultável', value: arableHectaresSum },
      { name: 'Área de Vegetação', value: vegetationHectaresSum },
    ];
    setUsageData(usageChartData);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total de Fazendas: {farmsCount}</p>
      <p>Total de Hectares: {totalHectares} ha</p>

      <h3>Gráfico de Pizza por Estado</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={stateData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={(entry) => entry.name}
        >
          {stateData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h3>Gráfico de Pizza por Cultura</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={cultureData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={(entry) => entry.name}
        >
          {cultureData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h3>Gráfico de Pizza por Uso de Solo</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={usageData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={(entry) => `${entry.name}: ${entry.value} ha`}
        >
          {usageData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Dashboard;
