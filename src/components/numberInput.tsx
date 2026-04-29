import React from 'react';
import { Box, TextField } from '@mui/material';

export interface BasicNumberInputProps {
  label: string;
  placeholder: string;
  value: number;
  onChange: (event: any, val: any) => void;
  endAdornment?: string;
}

export default function NumberInputBasic(props: BasicNumberInputProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: 'center',
      }}
    >
      <span><p>{props.label}</p></span>
      <TextField
        type="number"
        aria-label={props.label}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e, parseInt(e.target.value) || 0)}
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: props.endAdornment ? <span>{props.endAdornment}</span> : undefined,
        }}
      />
    </Box>
  );
}
