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
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Save, ArrowUpward, ArrowDownward } from '@mui/icons-material';

// This would be replaced with actual chart component
const MissedVsTakenChart = () => (
  <Box sx={{ height: 300, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">Missed vs. Taken Trades Comparison Chart</Typography>
  </Box>
);

// Mock data for missed trades
const missedTrades = [
  {
    id: 1,
    date: '2025-04-15',
    symbol: 'EURUSD',
    direction: 'BUY',
    potentialEntryPrice: 1.0950,
    potentialExitPrice: 1.1020,
    estimatedProfit: 70.00,
    reason: 'Hesitation',
    notes: 'Clear breakout pattern but hesitated due to previous loss.'
  },
  {
    id: 2,
    date: '2025-04-14',
    symbol: 'GBPUSD',
    direction: 'SELL',
    potentialEntryPrice: 1.2540,
    potentialExitPrice: 1.2480,
    estimatedProfit: 60.00,
    reason: 'Away From Computer',
    notes: 'Setup formed during lunch break.'
  },
  {
    id: 3,
    date: '2025-04-12',
    symbol: 'USDJPY',
    direction: 'BUY',
    potentialEntryPrice: 115.20,
    potentialExitPrice: 115.60,
    estimatedProfit: 40.00,
    reason: 'Lack of Confidence',
    notes: 'Good setup but wasn\'t confident in the analysis.'
  }
];

// Mock impact analysis
const impactAnalysis = {
  totalMissedTrades: 24,
  totalMissedProfit: 1850.00,
  averageMissedProfit: 77.08,
  impactOnWinRate: '+8.5%',
  impactOnTotalProfit: '+32.4%'
};

const MissedTrades = () => {
  const [formData, setFormData] = useState({
    symbol: '',
    direction: '',
    potentialEntryPrice: '',
    potentialExitPrice: '',
    reason: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.symbol) {
      newErrors.symbol = 'Symbol is required';
    }
    
    if (!formData.direction) {
      newErrors.direction = 'Direction is required';
    }
    
    if (!formData.potentialEntryPrice) {
      newErrors.potentialEntryPrice = 'Entry price is required';
    } else if (isNaN(formData.potentialEntryPrice)) {
      newErrors.potentialEntryPrice = 'Must be a number';
    }
    
    if (!formData.potentialExitPrice) {
      newErrors.potentialExitPrice = 'Exit price is required';
    } else if (isNaN(formData.potentialExitPrice)) {
      newErrors.potentialExitPrice = 'Must be a number';
    }
    
    if (!formData.reason) {
      newErrors.reason = 'Reason is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // This would save the missed trade to the backend
    console.log('Saving missed trade:', formData);
    
    // Reset form
    setFormData({
      symbol: '',
      direction: '',
      potentialEntryPrice: '',
      potentialExitPrice: '',
      reason: '',
      notes: ''
    });
  };

  // Calculate estimated profit based on entry and exit prices
  const calculateEstimatedProfit = () => {
    if (!formData.potentialEntryPrice || !formData.potentialExitPrice || !formData.direction) {
      return '';
    }
    
    const entry = parseFloat(formData.potentialEntryPrice);
    const exit = parseFloat(formData.potentialExitPrice);
    
    if (isNaN(entry) || isNaN(exit)) {
      return '';
    }
    
    if (formData.direction === 'BUY') {
      return ((exit - entry) * 100).toFixed(2);
    } else {
      return ((entry - exit) * 100).toFixed(2);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Missed Trade Analysis
      </Typography>
      
      {/* Missed Trade Form */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader title="Log Missed Trade" />
        <Divider />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Symbol"
                  name="symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  error={!!errors.symbol}
                  helperText={errors.symbol}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth error={!!errors.direction}>
                  <InputLabel id="direction-label">Direction</InputLabel>
                  <Select
                    labelId="direction-label"
                    name="direction"
                    value={formData.direction}
                    label="Direction"
                    onChange={handleChange}
                  >
                    <MenuItem value="BUY">BUY</MenuItem>
                    <MenuItem value="SELL">SELL</MenuItem>
                  </Select>
                  {errors.direction && (
                    <Typography variant="caption" color="error">
                      {errors.direction}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Potential Entry Price"
                  name="potentialEntryPrice"
                  value={formData.potentialEntryPrice}
                  onChange={handleChange}
                  error={!!errors.potentialEntryPrice}
                  helperText={errors.potentialEntryPrice}
                  type="number"
                  step="0.0001"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Potential Exit Price"
                  name="potentialExitPrice"
                  value={formData.potentialExitPrice}
                  onChange={handleChange}
                  error={!!errors.potentialExitPrice}
                  helperText={errors.potentialExitPrice}
                  type="number"
                  step="0.0001"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.reason}>
                  <InputLabel id="reason-label">Reason</InputLabel>
                  <Select
                    labelId="reason-label"
                    name="reason"
                    value={formData.reason}
                    label="Reason"
                    onChange={handleChange}
                  >
                    <MenuItem value="Hesitation">Hesitation</MenuItem>
                    <MenuItem value="Lack of Confidence">Lack of Confidence</MenuItem>
                    <MenuItem value="Away From Computer">Away From Computer</MenuItem>
                    <MenuItem value="Missed Signal">Missed Signal</MenuItem>
                    <MenuItem value="Risk Management">Risk Management</MenuItem>
                    <MenuItem value="Technical Issues">Technical Issues</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {errors.reason && (
                    <Typography variant="caption" color="error">
                      {errors.reason}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estimated Profit"
                  value={calculateEstimatedProfit()}
                  InputProps={{
                    readOnly: true,
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes about this missed trade..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<Save />}
                >
                  Save Missed Trade
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      
      {/* Missed vs. Taken Comparison */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader title="Missed vs. Taken Trades Comparison" />
        <Divider />
        <CardContent>
          <MissedVsTakenChart />
        </CardContent>
      </Card>
      
      {/* Impact Analysis */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Impact Analysis
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Total Missed Trades</Typography>
                <Typography variant="h6">{impactAnalysis.totalMissedTrades}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Total Missed Profit</Typography>
                <Typography variant="h6" color="success.main">${impactAnalysis.totalMissedProfit.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Average Missed Profit</Typography>
                <Typography variant="h6" color="success.main">${impactAnalysis.averageMissedProfit.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Impact on Win Rate</Typography>
                <Typography variant="h6" color="success.main">{impactAnalysis.impactOnWinRate}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Impact on Total Profit</Typography>
                <Typography variant="h6" color="success.main">{impactAnalysis.impactOnTotalProfit}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Common Reasons for Missed Trades
            </Typography>
            <Box sx={{ height: 200, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="text.secondary">Reasons Pie Chart</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Missed Trade List */}
      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Direction</TableCell>
                <TableCell align="right">Entry Price</TableCell>
                <TableCell align="right">Exit Price</TableCell>
                <TableCell align="right">Est. Profit</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {missedTrades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell>{trade.date}</TableCell>
                  <TableCell>{trade.symbol}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {trade.direction === 'BUY' ? (
                        <ArrowUpward fontSize="small" color="success" sx={{ mr: 1 }} />
                      ) : (
                        <ArrowDownward fontSize="small" color="secondary" sx={{ mr: 1 }} />
                      )}
                      {trade.direction}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{trade.potentialEntryPrice}</TableCell>
                  <TableCell align="right">{trade.potentialExitPrice}</TableCell>
                  <TableCell align="right" sx={{ color: 'success.main' }}>
                    ${trade.estimatedProfit.toFixed(2)}
                  </TableCell>
                  <TableCell>{trade.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default MissedTrades;
