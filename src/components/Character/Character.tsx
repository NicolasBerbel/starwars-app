import React from 'react';
import { ICharacter } from '../../store/Character';
import { useInView } from 'react-intersection-observer'
import { Theme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { starshipStore, IStarshipResponse } from './../../store/Starship';
import api from '../../services/api';
import CharacterDetails from './CharacterDetails';

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
  },
  title: {
    marginBottom: 0,
  },
  heightValue: {
    fontWeight: 'bold',
  },
  genderValue: {
    textTransform: 'capitalize',
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
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [ref, inView] = useInView();
  const { state: starshipsState, dispatch: starshipDispatch } = React.useContext(starshipStore);
  const {
    name,
  } = props;
  const { starships, loadingStarships } = starshipsState;
  const starshipsIds = props.starships.map(s => parseInt(s.split('/').reverse()[1]))
  const classes = useStyles();
  const isLoadingStarship = (id : number) => loadingStarships.includes(id);
  const isLoadedStarship = (id : number) => Object.keys(starships).includes(id.toString());
  const height = (parseInt(props.height) / 100);

  React.useEffect( () => {
    starshipsIds.forEach(( id => {
      if( isLoadingStarship(id) || isLoadedStarship(id) ) return false;
      starshipDispatch({type: 'request-single', id });
      api.get<IStarshipResponse>(`/starships/${id}/`)
        .then(
          res => starshipDispatch({type: 'success-single', response: res.data}),
          () => starshipDispatch({type: 'failure-single', id})
        );
    }))
  }, [inView])
  
  return (
    <>
      <Card elevation={0} className={classes.root} ref={ref}>
        <CardMedia
          className={classes.media}
          image={`https://starwars-visualguide.com/assets/img/characters/${props.id}.jpg`}
        />
        <CardContent className={classes.content}>
          <Typography variant='h6' className={classes.title} >{name}</Typography>
          {props.gender !== 'n/a' && (
            <Box color={'grey.500'} alignItems={'center'} mb={1}>
              <span className={classes.genderValue}>{props.gender}</span>
            </Box>
          )}
          {!isNaN(height) && (
            <Box color={'grey.500'} display={'flex'} alignItems={'start'} mb={1}>
              <Typography variant={'body2'} className={classes.heightValue}>
                {height.toFixed(2)}m
              </Typography>
            </Box>
          )}
          <CardActions>
            {props.starships[0] && (
              <Box justifyContent='flex-end'>
                <Tooltip title={starshipsIds.find(isLoadingStarship) ? `Loading...` : (
                  starshipsIds.map( id => (
                    isLoadedStarship(id) ? (
                      <div key={id}>{starships[id].name}</div>
                    ) : (
                      <div key={id}>{id}</div>
                    )
                  ))
                )}>
                  <Badge color='secondary' badgeContent={props.starships.length}>
                    <Button
                      size='small'
                      color='inherit'
                      variant='outlined'
                      onClick={() => setDetailsOpen(true)}
                    >
                      <span>Starships</span>
                    </Button>
                  </Badge>
                </Tooltip>
              </Box>
            )}
          </CardActions>
        </CardContent>
      </Card>
      <CharacterDetails
        {...props}
        starshipList={starshipsIds.find(i => !isLoadedStarship(i)) ? [] : starshipsIds.map(i => starships[i])}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
}

export default Character;
