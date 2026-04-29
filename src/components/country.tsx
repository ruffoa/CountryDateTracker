import React, { useEffect, useState } from 'react';

import { Button, Card, CardActions, TextField, Stack, CardContent, Typography, Accordion, AccordionDetails, AccordionSummary, AccordionActions } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import NumberInput from "./numberInput";
import { Country } from '../types/country';
import { differenceInCalendarDays, sub } from 'date-fns';

export interface CountryProps {
  onSave: (country: string, windowSize: number, daysPerWindow: number) => void;
  onCancel: () => void;
  country?: Country;
  daysSpent?: number;
}

function CountrySetup(props: CountryProps) {
  const defaultData: Country = props.country ? props.country : {
    daysPerWindow: 0,
    name: "",
    windowSize: 0,
    trips: [],
  } as const;

  const [country, setCountry] = useState<string>(defaultData.name);
  const [datesInCountry, setDatesInCountry] = useState(defaultData.daysPerWindow);
  const [dateWindowSize, setDateWindowSize] = useState(defaultData.windowSize);
  const [trips, setTrips] = useState(defaultData.trips);

  useEffect(() => {
    setCountry(props?.country?.name ?? defaultData.name);
    setDatesInCountry(props?.country?.daysPerWindow ?? 0);
    setDateWindowSize(props?.country?.windowSize ?? 0);
    setTrips(props?.country?.trips ?? []);
  }, [props.country, defaultData.name]);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description' },
    { field: 'startDate', headerName: 'Start Date', valueFormatter: (value) => new Date(value).toDateString() },
    { field: 'endDate', headerName: 'End Date', valueFormatter: (value) => new Date(value).toDateString() },
    { field: 'daysInCountry', headerName: 'Days In Country', type: 'number', valueGetter: (value, row) => differenceInCalendarDays(row.endDate, row.startDate) + 1 },
  ];

  const validateForm = () => {
    props.onSave(country, dateWindowSize, datesInCountry);
  }

  function CustomGridExportToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fileName: `Country date tracker - ${country}`,
            delimiter: ';',
            utf8WithBom: true,
          }} />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  const updateCountrySettingsComponents = (
    <Grid container spacing={4}>
      <Grid sm={6} xs={12}>
        <NumberInput
          label="Days allowed per period"
          placeholder="Type a number…"
          value={datesInCountry}
          onChange={(event, val) => setDatesInCountry(val)}
        />
      </Grid>
      <Grid sm={6} xs={12}>
        <NumberInput
          label="Days per period"
          placeholder="Type a number…"
          value={dateWindowSize}
          onChange={(event, val) => setDateWindowSize(val)}
        />
      </Grid>
    </Grid>
  )

  const updateCountrySettingsActions = (
    <>
      <Button size="small" onClick={props.onCancel}>Cancel</Button>
      <Button size="small" onClick={validateForm}>Save</Button>
    </>
  )

  return (
    <div>
      <Card style={{ margin: 8, padding: 8, minHeight: 200, minWidth: 400 }}>
        <CardContent>
          <Stack spacing={4}>
            <TextField label="Country" variant="standard" placeholder="Country" value={country} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCountry(event.target.value);
            }} />

            {props.country?.trips && (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }} component="span">{props.daysSpent ? `${datesInCountry - props.daysSpent} Days Remaining` : null}</Typography>
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      Rule: {datesInCountry} / {dateWindowSize} days
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {updateCountrySettingsComponents}
                  </AccordionDetails>
                  <AccordionActions>
                    {updateCountrySettingsActions}
                  </AccordionActions>
                </Accordion>

                <Typography>Trips</Typography>
                {props.country.trips.length ? <DataGrid columns={columns} rows={trips} getRowId={(row) => row.name} autosizeOnMount slots={{ toolbar: CustomGridExportToolbar }} >
                </DataGrid>
                  : <Typography>No Trips Added</Typography>
                }
              </>
            )}

            {!props.country?.trips &&
              <>
                {updateCountrySettingsComponents}
              </>
            }
            <Grid container spacing={4} sx={{
              justifyContent: "flex-end",
              alignItems: "center",
            }} direction={'row'}       >
              {props.country?.windowSize &&
                <Typography sx={{ color: 'text.secondary' }}>Current rolling window: {sub(new Date(), { days: props.country.windowSize }).toDateString()} to {new Date().toDateString()}</Typography>
              }
            </Grid>
          </Stack>
        </CardContent>
        <CardActions>
          {!props.country?.trips && (
            updateCountrySettingsActions
          )}
          {props.country?.trips && (
            <Button size="small" onClick={props.onCancel}>Close</Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}

export default CountrySetup;
