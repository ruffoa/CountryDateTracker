import React from "react";
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

export interface WelcomeProps {
  onClose: () => void;
}

const style = {
  // position: 'absolute' as 'absolute',
  // top: '50%',
  marginLeft: '40px',
  marginTop: '10px',
  // transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

function WelcomeContainer(props: WelcomeProps) {
  return (
    <div>
      <Card sx={style}>
        <CardContent>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome!
          </Typography>


          Click the <em>+ Country</em> button in the left navigation bar to add a new country
        </CardContent>
        <CardActions>
          <Button size="small" onClick={props.onClose}>Close</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default WelcomeContainer;