import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import OrderFormSchema from './OrderFormSchema';

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

export default function OrdersTable() {
  const [openRow, setOpenRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const schema = new OrderFormSchema(false);
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
    {
      phoneNumber: '3324945924',
      total: '$1,200',
      status: 'Entregado',
      created: '2024-06-01',
      cancelled: '-',
      products: ['Producto A', 'Producto B', 'Producto C']
    },
    {
      phoneNumber: '3321234567',
      total: '$300',
      status: 'Cancelado',
      created: '2024-06-02',
      cancelled: '2024-06-03',
      products: ['Producto X']
    }
  ]);

  const toggleOpen = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  const handleSave = (values) => {
    const newEntry = {
      ...values,
      products: typeof values.products === 'string'
        ? values.products.split(',').map((p) => p.trim())
        : values.products
    };
    setData((prev) => [...prev, newEntry]);
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
        Administración del Sistema &gt; Órdenes
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
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <HeaderCell>No. Teléfono de Comprador</HeaderCell>
              <HeaderCell>Total</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Fecha de Creación</HeaderCell>
              <HeaderCell>Fecha de Cancelación</HeaderCell>
              <HeaderCell>Productos</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <React.Fragment key={index}>
                <DarkTableRow>
                  <TableCell sx={{ color: '#fff' }}>{row.phoneNumber}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{row.total}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{row.status}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{row.created}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{row.cancelled}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => toggleOpen(index)}>
                      {openRow === index ? (
                        <ExpandLessIcon sx={{ color: '#fff' }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: '#fff' }} />
                      )}
                    </IconButton>
                  </TableCell>
                </DarkTableRow>
                <TableRow>
                  <TableCell colSpan={6} sx={{ p: 0, bgcolor: '#1e1e1e' }}>
                    <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, pl: 4, color: '#ccc' }}>
                        <Typography variant="subtitle2">Productos pedidos:</Typography>
                        <ul>
                          {row.products.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ color: '#fff', bgcolor: '#1e1e1e' }}>Nueva Orden</DialogTitle>
        <DialogContent sx={{ bgcolor: '#1e1e1e' }}>
          <Typography variant="body2" sx={{ mb: 2, color: '#ccc' }}>
            Ingresa los datos de la nueva orden. 
          </Typography>
          <Formik
            initialValues={{
              phoneNumber: '',
              total: '',
              status: '',
              created: '',
              cancelled: '',
              products: ''
            }}
            validate={validate}
            onSubmit={handleSave}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Teléfono de Comprador"
                  name="phoneNumber"
                  placeholder="Ej. 3321234567"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  error={Boolean(errors.phoneNumber && touched.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Total"
                  name="total"
                  placeholder="Ej. $1500"
                  value={values.total}
                  onChange={handleChange}
                  error={Boolean(errors.total && touched.total)}
                  helperText={touched.total && errors.total}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  select
                  label="Status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  error={Boolean(errors.status && touched.status)}
                  helperText={touched.status && errors.status}
                  sx={fieldStyles}
                  InputLabelProps={{ style: { color: '#ccc' } }}
                >
                  <MenuItem value="Entregado">Entregado</MenuItem>
                  <MenuItem value="Cancelado">Cancelado</MenuItem>
                  <MenuItem value="Pendiente">Pendiente</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Fecha de creación"
                  name="created"
                  type="date"
                  InputLabelProps={{ shrink: true, style: { color: '#ccc' } }}
                  value={values.created}
                  onChange={handleChange}
                  error={Boolean(errors.created && touched.created)}
                  helperText={touched.created && errors.created}
                  sx={fieldStyles}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Fecha de cancelación"
                  name="cancelled"
                  type="date"
                  InputLabelProps={{ shrink: true, style: { color: '#ccc' } }}
                  value={values.cancelled}
                  onChange={handleChange}
                  error={Boolean(errors.cancelled && touched.cancelled)}
                  helperText={touched.cancelled && errors.cancelled}
                  sx={fieldStyles}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Productos (separados por coma)"
                  name="products"
                  placeholder="Ej. Producto A, Producto B"
                  value={values.products}
                  onChange={handleChange}
                  error={Boolean(errors.products && touched.products)}
                  helperText={touched.products && errors.products}
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
