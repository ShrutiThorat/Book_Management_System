import './Pages.scss';
import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Menu = lazy(() => import('../container/menu/Menu'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const AllBooks = lazy(() => import('../pages/allBooks/AllBooks'));

const Pages = () => {
  return (
    <div className='mainWrapper'>
      <div className='mainHeader'></div>
      <div className='mainMenu'>
        <Menu />
      </div>
      <div className='mainContent'>
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          <Route
            path='/dashboard'
            element={
              <Suspense fallback={<div className='suspenseLoaderIcon'></div>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path='/all-books'
            element={
              <Suspense
                fallback={
                  <div className='suspenseLoaderIcon'>
                    <CircularProgress style={{ marginTop: '300px' }} />
                  </div>
                }
              >
                <AllBooks />
              </Suspense>
            }
          />

          <Route
            path='/about'
            element={
              <Suspense
                fallback={
                  <div className='suspenseLoaderIcon'>
                    <CircularProgress style={{ marginTop: '300px' }} />
                  </div>
                }
              ></Suspense>
            }
          />
          <Route
            path='/settings'
            element={
              <Suspense
                fallback={
                  <div className='suspenseLoaderIcon'>
                    <CircularProgress style={{ marginTop: '300px' }} />
                  </div>
                }
              ></Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pages;
