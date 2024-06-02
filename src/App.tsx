import React, { useEffect, useState } from 'react';

import { AppBar, Button, Card, Drawer, Divider, Fab, ListItem, ListItemText, Toolbar, Typography, ListItemButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { AddRounded, MapOutlined } from '@mui/icons-material';
import { add, sub, isAfter, isBefore, Duration } from "date-fns"

import './App.css';
import { Country } from './types/country';

import CountrySetup from './components/country';
import { getLocalStorage, updateLocalStorage } from './util/localStorage';

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

  useEffect(() => {
    const countries = getLocalStorage();

    if (countries) {
      setCountries(countries);
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
        const windowStart = sub(new Date(), { days: country.windowSize });

        const daysSpent = country.trips.filter((trip) => {
          isAfter(trip.startDate, windowStart)
        });

        return (
          <>
            <ListItem key={countryName}>
              <ListItemButton onClick={() => showEditCountry(countryName)}>
                <ListItemText primary={countryName} secondary={`${daysSpent} / ${country.windowSize} days spent`}></ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        )
      })
    );
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
          {showAddCountry && <CountrySetup country={editCountry} onSave={updateCountry} onCancel={() => setShowAddCountry(false)} />}
        </Grid>

        <Fab color="primary" variant='extended' aria-label="add" sx={fabStyle(1)} onClick={() => setShowAddCountry(!showAddCountry)}>
          <AddRounded />
          Country
        </Fab>

        <Fab color="primary" variant='extended' aria-label="add" sx={fabStyle(10)} onClick={() => setShowAddTrip(!showAddTrip)}>
          <AddRounded />
          Trip
        </Fab>
      </div>

    </>
  );
}

export default App;
