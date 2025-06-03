import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';

const drawerWidth = 240;

export default function SidebarLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1e1e1e',
            color: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Tablas</Typography>
        </Box>
        <List>
          <ListItemButton component={NavLink} to="/usuarios">
            <ListItemIcon sx={{ color: '#fff' }}><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
          <ListItemButton component={NavLink} to="/productos">
            <ListItemIcon sx={{ color: '#fff' }}><InventoryIcon /></ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItemButton>
          <ListItemButton component={NavLink} to="/ordenes">
            <ListItemIcon sx={{ color: '#fff' }}><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Órdenes" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#121212', color: '#fff', p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
