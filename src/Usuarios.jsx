import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, MenuItem, Popover,
  Box, Typography, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import Iconify from './iconify'; // Asegúrate de tener este componente disponible

// Encabezado con color distinto
const HeaderCell = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#333',
  fontWeight: 'bold',
  borderBottom: '1px solid #555'
}));

export default function UsersTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);

  const data = [
    { firstName: 'Diego', lastName: 'Ibarra', role: 'Admin' },
    { firstName: 'Luis', lastName: 'Pérez', role: 'Usuario' },
  ];

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelected(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelected(null);
  };

  const handleEditButton = () => {
    alert(`Editar: ${selected.firstName} ${selected.lastName}`);
    handleClose();
  };

  const handleDeleteButton = () => {
    alert(`Eliminar: ${selected.firstName} ${selected.lastName}`);
    handleClose();
  };

  return (
    <Box sx={{ bgcolor: '#121212', color: '#fff', minHeight: '100vh', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Administración del Sistema &gt; Usuarios
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} variant="contained" sx={{ bgcolor: '#1e1e1e' }}>
          Volver
        </Button>
        <Button startIcon={<AddIcon />} variant="contained" sx={{ bgcolor: '#1976d2' }}>
          Nuevo
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: '#1e1e1e' }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <HeaderCell>Nombre</HeaderCell>
              <HeaderCell>Apellido</HeaderCell>
              <HeaderCell>Rol</HeaderCell>
              <HeaderCell align="right">Opciones</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ color: '#fff' }}>{row.firstName}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{row.lastName}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{row.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                    <MoreVertIcon sx={{ color: '#fff' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          PaperProps={{ sx: { bgcolor: '#2a2a2a', color: '#fff' } }}
        >
          <MenuItem onClick={handleEditButton}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Editar
          </MenuItem>
          <MenuItem onClick={handleDeleteButton} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Eliminar
          </MenuItem>
        </Popover>
      </TableContainer>
    </Box>
  );
}
