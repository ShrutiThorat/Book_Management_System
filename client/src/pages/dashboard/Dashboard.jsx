import './Dashboard.scss';

import Grid from '@mui/material/Grid2';
import LibraryIcon from '../../assets/literature.png';

const Dashboard = () => {
  return (
    <div className='dashboardMain'>
      <div className='dashboardArea'>
        <Grid container spacing={2}>
          <Grid size={{ md: 6 }}>
            <p className='welcomeMessage'>Welcome Reader</p>
            <span className='subTitle'>
              Welcome to the Heart of Your Bookstore – Let’s Inspire Every
              Reader!
            </span>
          </Grid>
          <Grid size={{ md: 6 }}>
            <img src={LibraryIcon} height={350} width={350} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
