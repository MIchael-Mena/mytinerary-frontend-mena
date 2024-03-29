import { Box } from '@mui/material';
import Header from '../modules/core/components/header';
import Footer from '../modules/core/components/footer';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useEffect } from 'react';
import { authenticate } from '../store/actions/user';
import { ApiService } from '../services/api.service';
import { ApiResponse } from '../models/ApiResponse';
import { handleSnackbar } from '../utils/apiUtils';
import RouteChangeHandler from '../modules/core/components/route-change-handler';

const componentSizes = {
  header: '70px',
  main: 'calc(100vh - 140px)',
  footer: '70px',
};

const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Me aseguro que el servicio de API este inicializado una sola vez
    ApiService.initialize(dispatch);

    // Si no tengo token, no hago nada
    if (localStorage.getItem('token') === null) return;
    dispatch(authenticate())
      .unwrap()
      .catch((res: ApiResponse<void>) => {
        handleSnackbar(res.message, 'error');
      });
  }, []);

  return (
    <>
      <Header minHeight={componentSizes.header} />
      <Box
        component="main"
        sx={{
          position: 'relative',
          mt: 1,
          minHeight: componentSizes.main,
          display: 'flex',
        }}
      >
        <Outlet />
      </Box>
      <Footer minHeight={componentSizes.footer} />
      <RouteChangeHandler />
      <ScrollRestoration
        // key={'scroll-restoration'}
        // Dejo de funcionar preventScrollReset en NavLink y en useNavigate
        getKey={(location, _matches) => {
          //https:reactrouter.com/en/6.15.0/components/scroll-restoration
          // Si no existe location.state o si existe y preventScrollReset es true, devuelvo null
          const key =
            location.state && !(location.state.preventScrollReset ?? true);
          return key ? null : location.pathname;
        }}
      />
    </>
  );
};

export default Layout;
