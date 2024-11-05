import './Menu.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid2';
import { Tooltip } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

const Menu = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigationData = [
    {
      index: 1,
      link: 'dashboard',
      page: 'Dashboard',
      icon: <DashboardIcon />,
      disabled: false,
    },
    {
      index: 2,
      link: 'all-books',
      page: 'All Books',
      icon: <LibraryBooksIcon />,
      disabled: false,
    },
    {
      index: 3,
      link: 'about-us',
      page: 'About Us',
      icon: <InfoIcon />,
      disabled: false,
    },
    {
      index: 4,
      link: 'settings',
      page: 'Settings',
      icon: <SettingsIcon />,
      disabled: true,
    },
  ];

  const handleListItemClick = (disabled, index, link) => {
    if (!disabled)
      if (selectedIndex !== index) {
        setSelectedIndex(index);
        navigate(`/${link}`);
        props.resetRedirect(link);
      }
  };

  const generateMenuItems = () => {
    let menuSet = [];
    navigationData?.forEach((item) => {
      menuSet.push(
        <Grid size={{ md: 3 }} key={item?.index}>
          <div
            className='menuItem'
            onClick={() =>
              handleListItemClick(item?.disabled, item?.index, item?.link)
            }
          >
            <Tooltip title={item?.page} placement='top'>
              <span
                className={
                  'menuItemIcon ' +
                  (selectedIndex === item?.index ? 'active ' : ' ') +
                  (item?.disabled ? 'disabled' : '')
                }
              >
                {item?.icon}
              </span>
            </Tooltip>
          </div>
          <div
            className={
              'activeIndicatorWrapper ' +
              (selectedIndex === item.index ? '' : 'hidden')
            }
          >
            <div className='activeIndicator' />
          </div>
        </Grid>
      );
    });
    return menuSet;
  };

  return (
    <div className='menuWrapper'>
      <Grid container spacing={2}>
        <Grid size={{ md: 4.6, sm: 6, xs: 6 }}>
          <div className='navigationHead'>
            <span className='titleHead'>Book Store</span>
          </div>
        </Grid>
        <Grid size={{ md: 6.5, sm: 6, xs: 6 }}>
          <div className='menuItemsWrapper'>
            <Grid container spacing={1}>
              {generateMenuItems()}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Menu;
