import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SCREENSHOT_LIST_ITEMS } from './constants/constants';

export default function HomeScreenshotSection() {
  return (
    <Card raised>
      <CardMedia
        sx={{ height: '40vh', width: '100%' }}
        // TODO get the screenshot
        image="/pexels-anna-nekrashevich-6801636.jpg"
        title={'Dashboard Screenshot'}
      />
      <CardContent sx={{ mt: 2 }}>
        <Typography variant="h6">A realistic finance dashboard containing: </Typography>
        <List>
          {SCREENSHOT_LIST_ITEMS.map((item) => (
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
