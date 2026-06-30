import Card from '@mui/material/Card';
import { ITechStack } from '../constants/constants';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';

export default function StackCard({ stack }: { stack: ITechStack }) {
  return (
    <Card sx={{ height: '100%' }} raised>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {stack.title}
        </Typography>
        <Typography sx={{ mb: 1 }}>Why?</Typography>
        <Typography sx={{ mb: 1 }}>{stack.subtitle}</Typography>
        {stack.provides && <Typography>{`${stack.title} provides: `}</Typography>}

        <List>
          {stack.reasons.map((reason) => (
            <ListItem key={reason}>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText>{reason}</ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
