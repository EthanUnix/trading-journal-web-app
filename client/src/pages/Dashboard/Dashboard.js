import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart, 
  ShowChart,
  Timeline
} from '@mui/icons-material';
import { fetchTradeStats } from '../../redux/slices/tradesSlice';
import { fetchMissedTradeStats } from '../../redux/slices/missedTradesSlice';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats: tradeStats, loading: tradesLoading } = useSelector(state => state.trades);
  const { stats: missedTradeStats, loading: missedTradesLoading } = useSelector(state => state.missedTrades);
  
  useEffect(() => {
    dispatch(fetchTradeStats());
    dispatch(fetchMissedTradeStats());
  }, [dispatch]);
  
  const loading = tradesLoading || missedTradesLoading;
  
  // Prepare chart data
  const performanceData = {
    labels: ['Win', 'Loss'],
    datasets: [
      {
        data: tradeStats ? [tradeStats.winningTrades, tradeStats.losingTrades] : [0, 0],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };
  
  // Mock data for profit chart (would be replaced with real data from API)
  const profitChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Profit',
        data: [300, -200, 500, 100, -50, 700],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };
  
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ShowChart color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                      Total Trades
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div">
                    {tradeStats?.totalTrades || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TrendingUp color="success" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                      Win Rate
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div">
                    {tradeStats ? `${tradeStats.winRate.toFixed(1)}%` : '0%'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BarChart color="info" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                      Profit Factor
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div">
                    {tradeStats ? tradeStats.profitFactor.toFixed(2) : '0.00'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TrendingDown color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div">
                      Missed Trades
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div">
                    {missedTradeStats?.totalMissedTrades || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Profit/Loss Over Time
                </Typography>
                <Line data={profitChartData} options={{ maintainAspectRatio: false, height: 300 }} />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Win/Loss Ratio
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Pie data={performanceData} options={{ maintainAspectRatio: false }} />
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Performance
                </Typography>
                <Typography variant="body1">
                  Your trading performance has been improving. Keep up the good work!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Tip: Review your winning trades to identify patterns that lead to success.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
