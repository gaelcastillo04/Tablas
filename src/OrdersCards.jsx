import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Stack
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const orders = [
  { id: 'ORD-1001', total: '$1,250.00', status: 'Entregado', productCount: 8 },
  { id: 'ORD-1002', total: '$540.00', status: 'Pendiente', productCount: 3 },
  { id: 'ORD-1003', total: '$330.00', status: 'Cancelado', productCount: 5 },
  { id: 'ORD-1004', total: '$2,400.00', status: 'Entregado', productCount: 12 },
  { id: 'ORD-1005', total: '$150.00', status: 'Pendiente', productCount: 1 },
  { id: 'ORD-1006', total: '$870.00', status: 'Cancelado', productCount: 4 }
];

const statusChip = (status) => {
  const baseStyle = { color: '#fff' };

  switch (status) {
    case 'Entregado':
      return <Chip icon={<LocalShippingIcon />} label="Entregado" sx={{ ...baseStyle, bgcolor: 'green' }} />;
    case 'Cancelado':
      return <Chip icon={<CancelIcon />} label="Cancelado" sx={{ ...baseStyle, bgcolor: 'red' }} />;
    case 'Pendiente':
    default:
      return <Chip icon={<HourglassTopIcon />} label="Pendiente" sx={{ ...baseStyle, bgcolor: 'orange' }} />;
  }
};

export default function OrdersCards() {
  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
        Órdenes del Usuario
      </Typography>
      <Grid container spacing={4}>
        {orders.map((order, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 2,
                bgcolor: '#1e1e1e',
                color: '#fff',
                borderRadius: 3,
                height: 200,
                width: 130,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Stack spacing={1} textAlign="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  Orden #{order.id}
                </Typography>
                <Typography variant="body2">
                  Total a pagar: <strong>{order.total}</strong>
                </Typography>
                <Typography variant="body2">
                  Productos: {order.productCount}
                </Typography>
                <Box mt={1}>{statusChip(order.status)}</Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
