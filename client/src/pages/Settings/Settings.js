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
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Person, 
  Palette, 
  Backup, 
  Notifications, 
  VpnKey,
  Save,
  CloudUpload,
  CloudDownload
} from '@mui/icons-material';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [userProfile, setUserProfile] = useState({
    name: 'Test User',
    email: 'test@example.com',
    timezone: 'UTC+0'
  });
  const [appearance, setAppearance] = useState({
    theme: 'light',
    compactView: false,
    showProfitInHeader: true
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    tradeImportNotifications: true,
    performanceReports: true
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUserProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  const handleAppearanceChange = (e) => {
    const { name, checked } = e.target;
    setAppearance({
      ...appearance,
      [name]: checked
    });
  };

  const handleThemeChange = (theme) => {
    setAppearance({
      ...appearance,
      theme
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({
      ...notifications,
      [name]: checked
    });
  };

  const handleSaveSettings = () => {
    // This would save the settings to the backend
    console.log('Saving settings:', {
      userProfile,
      appearance,
      notifications
    });
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success'
    });
  };

  const handleBackupData = () => {
    // This would trigger a data backup
    console.log('Backing up data');
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Data backup started. You will be notified when complete.',
      severity: 'info'
    });
  };

  const handleImportData = () => {
    // This would trigger a data import
    console.log('Importing data');
    
    // Show success message
    setSnackbar({
      open: true,
      message: 'Data import started. You will be notified when complete.',
      severity: 'info'
    });
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
        Settings
      </Typography>
      
      <Paper elevation={2} sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<Person />} label="User Profile" />
          <Tab icon={<Palette />} label="Appearance" />
          <Tab icon={<Backup />} label="Data Management" />
          <Tab icon={<Notifications />} label="Notifications" />
          <Tab icon={<VpnKey />} label="API Keys" />
        </Tabs>
      </Paper>
      
      {/* User Profile Tab */}
      {tabValue === 0 && (
        <Card elevation={2}>
          <CardHeader title="User Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={userProfile.name}
                  onChange={handleUserProfileChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={userProfile.email}
                  onChange={handleUserProfileChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Timezone"
                  name="timezone"
                  value={userProfile.timezone}
                  onChange={handleUserProfileChange}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="UTC-12">UTC-12</option>
                  <option value="UTC-11">UTC-11</option>
                  <option value="UTC-10">UTC-10</option>
                  <option value="UTC-9">UTC-9</option>
                  <option value="UTC-8">UTC-8 (PST)</option>
                  <option value="UTC-7">UTC-7 (MST)</option>
                  <option value="UTC-6">UTC-6 (CST)</option>
                  <option value="UTC-5">UTC-5 (EST)</option>
                  <option value="UTC-4">UTC-4</option>
                  <option value="UTC-3">UTC-3</option>
                  <option value="UTC-2">UTC-2</option>
                  <option value="UTC-1">UTC-1</option>
                  <option value="UTC+0">UTC+0 (GMT)</option>
                  <option value="UTC+1">UTC+1 (CET)</option>
                  <option value="UTC+2">UTC+2 (EET)</option>
                  <option value="UTC+3">UTC+3</option>
                  <option value="UTC+4">UTC+4</option>
                  <option value="UTC+5">UTC+5</option>
                  <option value="UTC+5:30">UTC+5:30 (IST)</option>
                  <option value="UTC+6">UTC+6</option>
                  <option value="UTC+7">UTC+7</option>
                  <option value="UTC+8">UTC+8 (CST)</option>
                  <option value="UTC+9">UTC+9 (JST)</option>
                  <option value="UTC+10">UTC+10</option>
                  <option value="UTC+11">UTC+11</option>
                  <option value="UTC+12">UTC+12</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveSettings}
                >
                  Save Profile
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      
      {/* Appearance Tab */}
      {tabValue === 1 && (
        <Card elevation={2}>
          <CardHeader title="Appearance" />
          <Divider />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Theme
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item>
                <Card 
                  elevation={appearance.theme === 'light' ? 8 : 1}
                  onClick={() => handleThemeChange('light')}
                  sx={{ 
                    width: 120, 
                    height: 80, 
                    cursor: 'pointer',
                    bgcolor: '#ffffff',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="body1">Light</Typography>
                </Card>
              </Grid>
              <Grid item>
                <Card 
                  elevation={appearance.theme === 'dark' ? 8 : 1}
                  onClick={() => handleThemeChange('dark')}
                  sx={{ 
                    width: 120, 
                    height: 80, 
                    cursor: 'pointer',
                    bgcolor: '#333333',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="body1">Dark</Typography>
                </Card>
              </Grid>
            </Grid>
            
            <Typography variant="h6" gutterBottom>
              Layout Preferences
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Compact View" 
                  secondary="Use a more compact layout to show more data on screen"
                />
                <Switch
                  edge="end"
                  name="compactView"
                  checked={appearance.compactView}
                  onChange={handleAppearanceChange}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Show Profit in Header" 
                  secondary="Display total profit in the application header"
                />
                <Switch
                  edge="end"
                  name="showProfitInHeader"
                  checked={appearance.showProfitInHeader}
                  onChange={handleAppearanceChange}
                />
              </ListItem>
            </List>
            
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveSettings}
              sx={{ mt: 2 }}
            >
              Save Appearance
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Data Management Tab */}
      {tabValue === 2 && (
        <Card elevation={2}>
          <CardHeader title="Data Management" />
          <Divider />
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CloudUpload />
                </ListItemIcon>
                <ListItemText 
                  primary="Backup Data" 
                  secondary="Create a backup of all your trading data"
                />
                <Button
                  variant="outlined"
                  onClick={handleBackupData}
                >
                  Backup
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <CloudDownload />
                </ListItemIcon>
                <ListItemText 
                  primary="Import Data" 
                  secondary="Import trading data from a backup file"
                />
                <Button
                  variant="outlined"
                  onClick={handleImportData}
                >
                  Import
                </Button>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <CloudDownload />
                </ListItemIcon>
                <ListItemText 
                  primary="Export as CSV" 
                  secondary="Export all your trading data as CSV files"
                />
                <Button
                  variant="outlined"
                >
                  Export
                </Button>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
      
      {/* Notifications Tab */}
      {tabValue === 3 && (
        <Card elevation={2}>
          <CardHeader title="Notifications" />
          <Divider />
          <CardContent>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Email Notifications" 
                  secondary="Receive important notifications via email"
                />
                <Switch
                  edge="end"
                  name="emailNotifications"
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationChange}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Trade Import Notifications" 
                  secondary="Get notified when trades are imported from your broker"
                />
                <Switch
                  edge="end"
                  name="tradeImportNotifications"
                  checked={notifications.tradeImportNotifications}
                  onChange={handleNotificationChange}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Weekly Performance Reports" 
                  secondary="Receive weekly reports of your trading performance"
                />
                <Switch
                  edge="end"
                  name="performanceReports"
                  checked={notifications.performanceReports}
                  onChange={handleNotificationChange}
                />
              </ListItem>
            </List>
            
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveSettings}
              sx={{ mt: 2 }}
            >
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* API Keys Tab */}
      {tabValue === 4 && (
        <Card elevation={2}>
          <CardHeader title="API Keys" />
          <Divider />
          <CardContent>
            <Alert severity="info" sx={{ mb: 3 }}>
              API keys allow external applications to access your trading data. Only share API keys with trusted applications.
            </Alert>
            
            <Typography variant="h6" gutterBottom>
              Your API Keys
            </Typography>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                API Key
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                ••••••••••••••••••••••••••••••
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                API Secret
              </Typography>
              <Typography variant="body1">
                ••••••••••••••••••••••••••••••
              </Typography>
            </Paper>
            
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                >
                  Generate New API Key
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                >
                  Revoke All Keys
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      
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

export default Settings;
