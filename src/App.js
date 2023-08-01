import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ProducerList from './pages/ProducerList';
import ProducerForm from './pages/ProducerForm';
import Dashboard from './pages/Dashboard';
import ProducerEdit from './pages/ProducerEdit';
import Button from '@mui/material/Button';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
    setShowDashboard(false);
  };

  const handleShowDashboard = () => {
    setShowDashboard(true);
    setShowForm(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">

        </header>
        <main>
          <Switch>
            <Route exact path="/producerForm" component={ProducerForm} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/edit/:id" component={ProducerEdit} />
            <Route path="/"> 
              <Button onClick={handleShowForm} variant="contained" color="primary">
                <Link to="/producerForm" style={{ textDecoration: 'none', color: 'white' }}>
                  Novo Produtor
                </Link>
              </Button>
              <Link to="/dashboard">
                <Button onClick={handleShowDashboard} variant="contained" color="secondary">
                  Dashboard
                </Button>
              </Link>
              {showForm || showDashboard ? null : <ProducerList />} 
            </Route>
          </Switch>

        </main>
      </div>
    </Router>
  );
}

export default App;
