import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';

import { Button, Card, CardActionArea, CardActions, MenuItem, TextField, Stack, CardContent, Select, SelectChangeEvent, FormHelperText, FormControl } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Trip, TripWithCountry } from '../types/country';

export interface DateRange {
  startDate: Date;
  endDate: Date;
  key?: string;
}

export interface TripProps {
  onSave: (trip: TripWithCountry) => void;
  onCancel: () => void;
  trip?: Trip;
  countries: Array<string>;
}

function TripContainer(props: TripProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tripName, setTripName] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [country, setCountry] = useState("");
  const [formErrors, setFormErrors] = useState<{ country?: string, tripName?: string }>({});

  const handleSelect = (ranges) => {
    console.log(ranges);

    setDateRange({
      ...ranges.range1
    })
  }

  const handleCountryChanged = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  const validateForm = () => {
    if (country.length < 1) {
      setFormErrors({
        ...formErrors,
        country: "No country set",
      });

      return;
    }

    if (tripName.length < 1) {
      setFormErrors({
        ...formErrors,
        tripName: "No trip name set",
      });

      return;
    }

    return props.onSave({
      name: tripName,
      description: tripDescription,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      country,
    })
  }

  return (
    <div>
      <Card style={{ margin: 8, padding: 8, minHeight: 200, minWidth: 400 }}>
        <CardContent>
          <Stack spacing={4}>
            <FormControl error={formErrors.tripName ? true : false}>
              <TextField label="Trip Name" variant="standard" placeholder="Trip Name" value={tripName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTripName(event.target.value);
              }} />
              <FormHelperText>{formErrors.tripName ?? ''}</FormHelperText>
            </FormControl>

            <TextField label="Description" variant="standard" placeholder="Trip Description" value={tripDescription} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTripDescription(event.target.value);
            }} />

            <FormControl error={formErrors.country ? true : false}>
              <Select
                value={country}
                label="Country"
                onChange={handleCountryChanged}
              >
                {
                  props.countries.map((country) => {
                    return (
                      <MenuItem key={country} value={country}>{country.substring(0, 1).toLocaleUpperCase() + country.substring(1)}</MenuItem>
                    )
                  })
                }
              </Select>
              <FormHelperText>{formErrors.country ?? ''}</FormHelperText>
            </FormControl>

            <DateRangePicker
              ranges={[dateRange]}
              onChange={handleSelect}
            />
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

export default TripContainer