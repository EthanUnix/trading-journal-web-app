import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';

// This would be replaced with actual chart components
const StrategyComparisonChart = () => (
  <Box sx={{ height: 300, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">Strategy Comparison Chart</Typography>
  </Box>
);

const StrategyPerformanceOverTimeChart = () => (
  <Box sx={{ height: 300, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">Strategy Performance Over Time Chart</Typography>
  </Box>
);

// Mock data for strategy metrics
const strategyMetrics = [
  { 
    name: 'Breakout', 
    totalTrades: 58, 
    winRate: 62.1, 
    profitFactor: 2.1, 
    averageProfit: 32.40,
    totalProfit: 1879.20
  },
  { 
    name: 'Trend Following', 
    totalTrades: 72, 
    winRate: 70.8, 
    profitFactor: 2.8, 
    averageProfit: 45.60,
    totalProfit: 3283.20
  },
  { 
    name: 'Range Trading', 
    totalTrades: 45, 
    winRate: 55.6, 
    profitFactor: 1.6, 
    averageProfit: 28.30,
    totalProfit: 1273.50
  },
  { 
    name: 'Scalping', 
    totalTrades: 63, 
    winRate: 68.3, 
    profitFactor: 2.3, 
    averageProfit: 22.50,
    totalProfit: 1417.50
  }
];

const StrategyAnalysis = () => {
  const [timeRange, setTimeRange] = useState('all');

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Strategy Analysis
      </Typography>
      
      {/* Time Range Filter */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={handleTimeRangeChange}
          aria-label="time range"
          size="small"
        >
          <ToggleButton value="week" aria-label="last week">
            Week
          </ToggleButton>
          <ToggleButton value="month" aria-label="last month">
            Month
          </ToggleButton>
          <ToggleButton value="quarter" aria-label="last quarter">
            Quarter
          </ToggleButton>
          <ToggleButton value="year" aria-label="last year">
            Year
          </ToggleButton>
          <ToggleButton value="all" aria-label="all time">
            All
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      {/* Strategy Comparison Chart */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader title="Strategy Comparison" />
        <Divider />
        <CardContent>
          <StrategyComparisonChart />
        </CardContent>
      </Card>
      
      {/* Strategy Metrics Table */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Strategy</TableCell>
                <TableCell align="right">Total Trades</TableCell>
                <TableCell align="right">Win Rate</TableCell>
                <TableCell align="right">Profit Factor</TableCell>
                <TableCell align="right">Avg. Profit</TableCell>
                <TableCell align="right">Total Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {strategyMetrics.map((strategy) => (
                <TableRow key={strategy.name}>
                  <TableCell component="th" scope="row">
                    {strategy.name}
                  </TableCell>
                  <TableCell align="right">{strategy.totalTrades}</TableCell>
                  <TableCell align="right">{strategy.winRate}%</TableCell>
                  <TableCell align="right">{strategy.profitFactor}</TableCell>
                  <TableCell align="right">${strategy.averageProfit.toFixed(2)}</TableCell>
                  <TableCell align="right">${strategy.totalProfit.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Strategy Performance Over Time */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader title="Strategy Performance Over Time" />
        <Divider />
        <CardContent>
          <StrategyPerformanceOverTimeChart />
        </CardContent>
      </Card>
      
      {/* Strategy Correlation */}
      <Card elevation={2}>
        <CardHeader title="Strategy Correlation with Market Conditions" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Best Market Conditions
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Strategy</TableCell>
                      <TableCell>Market Condition</TableCell>
                      <TableCell align="right">Win Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Breakout</TableCell>
                      <TableCell>High Volatility</TableCell>
                      <TableCell align="right">78.3%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Trend Following</TableCell>
                      <TableCell>Strong Trend</TableCell>
                      <TableCell align="right">85.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Range Trading</TableCell>
                      <TableCell>Low Volatility</TableCell>
                      <TableCell align="right">72.1%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Scalping</TableCell>
                      <TableCell>High Liquidity</TableCell>
                      <TableCell align="right">76.5%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Worst Market Conditions
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Strategy</TableCell>
                      <TableCell>Market Condition</TableCell>
                      <TableCell align="right">Win Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Breakout</TableCell>
                      <TableCell>Low Volatility</TableCell>
                      <TableCell align="right">32.1%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Trend Following</TableCell>
                      <TableCell>Choppy Market</TableCell>
                      <TableCell align="right">28.7%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Range Trading</TableCell>
                      <TableCell>Breakout Market</TableCell>
                      <TableCell align="right">35.4%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Scalping</TableCell>
                      <TableCell>Low Liquidity</TableCell>
                      <TableCell align="right">41.2%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StrategyAnalysis;
