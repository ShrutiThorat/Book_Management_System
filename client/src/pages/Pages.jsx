import './Pages.scss';
import { lazy, Suspense } from 'react';
// import Menu from '../container/menu/Menu';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const Menu = lazy(() => import('../container/menu/Menu'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const AllBooks = lazy(() => import('../pages/allBooks/AllBooks'));

const Pages = () => {
  return (
    <div className='mainWrapper'>
      <div className='mainHeader'>
        {/* <Header setAsAdmin={(value) => setAdminView(value)} /> */}
      </div>
      <div className='mainMenu'>
        <Menu />
      </div>
      <div className='mainContent'>
        <Routes>
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          <Route
            path='/dashboard'
            element={
              <Suspense
                fallback={
                  <div className='suspenseLoaderIcon'>
                    {/* <img src={AnalysisIcon} /> */}
                  </div>
                }
              >
                <Dashboard
                //   access={userConfig}
                //   changeActiveMenu={modifyMenuView}
                />
              </Suspense>
            }
          />
          {/* <Route
            path='/log-analysis/:mode?/:id?'
            element={
              <Suspense
                fallback={
                  <div className='suspenseLoaderIcon'>
                    <img src={AnalysisIcon} />
                  </div>
                }
              >
                <LogAnalysis access={userConfig} fileLimits={fileInputLimit} />
              </Suspense>
            }
          /> */}
          <Route
            path='/all-books'
            element={
              <Suspense
                fallback={
                  <div className='suspenseLoaderIcon'>
                    {/* <img src={AnalysisIcon} /> */}
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
                    {/* <img src={AnalysisIcon} /> */}
                  </div>
                }
              >
                {/* <Settings /> */}
              </Suspense>
            }
          />
          <Route
            path='/settings'
            element={
              <Suspense
                fallback={
                  <div className='suspenseLoaderIcon'>
                    {/* <img src={AnalysisIcon} /> */}
                  </div>
                }
              >
                {/* <Settings /> */}
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pages;
