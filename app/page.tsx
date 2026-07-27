import Paper from '@mui/material/Paper';
import HomeHeroCard from '@/features/home/HeroCard';
import HomeScreenshotSection from '@/features/home/Screenshot';
import HomeObjective from '@/features/home/Objective';
import HomeArchitecture from '@/features/home/Architecture';
import HomeStack from '@/features/home/stack/Stack';
import HomeCapacities from '@/features/home/Capacities';
import Footer from '@/shared/components/Footer';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ backgroundColor: 'background.default', color: 'text.primary', mt: 0 }}>
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          padding: { sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        square
      >
        <HomeHeroCard />

        <HomeScreenshotSection />

        <HomeObjective />

        <HomeArchitecture />

        <HomeStack />

        <HomeCapacities />
      </Paper>

      <Footer />
    </Box>
  );
}
