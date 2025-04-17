import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import SyncIcon from '@mui/icons-material/Sync';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/trades">
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <ListItemText primary="Trades" />
        </ListItemButton>
      </ListItem>
      
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/session-analysis">
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Session Analysis" />
        </ListItemButton>
      </ListItem>
      
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/strategy-analysis">
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Strategy Analysis" />
        </ListItemButton>
      </ListItem>
      
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/missed-trades">
          <ListItemIcon>
            <DoNotDisturbIcon />
          </ListItemIcon>
          <ListItemText primary="Missed Trades" />
        </ListItemButton>
      </ListItem>
      
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/mt4-mt5-connection">
          <ListItemIcon>
            <SyncIcon />
          </ListItemIcon>
          <ListItemText primary="MT4/MT5 Connection" />
        </ListItemButton>
      </ListItem>
      
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Sidebar;
