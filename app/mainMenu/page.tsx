"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { Stack, Box, Fab, Card, CardContent, Typography, IconButton, TextField, Button, createTheme, ThemeProvider  } from '@mui/material';
import Link from "next/link";

import {
    APIProvider, Map, AdvancedMarker, Pin, InfoWindow,
} from "@vis.gl/react-google-maps"



export default function MainMenu() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const position = {lat:49.26, lng:-123.25};

  const [showCard, setShowCard] = React.useState(false);

  const handleAddClick = () => {
    setShowCard(true);
  };

  const handleCloseClick = () => {
    setShowCard(false);
  };

  const theme = createTheme({
    palette: {
        primary: {
            main: '#D64C4C',
        }, 
    }
  });

  const [open, setOpen] = React.useState(false);
//   console.log(process.env.NEXT_PUBLIC_API_KEY);

  return (
    <ThemeProvider theme = {theme}>
    <Box position="relative" height = "100vh" width = "100vw">
        {/* Overlay Card */}
        {showCard && (
            <Card
            sx={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                height: '40vh',
                margin: '24px',
                marginY: '110px',
                zIndex: 10,
            }}
            >
            <CardContent
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    padding: 2,
                }}
            >
                <Stack spacing={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <TextField id="filled-basic" label="Drop a Note" variant="filled" />
                        <IconButton onClick={handleCloseClick}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <TextField fullWidth label="Description" id="fullWidth" multiline={true} rows={7} />
                    </Box>
                    <Box>
                        <Button variant="contained">Confirm</Button>
                    </Box>
                </Stack>
                
                
            </CardContent>
            </Card>
        )}
        
        <Stack position="relative" spacing={0} height="100vh">
            <Box sx={{ flexGrow: 1 }}>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch
                        checked={auth}
                        onChange={handleChange}
                        aria-label="login switch"
                        />
                    }
                    label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Link href = "/options"><MenuIcon /></Link>
                    </IconButton>
                    
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Photos
                    </Typography>
                    {auth && (
                        <div>
                            <Link href="/profile">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        </Link>
                        </div>
                    )}
                    </Toolbar>
                </AppBar>
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
                <APIProvider apiKey={process.env.NEXT_PUBLIC_API_KEY as string}>
                        <div style={{height: "100vh"}}>
                            <Map defaultZoom={18} defaultCenter={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
                                <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                                    <Pin background={"red"} borderColor={"black"} glyphColor={"white"}></Pin>
                                </AdvancedMarker>

                                {open && (
                                    <InfoWindow position={position}>
                                        <p>What the flip</p>
                                    </InfoWindow>
                                    )}
                            </Map>
                        </div>
                </APIProvider>
            </Box>
        </Stack>
        <Box sx={{ flexGrow: 1 }}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Fab color="primary" aria-label="add" onClick={handleAddClick}>
                <AddIcon />
            </Fab>
        </Box>
    </Box>
    </ThemeProvider>
    
  );
}
