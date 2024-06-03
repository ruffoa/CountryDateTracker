import React, { useEffect, useState } from 'react';

import { Button, Card, CardActionArea, CardActions, TextField, Stack, CardContent, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import NumberInput from "./numberInput";
import { Country } from '../types/country';
import { differenceInCalendarDays, sub } from 'date-fns';

export interface CountryProps {
  onSave: (country: string, windowSize: number, daysPerWindow: number) => void;
  onCancel: () => void;
  country?: Country;
}

function CountrySetup(props: CountryProps) {
  const defaultData: Country = props.country ? props.country : {
    daysPerWindow: 0,
    name: "",
    windowSize: 0,
    trips: [],
  }

  const [country, setCountry] = useState<string>(defaultData.name);
  const [datesInCountry, setDatesInCountry] = useState(defaultData.daysPerWindow);
  const [dateWindowSize, setDateWindowSize] = useState(defaultData.windowSize);
  const [trips, setTrips] = useState(defaultData.trips);
  const [formErrors, setFormErrors] = useState<{ country?: string }>({});

  useEffect(() => {
    if (!props.country) {
      return;
    }

    setCountry(props.country.name);
    setDatesInCountry(props.country.daysPerWindow);
    setDateWindowSize(props.country.windowSize);
    setTrips(props.country.trips);
  }, [props.country]);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description' },
    { field: 'startDate', headerName: 'Start Date', valueFormatter: (value) => new Date(value).toDateString() },
    { field: 'endDate', headerName: 'End Date', valueFormatter: (value) => new Date(value).toDateString() },
    { field: 'daysInCountry', headerName: 'Days In Country', valueGetter: (value, row) => differenceInCalendarDays(row.endDate, row.startDate) + 1 },
  ];

  const validateForm = () => {
    props.onSave(country, dateWindowSize, datesInCountry);
  }

  return (
    <div>
      <Card style={{ margin: 8, padding: 8, minHeight: 200, minWidth: 400 }}>
        <CardContent>
          <Stack spacing={4}>
            <TextField helperText={formErrors.country } error={formErrors.country ? true : false } label="Country" variant="standard" placeholder="Country" value={country} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCountry(event.target.value);
            }} />

            <Grid container spacing={4}>
              <Grid xs={6}>
                <NumberInput
                  label="Days allowed per period"
                  placeholder="Type a number…"
                  value={datesInCountry}
                  onChange={(event, val) => setDatesInCountry(val)}
                />
              </Grid>
              <Grid xs={6}>
                <NumberInput
                  label="Days per period"
                  placeholder="Type a number…"
                  value={dateWindowSize}
                  onChange={(event, val) => setDateWindowSize(val)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={4}>
            {props.country?.windowSize &&
            <>
            <Grid xs={6}>
              <Typography>Period Start</Typography>
            </Grid>
            <Grid xs={6}>
              {sub(new Date(), { days: props.country.windowSize }).toDateString()}
              </Grid>
            </>
            }
            </Grid>

            {props.country.trips &&
              <>
                <Typography>Trips</Typography>
                {props.country.trips.length ? <DataGrid columns={columns} rows={trips} getRowId={(row) => row.name} autosizeOnMount>
                </DataGrid>
                  : <Typography>No Trips Added</Typography>
                }

              </>
            }
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={props.onCancel}>Cancel</Button>
          <Button size="small" onClick={validateForm}>Save</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default CountrySetup;
