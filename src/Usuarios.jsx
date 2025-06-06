import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Box, Typography, Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Popover
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import Iconify from './iconify';
import UserFormSchema from './UserFormSchema';

const HeaderCell = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#333',
  fontWeight: 'bold',
  borderBottom: '1px solid #555'
}));

const DarkTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#1e1e1e'
  },
  '&:hover': {
    backgroundColor: '#333'
  }
}));

export default function UsersTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const schema = new UserFormSchema(false);
  const validate = (values) => {
    const { error } = schema.getSchema().validate(values, { abortEarly: false });
    const errors = {};
    if (error) {
      error.details.forEach((detail) => {
        const key = detail.path[0];
        errors[key] = detail.message;
      });
    }
    return errors;
  };

  const [data, setData] = useState([
    { firstName: 'Diego', lastName: 'Ibarra', role: 'Admin' },
    { firstName: 'Luis', lastName: 'Pérez', role: 'Usuario' },
  ]);

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelected(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelected(null);
  };

  const handleSave = (values) => {
    setData((prev) => [...prev, values]);
    setOpenDialog(false);
  };

  const fieldStyles = {
    bgcolor: '#2c2c2c',
    input: { color: '#fff' },
    label: { color: '#ccc' },
    '& .MuiFormHelperText-root': { color: '#f44336' },
    '& .MuiSelect-select': { color: '#fff' }
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
        <Button startIcon={<AddIcon />} variant="contained" sx={{ bgcolor: '#1976d2' }} onClick={() => setOpenDialog(true)}>
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
              <DarkTableRow key={i}>
                <TableCell sx={{ color: '#fff' }}>{row.firstName}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{row.lastName}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{row.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                    <MoreVertIcon sx={{ color: '#fff' }} />
                  </IconButton>
                </TableCell>
              </DarkTableRow>
            ))}
          </TableBody>
        </Table>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          PaperProps={{ sx: { bgcolor: '#2a2a2a', color: '#fff' } }}
        >
          <MenuItem onClick={handleClose}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Editar
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Eliminar
          </MenuItem>
        </Popover>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ color: '#fff', bgcolor: '#1e1e1e' }}>Nuevo Usuario</DialogTitle>
        <DialogContent sx={{ bgcolor: '#1e1e1e' }}>
          <Typography variant="body2" sx={{ mb: 2, color: '#ccc' }}>
            Ingresa los datos del nuevo usuario. Todos los campos son obligatorios.
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              role: ''
            }}
            validate={validate}
            onSubmit={handleSave}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Nombre"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  error={Boolean(errors.firstName && touched.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Apellido"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  error={Boolean(errors.lastName && touched.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  select
                  label="Rol"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  error={Boolean(errors.role && touched.role)}
                  helperText={touched.role && errors.role}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Usuario">Usuario</MenuItem>
                </TextField>
                <DialogActions>
                  <Button onClick={() => setOpenDialog(false)} variant="outlined" sx={{ color: '#fff', borderColor: '#555' }}>Cancelar</Button>
                  <Button type="submit" variant="contained">Guardar</Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
