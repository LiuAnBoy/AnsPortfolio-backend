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
  Divider,
  Stack,
  Fab,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useRouter } from 'next/router';
import { KeyboardArrowUp } from '@mui/icons-material';

import styles from '../../../styles/components/NavBar.module.scss';
import ScrollButton from '../../layouts/ScrollButton';

const pages = ['Home', 'Portfolio', 'About', 'Contact'];

function HideOnScroll(props: ScrollProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// TODO: figure out what is props type
const ResponsiveAppBar = (props: any) => {
  const router = useRouter();
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const goPage = (page: string) => {
    if (page === 'Home') {
      router.push('/');
    } else {
      router.push(`/${page.toLowerCase()}`);
    }
    setDrawerOpen(false);
  };

  const strokeStyle = {
    strokeDasharray: '760',
    strokeWidth: '2px',
    strokeDashoffset: 0,
  };

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar id="back-to-top-anchor" elevation={0} className={styles.appbar}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Box sx={{ display: 'flex' }}>
                <Link href="/">
                  <Box sx={{ display: 'flex', cursor: 'pointer' }}>
                    <img
                      className={styles.nav_icon}
                      alt="favicon"
                      src="https://res.cloudinary.com/cla/image/upload/v1646460171/Portfolio/favicon_hcp9q9.svg"
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 1,
                      }}
                    >
                      <span style={{ lineHeight: 1, letterSpacing: 1 }}>
                        An&#39;s
                      </span>
                      <span style={{ lineHeight: 1, letterSpacing: 1 }}>
                        Portfolio
                      </span>
                    </Box>
                  </Box>
                </Link>
              </Box>

              {/* Size md show */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  justifyContent: 'flex-end',
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
                    <svg
                      height="35"
                      width="120"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        className={styles.shape}
                        height="35"
                        width="120"
                        style={
                          router.pathname.includes(page.toLowerCase())
                            ? strokeStyle
                            : {}
                        }
                      />
                    </svg>
                    <div>{page}</div>
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
                  <FormatAlignRightIcon
                    fontSize="large"
                    sx={{ color: '#fff' }}
                  />
                </IconButton>
                <Drawer
                  anchor="left"
                  open={isDrawerOpen}
                  onClose={handleDrawerClose}
                  transitionDuration={{ appear: 100, enter: 600, exit: 200 }}
                >
                  <Box
                    sx={{
                      width: '100vw',
                      height: '100vh',
                      p: 2,
                      bgcolor: '#1c1c20',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Box sx={{ display: 'flex' }}>
                        <img
                          className={styles.nav_icon}
                          alt="favicon"
                          src="https://res.cloudinary.com/cla/image/upload/v1646460171/Portfolio/favicon_hcp9q9.svg"
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginLeft: 1,
                            color: '#fff',
                          }}
                        >
                          <span style={{ lineHeight: 1, letterSpacing: 1 }}>
                            An&#39;s
                          </span>
                          <span style={{ lineHeight: 1, letterSpacing: 1 }}>
                            Portfolio
                          </span>
                        </Box>
                      </Box>

                      <IconButton onClick={handleDrawerClose}>
                        <CloseIcon sx={{ color: '#fff', fontSize: 36 }} />
                      </IconButton>
                    </Box>
                    <Divider sx={{ borderColor: '#fff', my: 2 }} />
                    <List>
                      {pages.map((page) => (
                        <ListItem
                          button
                          key={page}
                          onClick={() => goPage(page)}
                        >
                          <ListItemText
                            primary={page}
                            primaryTypographyProps={{ variant: 'h6' }}
                            sx={{
                              textAlign: 'left',
                              textTransform: 'uppercase',
                              color: '#fff',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ borderColor: '#fff', my: 2 }} />
                    <Stack
                      direction="row"
                      spacing={1}
                      className={styles['icon-group']}
                      sx={{ justifyContent: 'end' }}
                    >
                      <a
                        href="https://github.com/LiuAnBoy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/lu-an-chen-016676137"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedInIcon />
                      </a>
                      <a
                        href="https://line.me/ti/p/tjuaU7Gprc"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="/images/line-icon.png" alt="line" />
                      </a>
                    </Stack>
                  </Box>
                </Drawer>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <ScrollButton {...props}>
        <Fab color="info" size="large">
          <KeyboardArrowUp sx={{ color: '#fff' }} />
        </Fab>
      </ScrollButton>
    </>
  );
};
export default ResponsiveAppBar;

interface ScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}
