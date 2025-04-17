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
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Sync, 
  Delete, 
  CheckCircle, 
  Error,
  Refresh
} from '@mui/icons-material';

// Mock data for connected accounts
const connectedAccounts = [
  {
    id: 1,
    accountNumber: '12345678',
    brokerName: 'Demo Broker 1',
    serverName: 'Demo-Server-1',
    status: 'connected',
    lastSync: '2025-04-17 10:30:45'
  },
  {
    id: 2,
    accountNumber: '87654321',
    brokerName: 'Demo Broker 2',
    serverName: 'Demo-Server-2',
    status: 'disconnected',
    lastSync: '2025-04-16 15:20:10'
  }
];

// Mock data for sync history
const syncHistory = [
  {
    id: 1,
    timestamp: '2025-04-17 10:30:45',
    accountNumber: '12345678',
    status: 'success',
    tradesImported: 12,
    message: 'Successfully synchronized 12 trades'
  },
  {
    id: 2,
    timestamp: '2025-04-16 15:20:10',
    accountNumber: '87654321',
    status: 'success',
    tradesImported: 8,
    message: 'Successfully synchronized 8 trades'
  },
  {
    id: 3,
    timestamp: '2025-04-15 09:45:22',
    accountNumber: '12345678',
    status: 'error',
    tradesImported: 0,
    message: 'Authentication failed. Please check your credentials.'
  }
];

const MT4MT5Connection = () => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    password: '',
    brokerName: '',
    serverName: ''
  });
  const [errors, setErrors] = useState({});
  const [autoSync, setAutoSync] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

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
    
    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (!formData.brokerName) {
      newErrors.brokerName = 'Broker name is required';
    }
    
    if (!formData.serverName) {
      newErrors.serverName = 'Server name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // This would connect to the MT4/MT5 account
    console.log('Connecting to MT4/MT5 account:', formData);
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Account connected successfully!',
      severity: 'success'
    });
    
    // Reset form
    setFormData({
      accountNumber: '',
      password: '',
      brokerName: '',
      serverName: ''
    });
  };

  const handleSyncAccount = (accountId) => {
    // This would trigger synchronization for the specific account
    console.log('Syncing account:', accountId);
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Synchronization started. This may take a few moments.',
      severity: 'info'
    });
  };

  const handleDeleteAccount = (accountId) => {
    // This would delete the account connection
    console.log('Deleting account connection:', accountId);
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Account disconnected successfully!',
      severity: 'success'
    });
  };

  const handleAutoSyncChange = (e) => {
    setAutoSync(e.target.checked);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        MT4/MT5 Connection
      </Typography>
      
      {/* Broker Account Form */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardHeader title="Connect Broker Account" />
        <Divider />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Broker Name"
                  name="brokerName"
                  value={formData.brokerName}
                  onChange={handleChange}
                  error={!!errors.brokerName}
                  helperText={errors.brokerName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Server Name"
                  name="serverName"
                  value={formData.serverName}
                  onChange={handleChange}
                  error={!!errors.serverName}
                  helperText={errors.serverName}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mr: 2 }}
                >
                  Connect Account
                </Button>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoSync}
                      onChange={handleAutoSyncChange}
                      color="primary"
                    />
                  }
                  label="Enable Auto-Sync"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      
      {/* Connected Accounts List */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <List>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="h6">Connected Accounts</Typography>} 
            />
          </ListItem>
          <Divider />
          {connectedAccounts.length > 0 ? (
            connectedAccounts.map((account) => (
              <React.Fragment key={account.id}>
                <ListItem>
                  <ListItemText
                    primary={`${account.brokerName} (${account.accountNumber})`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Server: {account.serverName}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Status: {account.status === 'connected' ? (
                            <Box component="span" sx={{ color: 'success.main', display: 'inline-flex', alignItems: 'center' }}>
                              <CheckCircle fontSize="small" sx={{ mr: 0.5 }} /> Connected
                            </Box>
                          ) : (
                            <Box component="span" sx={{ color: 'error.main', display: 'inline-flex', alignItems: 'center' }}>
                              <Error fontSize="small" sx={{ mr: 0.5 }} /> Disconnected
                            </Box>
                          )}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Last Sync: {account.lastSync}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      aria-label="sync" 
                      onClick={() => handleSyncAccount(account.id)}
                      sx={{ mr: 1 }}
                    >
                      <Sync />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary="No accounts connected"
                secondary="Use the form above to connect your MT4/MT5 accounts"
              />
            </ListItem>
          )}
        </List>
      </Paper>
      
      {/* Sync History */}
      <Card elevation={2}>
        <CardHeader 
          title="Synchronization History" 
          action={
            <Button
              startIcon={<Refresh />}
              size="small"
            >
              Refresh
            </Button>
          }
        />
        <Divider />
        <CardContent>
          <List>
            {syncHistory.map((sync) => (
              <ListItem key={sync.id}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {sync.status === 'success' ? (
                        <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                      ) : (
                        <Error fontSize="small" color="error" sx={{ mr: 1 }} />
                      )}
                      {sync.message}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        Account: {sync.accountNumber}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Time: {sync.timestamp}
                      </Typography>
                      {sync.status === 'success' && (
                        <>
                          <br />
                          <Typography component="span" variant="body2">
                            Trades Imported: {sync.tradesImported}
                          </Typography>
                        </>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MT4MT5Connection;
