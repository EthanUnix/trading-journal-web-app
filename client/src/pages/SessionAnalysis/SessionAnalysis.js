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
  Paper
} from '@mui/material';

// This would be replaced with actual chart components
const SessionPerformanceChart = () => (
  <Box sx={{ height: 300, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">Session Performance Chart</Typography>
  </Box>
);

const TimeDistributionChart = () => (
  <Box sx={{ height: 300, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">Time Distribution Chart</Typography>
  </Box>
);

// Mock data for session metrics
const sessionMetrics = [
  { 
    name: 'Asian Session', 
    totalTrades: 42, 
    winRate: 58.3, 
    profitFactor: 1.8, 
    averageProfit: 25.40,
    totalProfit: 1066.80
  },
  { 
    name: 'London Session', 
    totalTrades: 78, 
    winRate: 67.9, 
    profitFactor: 2.5, 
    averageProfit: 42.30,
    totalProfit: 3299.40
  },
  { 
    name: 'New York Session', 
    totalTrades: 65, 
    winRate: 63.1, 
    profitFactor: 2.1, 
    averageProfit: 35.80,
    totalProfit: 2327.00
  },
  { 
    name: 'Overlap Session', 
    totalTrades: 53, 
    winRate: 71.7, 
    profitFactor: 2.8, 
    averageProfit: 48.60,
    totalProfit: 2575.80
  }
];

// Mock data for best/worst times
const bestWorstTimes = {
  bestTime: '09:00 - 11:00 (London Open)',
  bestWinRate: 78.4,
  bestProfitFactor: 3.2,
  worstTime: '22:00 - 00:00 (Late NY)',
  worstWinRate: 42.1,
  worstProfitFactor: 0.8
};

const SessionAnalysis = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Session Analysis
      </Typography>
      
      {/* Session Performance Chart */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader title="Session Performance Over Time" />
        <Divider />
        <CardContent>
          <SessionPerformanceChart />
        </CardContent>
      </Card>
      
      {/* Session Metrics Table */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Session</TableCell>
                <TableCell align="right">Total Trades</TableCell>
                <TableCell align="right">Win Rate</TableCell>
                <TableCell align="right">Profit Factor</TableCell>
                <TableCell align="right">Avg. Profit</TableCell>
                <TableCell align="right">Total Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessionMetrics.map((session) => (
                <TableRow key={session.name}>
                  <TableCell component="th" scope="row">
                    {session.name}
                  </TableCell>
                  <TableCell align="right">{session.totalTrades}</TableCell>
                  <TableCell align="right">{session.winRate}%</TableCell>
                  <TableCell align="right">{session.profitFactor}</TableCell>
                  <TableCell align="right">${session.averageProfit.toFixed(2)}</TableCell>
                  <TableCell align="right">${session.totalProfit.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Time Distribution Chart */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader title="Trade Distribution Across 24-Hour Day" />
        <Divider />
        <CardContent>
          <TimeDistributionChart />
        </CardContent>
      </Card>
      
      {/* Best/Worst Times */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader title="Best Trading Times" sx={{ bgcolor: 'success.light', color: 'white' }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {bestWorstTimes.bestTime}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Win Rate</Typography>
                  <Typography variant="h6">{bestWorstTimes.bestWinRate}%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Profit Factor</Typography>
                  <Typography variant="h6">{bestWorstTimes.bestProfitFactor}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardHeader title="Worst Trading Times" sx={{ bgcolor: 'secondary.light', color: 'white' }} />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {bestWorstTimes.worstTime}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Win Rate</Typography>
                  <Typography variant="h6">{bestWorstTimes.worstWinRate}%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Profit Factor</Typography>
                  <Typography variant="h6">{bestWorstTimes.worstProfitFactor}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SessionAnalysis;
