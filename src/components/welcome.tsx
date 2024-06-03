import React, { useState } from "react";
import { Button, Card, CardActionArea, CardActions, TextField, Stack, CardContent, List, ListItem, ListItemButton, ListItemText, Typography, Modal, Box } from '@mui/material';

export interface WelcomeProps {
  showModal: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function WelcomeContainer(props: WelcomeProps) {
  const [name, setName] = useState("");

  return (
    <div>
      <Modal open={props.showModal} onClose={props.onClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome!
          </Typography>


          Click the <em>+ Country</em> button in the bottom right to add a new country
        </Box>
      </Modal>
    </div>
  );
}

export default WelcomeContainer;