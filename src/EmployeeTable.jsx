import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, Box, IconButton, MenuItem, Popover
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import Iconify from './iconify';

// Estilos personalizados
const DarkTableCell = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#2a2a2a',
  borderBottom: '1px solid #444'
}));

const DarkTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#1e1e1e',
  },
  '&:hover': {
    backgroundColor: '#333',
  }
}));

export default function EmployeeTable() {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Datos simulados
  useEffect(() => {
    const fakeData = [
      { phoneNumber: '3324945924', firstName: 'Diego', lastName: 'Ibarra' },
      { phoneNumber: '3324945923', firstName: 'Diego Alejandro', lastName: 'Ibarra Flores' },
      { phoneNumber: '3324945920', firstName: 'Jesús', lastName: 'Ibarra Flores' },
      { phoneNumber: '3320304050', firstName: 'Luis', lastName: 'López' }
    ];
    setData(fakeData);
  }, []);

  const handleOpenMenu = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleEditButton = () => {
    alert(`Editar: ${selectedEmployee.firstName} ${selectedEmployee.lastName}`);
    handleCloseMenu();
  };

  const handleDeleteButton = () => {
    alert(`Eliminar: ${selectedEmployee.firstName} ${selectedEmployee.lastName}`);
    handleCloseMenu();
  };

  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#fff',
        p: 3,
        width: '100%',
        flex: 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Administración del Sistema &gt; Empleados
      </Typography>

      {/* Botones */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton
          sx={{
            backgroundColor: '#1e1e1e',
            color: '#fff',
            borderRadius: 2,
            px: 2,
            '&:hover': { backgroundColor: '#333' }
          }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          Volver
        </IconButton>

        <IconButton
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            borderRadius: 2,
            px: 2,
            '&:hover': { backgroundColor: '#1565c0' }
          }}
        >
          <AddIcon sx={{ mr: 1 }} />
          Nuevo
        </IconButton>
      </Box>

      {/* Tabla */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#1e1e1e',
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <Table sx={{ width: '100%', minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <DarkTableCell sx={{ width: '30%' }}>Nombre</DarkTableCell>
              <DarkTableCell sx={{ width: '30%' }}>Apellido</DarkTableCell>
              <DarkTableCell sx={{ width: '30%' }}>No. Teléfono</DarkTableCell>
              <DarkTableCell sx={{ width: '10%' }} align="right"> </DarkTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((emp, index) => (
              <DarkTableRow key={index}>
                <TableCell sx={{ color: '#fff', width: '30%' }}>{emp.firstName}</TableCell>
                <TableCell sx={{ color: '#fff', width: '30%' }}>{emp.lastName}</TableCell>
                <TableCell sx={{ color: '#fff', width: '30%' }}>{emp.phoneNumber}</TableCell>
                <TableCell sx={{ width: '10%' }} align="right">
                  <IconButton onClick={(e) => handleOpenMenu(e, emp)}>
                    <MoreVertIcon sx={{ color: '#fff' }} />
                  </IconButton>
                </TableCell>
              </DarkTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menú contextual */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { bgcolor: '#2a2a2a', color: '#fff' }
        }}
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
    </Box>
  );
}
