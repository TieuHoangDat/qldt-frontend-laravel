import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Grade from './pages/Grade';
import TimeTable from './pages/TimeTable';
import Introduce from './pages/Introduce';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import Layout from './components/Layout'; // Import Layout

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute> <Layout><Home /></Layout></PrivateRoute>}/>
        <Route path="/grade" element={<PrivateRoute> <Layout><Grade /></Layout></PrivateRoute>}/>
        <Route path="/time-table" element={<PrivateRoute> <Layout><TimeTable /></Layout></PrivateRoute>}/>
        <Route path="/introduce" element={<PrivateRoute> <Layout><Introduce /></Layout></PrivateRoute>}/>
      </Routes>
    </Router>
  );
};

export default App;
