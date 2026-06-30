import PageContainer from '@/shared/components/PageContainer';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function DashboardPage() {
  return (
    <PageContainer>
      <Paper>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}></Grid>
      </Paper>
    </PageContainer>
  );
}
