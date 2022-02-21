import { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
} from '@mui/material';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { useRouter } from 'next/router';

import styles from '../../../styles/components/NavBar.module.scss';

const pages = ['home', 'portfolio', 'about', 'contact'];

const ResponsiveAppBar = () => {
  const router = useRouter();
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const goPage = (page: string) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
    setDrawerOpen(false);
  };

  return (
    <AppBar elevation={1} className={styles.appbar}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex' }} className={styles.nav_icon_box}>
            <Link href="/">
              <img
                className={styles.nav_icon}
                alt="favicon"
                src="https://res.cloudinary.com/cla/image/upload/v1625984174/Portfolio/favicon_kue56d.png"
              />
            </Link>
          </Box>

          {/* Size md show */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages.map((page, idx) => (
              <div
                key={page}
                className={styles.nav_button}
                onClick={() => goPage(page)}
                onKeyDown={() => goPage(page)}
                role="button"
                tabIndex={idx}
              >
                {page}
              </div>
            ))}
          </Box>
          {/* Size xs Show */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end',
            }}
          >
            <IconButton onClick={handleDrawerOpen}>
              <FormatAlignRightIcon fontSize="large" color="primary" />
            </IconButton>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={handleDrawerClose}
            >
              <Box sx={{ width: 150 }}>
                <List>
                  {pages.map((page) => (
                    <ListItem button key={page} onClick={() => goPage(page)}>
                      <ListItemText
                        primary={page}
                        primaryTypographyProps={{ variant: 'h6' }}
                        sx={{ textAlign: 'center', textTransform: 'uppercase' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
