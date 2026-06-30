import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { OBJECTIVES_LIST_ITEMS } from './constants/constants';

export default function HomeObjective() {
  return (
    <Card raised>
      <CardContent sx={{ mt: 2 }}>
        <Typography sx={{ pr: 6, mb: 4 }} align="left">
          As a frontend developer, I wanted to build an application that demonstrates real-world
          patterns commonly used in production environments.
        </Typography>
        <Typography align="right" sx={{ mb: 2 }}>
          Instead of another todo application, I chose a finance app because it naturally requires:
        </Typography>
        <List>
          {OBJECTIVES_LIST_ITEMS.map((item) => (
            <ListItem key={item}>
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText>{item}</ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
