// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// //import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// // import ListItem from '@material-ui/core/ListItem';
// // import ListItemIcon from '@material-ui/core/ListItemIcon';
// // import ListItemText from '@material-ui/core/ListItemText';
// // import InboxIcon from '@material-ui/icons/MoveToInbox';
// // import MailIcon from '@material-ui/icons/Mail';
// import { NavLink } from "react-router-dom";
// import "./NavBar.scss";



// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: theme.spacing(1),
//     marginTop:'9px'
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//     background:'rgb(35 35 41)'
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
//     background:'rgb(35 35 41)'
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: -drawerWidth,
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   },
// }));

// export default function Sidenav() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         className={clsx(classes.appBar, {
//           [classes.appBarShift]: open,
//         })}
//       >
//        <header className="header">
//             <nav className="main-navigation">
//                 <ul className="main-navigation-list">
//                     <li>
//                 <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             className={clsx(classes.menuButton, open && classes.hide)}
//           >
//             <MenuIcon />
//           </IconButton></li>
//                     <li className="main-navigation-list__item">
//                         <NavLink
//                             exact={true}
//                             activeClassName="active"
//                             to="/"
//                         >
//                             Home
//                         </NavLink>
//                     </li>
//                     <li className="main-navigation-list__item">
//                         <NavLink
//                             activeClassName="active"
//                             to="/locations"
//                         >
//                             Locations
//                         </NavLink>
//                     </li>
//                     <li className="main-navigation-list__item">
//                         <NavLink
//                             activeClassName="active"
//                             to="/episodes"
//                         >
//                             Episodes
//                         </NavLink>
//                     </li>
//                     <li className="main-navigation-list__item">
//                         <NavLink
//                             activeClassName="active"
//                             to="/dimensions"
//                         >
//                             Dimensions
//                         </NavLink>
//                     </li>
//                 </ul>
//             </nav>
//         </header>
//       </AppBar>
//       <div className="side-nav">
//       <Drawer
//         className={classes.drawer}
//         variant="persistent"
//         anchor="left"
//         open={open}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <div className={classes.drawerHeader}>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon style={{ color: "white"}} /> : <ChevronRightIcon style={{ color: "white" }}/>}
//           </IconButton>
//         </div>
//         <Divider />
//         <header className="header">

//         <nav className="main-navigation">
//                 <ul className="">
//                     <li>
//                 <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             className={clsx(classes.menuButton, open && classes.hide)}
//           >
//             {/* <MenuIcon /> */}
//           </IconButton></li>
//                     <li className="main-navigation-list__item">
//                         <NavLink
//                             exact={true}
//                             activeClassName="active"
//                             to="/"
//                         >
//                             Home
//                         </NavLink>
//                     </li>
//                     <li className="main-navigation-list__item">
//                         <NavLink
//                             activeClassName="active"
//                             to="/locations"
//                         >
//                             Locations
//                         </NavLink>
//                     </li>
//                     <li className="main-navigation-list__item">
//                         <NavLink
//                             activeClassName="active"
//                             to="/episodes"
//                         >
//                             Episodes
//                         </NavLink>
//                     </li>
//                     <li className="main-navigation-list__item">
//                         <NavLink
//                             activeClassName="active"
//                             to="/dimensions"
//                         >
//                             Dimensions
//                         </NavLink>
//                     </li>
//                 </ul>
//             </nav>
//      </header> </Drawer>
//      </div>
//     </div>
//   );
// }
