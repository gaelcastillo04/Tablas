import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import SidebarLayout from './SidebarLayout';
import EmployeeTable from './EmployeeTable';
import Usuarios from './Usuarios';
import Products from './Products';
import OrdersTable from './Ordenes'; 

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <SidebarLayout />,
      children: [
        { path: 'usuarios', element: <Usuarios /> },
        { path: 'productos', element: <Products /> },
        { path: 'ordenes', element: <OrdersTable /> }, 
      ],
    },
  ]);
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
