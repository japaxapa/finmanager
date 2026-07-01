import PageContainer from '@/shared/components/PageContainer';
import Paper from '@mui/material/Paper';
import HomeHeroCard from '@/features/home/HeroCard';
import HomeScreenshotSection from '@/features/home/Screenshot';
import HomeObjective from '@/features/home/Objective';
import HomeArchitecture from '@/features/home/Architecture';
import HomeStack from '@/features/home/stack/Stack';
import HomeCapacities from '@/features/home/Capacities';
import Footer from '@/shared/components/Footer';

export default function Home() {
  return (
    <PageContainer className="items-start flex flex-col">
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          padding: { sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <HomeHeroCard />

        <HomeScreenshotSection />

        <HomeObjective />

        <HomeArchitecture />

        <HomeStack />

        <HomeCapacities />
      </Paper>

      <Footer />
    </PageContainer>
  );
}
