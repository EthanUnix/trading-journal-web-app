import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Chip,
  Divider,
  Alert,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { 
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchTradeById, updateTrade, deleteTrade, clearSuccess, clearError } from '../../redux/slices/tradesSlice';

const TradeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trade, loading, error, success } = useSelector(state => state.trades);
  
  const [formData, setFormData] = useState({
    symbol: '',
    direction: 'BUY',
    openTime: '',
    closeTime: '',
    openPrice: '',
    closePrice: '',
    lotSize: '',
    profit: '',
    pips: '',
    strategy: '',
    sessionType: 'OTHER',
    notes: '',
    tags: []
  });
  
  const [newTag, setNewTag] = useState('');
  
  useEffect(() => {
    dispatch(fetchTradeById(id));
    
    return () => {
      dispatch(clearSuccess());
      dispatch(clearError());
    };
  }, [dispatch, id]);
  
  useEffect(() => {
    if (trade) {
      setFormData({
        symbol: trade.symbol || '',
        direction: trade.direction || 'BUY',
        openTime: trade.openTime ? new Date(trade.openTime).toISOString().slice(0, 16) : '',
        closeTime: trade.closeTime ? new Date(trade.closeTime).toISOString().slice(0, 16) : '',
        openPrice: trade.openPrice || '',
        closePrice: trade.closePrice || '',
        lotSize: trade.lotSize || '',
        profit: trade.profit || '',
        pips: trade.pips || '',
        strategy: trade.strategy || '',
        sessionType: trade.sessionType || 'OTHER',
        notes: trade.notes || '',
        tags: trade.tags || []
      });
    }
  }, [trade]);
  
  useEffect(() => {
    if (success) {
      // Refresh the trade data
      dispatch(fetchTradeById(id));
    }
  }, [success, dispatch, id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTrade({ id, tradeData: formData }));
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      dispatch(deleteTrade(id));
      navigate('/trades');
    }
  };
  
  const handleBack = () => {
    navigate('/trades');
  };
  
  const handleAddTag = () => {
    if (newTag.trim() !== '' && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const getDirectionColor = (direction) => {
    return direction === 'BUY' ? 'primary' : 'error';
  };
  
  const getProfitColor = (profit) => {
    return profit >= 0 ? 'success' : 'error';
  };
  
  if (loading && !trade) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          Back to Trades
        </Button>
        <Typography variant="h4" component="h1">
          Trade Details
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Trade updated successfully
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="symbol"
                    label="Symbol"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="direction"
                    label="Direction"
                    name="direction"
                    select
                    value={formData.direction}
                    onChange={handleChange}
                  >
                    <MenuItem value="BUY">BUY</MenuItem>
                    <MenuItem value="SELL">SELL</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="openTime"
                    label="Open Time"
                    name="openTime"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={formData.openTime}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="closeTime"
                    label="Close Time"
                    name="closeTime"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={formData.closeTime}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="openPrice"
                    label="Open Price"
                    name="openPrice"
                    type="number"
                    value={formData.openPrice}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="closePrice"
                    label="Close Price"
                    name="closePrice"
                    type="number"
                    value={formData.closePrice}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id="lotSize"
                    label="Lot Size"
                    name="lotSize"
                    type="number"
                    value={formData.lotSize}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id="profit"
                    label="Profit"
                    name="profit"
                    type="number"
                    value={formData.profit}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id="pips"
                    label="Pips"
                    name="pips"
                    type="number"
                    value={formData.pips}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="strategy"
                    label="Strategy"
                    name="strategy"
                    value={formData.strategy}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="sessionType"
                    label="Session Type"
                    name="sessionType"
                    select
                    value={formData.sessionType}
                    onChange={handleChange}
                  >
                    <MenuItem value="ASIAN">Asian</MenuItem>
                    <MenuItem value="LONDON">London</MenuItem>
                    <MenuItem value="NEW_YORK">New York</MenuItem>
                    <MenuItem value="OVERLAP">Overlap</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="notes"
                    label="Notes"
                    name="notes"
                    multiline
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {formData.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleRemoveTag(tag)}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      id="newTag"
                      label="Add Tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trade Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Symbol:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {trade?.symbol}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Direction:
                </Typography>
                <Chip 
                  label={trade?.direction} 
                  color={getDirectionColor(trade?.direction)} 
                  size="small" 
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Profit:
                </Typography>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  color={getProfitColor(trade?.profit)}
                >
                  {trade?.profit > 0 ? '+' : ''}{trade?.profit?.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Pips:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {trade?.pips}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Lot Size:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {trade?.lotSize}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Strategy:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {trade?.strategy || '-'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Session:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {trade?.sessionType || '-'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Duration:
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {trade?.holdingTime || '-'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          {/* Additional cards for charts or images could be added here */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TradeDetails;
