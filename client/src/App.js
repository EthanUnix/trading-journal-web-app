import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import TradesList from './pages/TradesList/TradesList';
import TradeDetails from './pages/TradeDetails/TradeDetails';
import SessionAnalysis from './pages/SessionAnalysis/SessionAnalysis';
import StrategyAnalysis from './pages/StrategyAnalysis/StrategyAnalysis';
import MissedTrades from './pages/MissedTrades/MissedTrades';
import MT4MT5Connection from './pages/MT4MT5Connection/MT4MT5Connection';
import Settings from './pages/Settings/Settings';

// Components
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// Redux actions
import { getMe } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { theme } = user?.settings || { theme: 'light' };

  // Create theme based on user settings
  const appTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  useEffect(() => {
    // Check if user is authenticated on app load
    if (localStorage.getItem('token')) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
          
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="trades" element={<TradesList />} />
            <Route path="trades/:id" element={<TradeDetails />} />
            <Route path="session-analysis" element={<SessionAnalysis />} />
            <Route path="strategy-analysis" element={<StrategyAnalysis />} />
            <Route path="missed-trades" element={<MissedTrades />} />
            <Route path="mt4-mt5-connection" element={<MT4MT5Connection />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
