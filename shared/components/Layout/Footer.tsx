import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
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
  );
}
