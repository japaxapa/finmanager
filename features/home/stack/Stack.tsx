import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { TECH_STACK_LIST } from '../constants/constants';
import StackCard from './StackCard';
import Grid from '@mui/material/Grid';

export default function HomeStack() {
  return (
    <Card raised>
      <CardHeader title={'Why this Stack?'} />
      <CardContent>
        <Grid container spacing={4} sx={{ justifyContent: 'center', alignItems: 'stretch' }}>
          {TECH_STACK_LIST.map((stack) => (
            <Grid size={{ xs: 12, md: 6 }} key={stack.title}>
              <StackCard stack={stack} key={stack.title} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
