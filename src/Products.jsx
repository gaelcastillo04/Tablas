import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Box, Typography, Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Popover, Menu
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import ProductFormSchema from './ProductFormSchema';
import Iconify from './iconify';

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

export default function ProductsTable() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const schema = new ProductFormSchema(false);
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
    { name: 'Ángulo de Acero', price: '$45.00', category: 'Acero', description: 'Perfil estructural en L', stock: 20 },
    { name: 'Tubería Galvanizada', price: '$30.00', category: 'Tubería', description: 'Tubo de 2 pulgadas', stock: 50 }
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
        Administración del Sistema &gt; Productos
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
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <HeaderCell>Nombre</HeaderCell>
              <HeaderCell>Precio</HeaderCell>
              <HeaderCell>Categoria</HeaderCell>
              <HeaderCell>Descripción</HeaderCell>
              <HeaderCell>Stock</HeaderCell>
              <HeaderCell align="right">Opciones</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <DarkTableRow key={i}>
                <TableCell sx={{ color: '#fff' }}>{row.name}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{row.price}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{row.category}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{row.description}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{row.stock}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleOpenMenu(e, row)}>
                    <MoreVertIcon sx={{ color: '#fff' }} />
                  </IconButton>
                </TableCell>
              </DarkTableRow>
            ))}
          </TableBody>
        </Table>

        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} PaperProps={{ sx: { bgcolor: '#2a2a2a', color: '#fff' } }}>
          <MenuItem onClick={handleClose}>
            <Iconify icon="mdi:image-plus" sx={{ mr: 2 }} />
            Subir Imagen
          </MenuItem>
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
        <DialogTitle sx={{ color: '#fff', bgcolor: '#1e1e1e' }}>Nuevo Producto</DialogTitle>
        <DialogContent sx={{ bgcolor: '#1e1e1e' }}>
          <Typography variant="body2" sx={{ mb: 2, color: '#ccc' }}>
            Ingresa los datos del nuevo producto. 
          </Typography>
          <Formik
            initialValues={{
              name: '',
              price: '',
              category: '',
              description: '',
              stock: ''
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
                  name="name"
                  placeholder="Ej. Varilla"
                  value={values.name}
                  onChange={handleChange}
                  error={Boolean(errors.name && touched.name)}
                  helperText={touched.name && errors.name}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Precio"
                  name="price"
                  placeholder="Ej. $100"
                  value={values.price}
                  onChange={handleChange}
                  error={Boolean(errors.price && touched.price)}
                  helperText={touched.price && errors.price}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  select
                  label="Categoría"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  error={Boolean(errors.category && touched.category)}
                  helperText={touched.category && errors.category}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                >
                  <MenuItem value="Acero">Acero</MenuItem>
                  <MenuItem value="Tubería">Tubería</MenuItem>
                  <MenuItem value="Cemento">Cemento</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Descripción"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={Boolean(errors.description && touched.description)}
                  helperText={touched.description && errors.description}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Stock"
                  name="stock"
                  type="number"
                  value={values.stock}
                  onChange={handleChange}
                  error={Boolean(errors.stock && touched.stock)}
                  helperText={touched.stock && errors.stock}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
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
