'use client';

import Button from '@mui/material/Button';
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <div>
      <Button variant="outlined" onClick={() => toast('Hello World')}>
        Test
      </Button>
    </div>
  );
}
