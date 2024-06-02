import React, { useState } from 'react';

import { Button, Card, CardActionArea, CardActions, TextField, Stack, CardContent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import { DateRangePicker } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import NumberInput from "./numberInput";
import { Country } from '../types/country';

export interface DateRange {
  startDate: Date;
  endDate: Date;
  key?: string;
}

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

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [country, setCountry] = useState<string>(defaultData.name);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datesInCountry, setDatesInCountry] = useState(defaultData.daysPerWindow);
  const [dateWindowSize, setDateWindowSize] = useState(defaultData.windowSize);

  const handleSelect = (ranges) => {
    console.log(ranges);

    setDateRange({
      ...ranges.range1
    })
  }

  return (
    <div>
      <Card style={{ margin: 8, padding: 8, minHeight: 200, minWidth: 400 }}>
        <CardContent>
          <Stack spacing={4}>
            <TextField label="Country" variant="standard" placeholder="Country" value={country} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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

            {showDatePicker && <DateRangePicker
              ranges={[dateRange]}
              onChange={handleSelect}
            />}
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={props.onCancel}>Cancel</Button>
          <Button size="small" onClick={() => props.onSave(country, dateWindowSize, datesInCountry)}>Save</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default CountrySetup;
