import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { HOME_CAPACITIES } from './constants/constants';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import Container from '@mui/material/Container';

export default function HomeCapacities() {
  return (
    <Card raised>
      <CardHeader title={'What This Project Demonstrates'} />
      <CardContent>
        <Grid container spacing={4} sx={{ justifyContent: 'center', alignItems: 'stretch' }}>
          {HOME_CAPACITIES.map((cap) => (
            <Grid size={{ xs: 12, md: 4 }} key={cap}>
              <Container sx={{ display: 'flex', gap: 2 }}>
                <CheckIcon />
                <Typography>{cap}</Typography>
              </Container>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
