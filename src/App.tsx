import React, { useEffect, useState } from 'react';

import { AppBar, Button, Card, Drawer, Divider, Fab, ListItem, ListItemText, Toolbar, Typography, ListItemButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { AddRounded, MapOutlined, TripOrigin } from '@mui/icons-material';
import { add, sub, isAfter, isBefore, Duration } from "date-fns"

import './App.css';
import { Country, Trip, TripWithCountry } from './types/country';

import CountrySetup from './components/country';
import { getLocalStorage, updateLocalStorage } from './util/localStorage';
import TripContainer from './components/trip';
import { calculateDateWindow } from './util/dates';
import WelcomeContainer from './components/welcome';

interface DateRange {
  startDate: Date;
  endDate: Date;
  key?: string;
}

const drawerWidth = 240;

function App() {
  const [countries, setCountries] = useState<{ [name: string]: Country }>({});
  const [showAddCountry, setShowAddCountry] = useState(false);
  const [showAddTrip, setShowAddTrip] = useState(false);
  const [editCountry, setEditCountry] = useState<Country | undefined>(undefined);
  const [editTrip, setEditTrip] = useState<Trip | undefined>(undefined);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);

  useEffect(() => {
    const countries = getLocalStorage();

    if (countries) {
      setCountries(countries);
    } else {
      // First time user
      setShowWelcomeModal(true);
    }
  }, []);

  const updateCountry = (country: string, windowSize: number, daysPerWindow: number) => {
    const updatedCountries = {
      ...countries,
      [country]: {
        windowSize,
        daysPerWindow,
        name: country,
        trips: [],
      }

    }
    setCountries(updatedCountries);

    console.log("Updating storage: ", updatedCountries)
    updateLocalStorage(updatedCountries);

    setShowAddCountry(false);
    setEditCountry(undefined);
  }

  const fabStyle = (pos: number) => {

    return {
      position: 'absolute',
      bottom: 16,
      right: 16 * pos + (4 * pos),
    }
  };

  const showEditCountry = (countryName: string) => {
    setEditCountry(countries[countryName]);

    setShowAddCountry(true);
  }

  const renderCountries = () => {
    return (
      Object.keys(countries).sort().map((countryName) => {
        const country = countries[countryName];

        const daysSpent = calculateDateWindow(country.trips, country.windowSize, country.daysPerWindow);

        return (
          <>
            <ListItem key={countryName}>
              <ListItemButton onClick={() => showEditCountry(countryName)}>
                <ListItemText primary={countryName} secondary={`${daysSpent} / ${country.daysPerWindow} days spent`}></ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        )
      })
    );
  }

  const updateTrip = (trip: TripWithCountry) => {
    const trips = [...countries[trip.country].trips, trip];
    const updatedCountry = { 
      ...countries[trip.country],
      trips,
    }

    console.log(trip.country, trip, updatedCountry)

    const updatedCountries = {
      ...countries,
      [trip.country]: updatedCountry,
    }
    setCountries(updatedCountries);

    updateLocalStorage(updatedCountries);

    setShowAddTrip(false);
    setEditTrip(undefined);

    if (editCountry && editCountry.name === trip.country) {
      setEditCountry(updatedCountry);
    }
  }

  return (
    <>
      <AppBar position="static" style={{ marginBottom: 8 }} sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <MapOutlined />Country Date Tracker
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <ListItem><ListItemText primary={"Countries"} /></ListItem>
        {renderCountries()}
      </Drawer>

      <div className="App" style={{ width: `calc(100% - ${drawerWidth}px)`, marginLeft: `${drawerWidth + 20}px`, maxWidth: `calc(100% - ${drawerWidth}px - 50px)` }}>
        <Grid container spacing={4}>
          {showAddCountry && <CountrySetup country={editCountry} onSave={updateCountry} onCancel={() => {
            setShowAddCountry(false);
            setEditCountry(undefined);
          }} />}
          {showAddTrip && <TripContainer trip={editTrip} onSave={updateTrip} onCancel={() => {
            setEditTrip(undefined);
            setShowAddTrip(false);
          }} countries={Object.keys(countries)} />}
        </Grid>

        <Fab color="primary" variant='extended' aria-label="add" sx={fabStyle(1)} onClick={() => setShowAddCountry(!showAddCountry)}>
          <AddRounded />
          Country
        </Fab>

        <Fab color="primary" variant='extended' aria-label="add" sx={fabStyle(10)} onClick={() => setShowAddTrip(!showAddTrip)}>
          <AddRounded />
          Trip
        </Fab>

        <WelcomeContainer showModal={showWelcomeModal} onClose={() => setShowWelcomeModal(false)}></WelcomeContainer>
      </div>

    </>
  );
}

export default App;
