import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useState } from 'react';

interface ICategorySpeedDial {
  handleOpenModal: () => void;
  toggleDelete: () => void;
}

export default function CategorySpeedDial({ handleOpenModal, toggleDelete }: ICategorySpeedDial) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = () => {
    handleOpenModal();
    handleClose();
  };

  const actions = [
    { icon: <AddIcon />, name: 'Create', clickFn: handleCreate },
    { icon: <DeleteForeverIcon />, name: 'Delete', clickFn: toggleDelete },
  ];

  return (
    <Box
      sx={{ transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 16, right: 16 }}
    >
      <SpeedDial
        ariaLabel="Categories Actions"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                open: true,
                title: action.name,
              },
            }}
            onClick={action.clickFn}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
