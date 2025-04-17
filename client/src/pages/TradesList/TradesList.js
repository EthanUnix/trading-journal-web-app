import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  Chip,
  Tooltip,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchTrades, deleteTrade, createTrade, clearSuccess, clearError } from '../../redux/slices/tradesSlice';

const TradesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trades, loading, error, success, pagination } = useSelector(state => state.trades);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [formData, setFormData] = useState({
    symbol: '',
    direction: 'BUY',
    openTime: '',
    closeTime: '',
    openPrice: '',
    closePrice: '',
    lotSize: '',
    profit: '',
    strategy: '',
    sessionType: 'OTHER'
  });
  const [filters, setFilters] = useState({
    symbol: '',
    direction: '',
    strategy: '',
    sessionType: '',
    profitType: ''
  });
  
  useEffect(() => {
    const params = {
      page: page + 1,
      limit: rowsPerPage,
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      )
    };
    
    dispatch(fetchTrades(params));
  }, [dispatch, page, rowsPerPage, filters]);
  
  useEffect(() => {
    if (success) {
      setOpenDialog(false);
      setFormData({
        symbol: '',
        direction: 'BUY',
        openTime: '',
        closeTime: '',
        openPrice: '',
        closePrice: '',
        lotSize: '',
        profit: '',
        strategy: '',
        sessionType: 'OTHER'
      });
      dispatch(clearSuccess());
    }
  }, [success, dispatch]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    dispatch(clearError());
  };
  
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleApplyFilters = () => {
    setPage(0);
    handleCloseFilter();
  };
  
  const handleClearFilters = () => {
    setFilters({
      symbol: '',
      direction: '',
      strategy: '',
      sessionType: '',
      profitType: ''
    });
    setPage(0);
    handleCloseFilter();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTrade(formData));
  };
  
  const handleViewTrade = (id) => {
    navigate(`/trades/${id}`);
  };
  
  const handleEditTrade = (id) => {
    navigate(`/trades/${id}`);
  };
  
  const handleDeleteTrade = (id) => {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      dispatch(deleteTrade(id));
    }
  };
  
  const getDirectionColor = (direction) => {
    return direction === 'BUY' ? 'primary' : 'error';
  };
  
  const getProfitColor = (profit) => {
    return profit >= 0 ? 'success' : 'error';
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Trades List
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />} 
            onClick={handleOpenFilter}
            sx={{ mr: 1 }}
          >
            Filter
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={handleOpenDialog}
          >
            Add Trade
          </Button>
        </Box>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="trades table">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Direction</TableCell>
                  <TableCell>Open Time</TableCell>
                  <TableCell>Close Time</TableCell>
                  <TableCell>Profit</TableCell>
                  <TableCell>Pips</TableCell>
                  <TableCell>Strategy</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trades.length > 0 ? (
                  trades.map((trade) => (
                    <TableRow key={trade._id}>
                      <TableCell>{trade.symbol}</TableCell>
                      <TableCell>
                        <Chip 
                          label={trade.direction} 
                          color={getDirectionColor(trade.direction)} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>{new Date(trade.openTime).toLocaleString()}</TableCell>
                      <TableCell>{new Date(trade.closeTime).toLocaleString()}</TableCell>
                      <TableCell>
                        <Typography color={getProfitColor(trade.profit)}>
                          {trade.profit > 0 ? '+' : ''}{trade.profit.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>{trade.pips}</TableCell>
                      <TableCell>{trade.strategy || '-'}</TableCell>
                      <TableCell>
                        <Tooltip title="View">
                          <IconButton onClick={() => handleViewTrade(trade._id)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleEditTrade(trade._id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDeleteTrade(trade._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No trades found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pagination?.total || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      
      {/* Add Trade Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Trade</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
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
                  margin="normal"
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
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add Trade'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Filter Dialog */}
      <Dialog open={openFilter} onClose={handleCloseFilter}>
        <DialogTitle>Filter Trades</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="symbol-filter"
                label="Symbol"
                name="symbol"
                value={filters.symbol}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="direction-filter"
                label="Direction"
                name="direction"
                select
                value={filters.direction}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="BUY">BUY</MenuItem>
                <MenuItem value="SELL">SELL</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="strategy-filter"
                label="Strategy"
                name="strategy"
                value={filters.strategy}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="sessionType-filter"
                label="Session Type"
                name="sessionType"
                select
                value={filters.sessionType}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="ASIAN">Asian</MenuItem>
                <MenuItem value="LONDON">London</MenuItem>
                <MenuItem value="NEW_YORK">New York</MenuItem>
                <MenuItem value="OVERLAP">Overlap</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="profitType-filter"
                label="Profit Type"
                name="profitType"
                select
                value={filters.profitType}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="profit[gt]=0">Profitable</MenuItem>
                <MenuItem value="profit[lt]=0">Loss</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearFilters}>Clear</Button>
          <Button onClick={handleApplyFilters} variant="contained">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TradesList;
