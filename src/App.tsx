import React from 'react';
import clsx from 'clsx';
import {
  CssBaseline,
  AppBar,
  Typography,
  Link,
  Toolbar,
  List,
  IconButton,
  // Badge,
  Drawer,
  Divider,
  Container,
  Box,
  Grid,
  // Paper,
  // useMediaQuery,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  // Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  Keyboard as KeyboardIcon,
  ThreeDRotation as ThreeDRotationIcon,
  Dashboard as DashboardIcon,
  CloudUpload as CloudUploadIcon,
} from '@material-ui/icons';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import './App.css';

import CanvasArea from './CanvasArea';
import SelectView from './SelectView';
import { Row } from './deserialize';
import { useDropzone } from 'react-dropzone';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Please use or '}
      <Link
        href="https://github.com/FrancisUsher/keeb-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        improve keeb.app
      </Link>
      {' however you see fit'}
      {'. New ideas will be strongly encouraged.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  menuButton: {
    // marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  collapseButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    position: 'absolute',
    width: drawerWidth,
    height: '100vh',
    flexShrink: 0,
  },
  drawerPaper: {
    position: 'relative',
    // whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginLeft: 240,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [view, setView] = React.useState('plate-gen');
  const setPlateView = () => {
    setView('plate-gen');
  };
  const setRenderView = () => {
    return setView('render-view');
  };
  const setLayoutView = () => {
    return setView('layout-editor');
  };
  const [rows, setRows] = React.useState([] as Row[]);
  const onDrop = React.useCallback((acceptedFiles: Blob[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const textStr = reader.result as string;
        setRows(JSON.parse(textStr));
        // console.log(JSON.parse(textStr));
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
          // type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    []
  );
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed" className={clsx(classes.appBar)}>
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              keeb.app
            </Typography>
            {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <Toolbar />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <div
            className={clsx(
              classes.toolbarIcon,
              !open && classes.collapseButtonHidden
            )}
          >
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <IconButton color="inherit" onClick={setLayoutView}>
              <DashboardIcon />
            </IconButton>
            Layout Editor
          </List>
          <Divider />
          <List>
            <IconButton color="inherit" onClick={setPlateView}>
              <KeyboardIcon />
            </IconButton>
            Plate Generator
          </List>

          <Divider />

          <List>
            <IconButton color="inherit" onClick={setRenderView}>
              <ThreeDRotationIcon />
            </IconButton>
            Preview Render
          </List>
          <div className="file-input-box" {...getRootProps()}>
            <input {...getInputProps()} />
            <IconButton color="inherit">
              <CloudUploadIcon />
            </IconButton>

            <p>Drag 'n' drop a KLE file here, or click to select files</p>
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Recent Deposits */}
              <Grid item xs={12}>
                <CanvasArea view={view} rows={rows}></CanvasArea>
                <SelectView view={view} onViewChange={setView}></SelectView>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
