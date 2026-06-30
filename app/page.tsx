import PageContainer from '@/shared/components/PageContainer';
import Paper from '@mui/material/Paper';
import HomeHeroCard from '@/features/home/HeroCard';
import HomeScreenshotSection from '@/features/home/Screenshot';
import HomeObjective from '@/features/home/Objective';
import HomeArchitecture from '@/features/home/Architecture';
import HomeStack from '@/features/home/stack/Stack';
import HomeCapacities from '@/features/home/Capacities';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Container from '@mui/material/Container';

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

      <Container
        sx={{
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>Built by Mario Kawakita</Typography>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '60%',
          }}
        >
          <Fab aria-label="Github Button">
            <GitHubIcon />
          </Fab>
          <Fab aria-label="Linkedin Button">
            <LinkedInIcon />
          </Fab>
        </Container>
      </Container>
    </PageContainer>
  );
}
