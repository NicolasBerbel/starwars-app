import React from 'react';
import { ICharacter } from '../../store/Character';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    position: 'relative',
    overflow: 'initial',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    transition: 'transform .15s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  },
  media: {
    width: '100%',
    height: 0,
    paddingBottom: '133%',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    backgroundPosition: 'center',
    transition: 'background-size .15s ease',
    cursor: 'pointer'
  },
  title: {
    marginBottom: 0,
    cursor: 'pointer'
  },
  heightValue: {
    fontWeight: 'bold',
  },
  content: {
    position: 'relative',
    padding: 24,
    margin: '-24% 16px 0',
    backgroundColor: '#fff',
    borderRadius: 4,
    transition: `box-shadow .2s ease-in`,
  },
  locationIcon: {
    marginTop: '.125em',
    marginRight: 4,
    fontSize: 16,
  },
}));

export interface ICharacterProps extends ICharacter {}

export const Character : React.FC<ICharacterProps> = props => {
  const {
    name,
  } = props;

  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`https://starwars-visualguide.com/assets/img/characters/${props.id}.jpg`}
      />
      <CardContent className={classes.content}>
        <Typography variant='h6' className={classes.title} >{name}</Typography>
        <Box color={'grey.500'} alignItems={'start'} mb={1}>
            <LocationOn className={classes.locationIcon} />
            <span>{props.homeworld}</span>
        </Box>
        {props.starships[0] && (
          <Box color={'grey.500'} alignItems={'start'} mb={1}>
            <div>
              <span>Starships: </span><br></br>
              <span>{props.starships.join(', ')}</span>
            </div>
          </Box>
        )}
        <Box color={'grey.500'} alignItems={'center'} mb={1}>
          <span>{props.gender}</span>
        </Box>
        <Box color={'grey.500'} display={'flex'} alignItems={'start'} mb={1}>
          <Typography variant={'body2'} className={classes.heightValue}>
            {(parseInt(props.height) / 100).toFixed(2)}m
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Character;
