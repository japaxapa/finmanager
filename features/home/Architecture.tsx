import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ARCHITECTURE_SHOWCASE } from './constants/constants';

export default function HomeArchitecture() {
  return (
    <Card raised>
      <CardContent sx={{ mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Architecture Showcase
        </Typography>

        {ARCHITECTURE_SHOWCASE.map((item, index) => {
          if (index == ARCHITECTURE_SHOWCASE.length - 1) {
            return (
              <div key={item} className="flex flex-col items-center">
                <Typography sx={{ padding: '1rem 0' }}>{item}</Typography>
              </div>
            );
          } else {
            return (
              <div key={item} className="flex flex-col items-center">
                <Typography sx={{ padding: '1rem 0' }}>{item}</Typography>

                <ArrowDownwardIcon />
              </div>
            );
          }
        })}
      </CardContent>
    </Card>
  );
}
