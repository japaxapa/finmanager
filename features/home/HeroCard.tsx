import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { HERO_LIST_ITEMS } from './constants/constants';

export default function HomeHeroCard() {
  return (
    <Card raised>
      <CardMedia
        sx={{ height: '40vh', width: '100%' }}
        image="/pexels-anna-nekrashevich-6801636.jpg"
        title={'Finance background'}
      />
      <CardHeader title={'Finance tracker'} />
      <CardContent>
        <Typography align="justify">
          A portfolio project built to demonstrate how I design modern frontend applications using
          React, TypeScript, server state management, form validation, and data visualization.
        </Typography>
        <CardActions sx={{ justifyContent: 'space-between', mt: 2, mb: 2 }}>
          <Button>Live Demo</Button>
          <Button>View Code</Button>
        </CardActions>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Built to showcase:</Typography>
            <List>
              {HERO_LIST_ITEMS.map((item) => (
                <ListItem key={item}>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText>{item}</ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
