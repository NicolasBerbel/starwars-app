import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { TransitionProps } from '@material-ui/core/transitions';
import { ICharacter } from './../../store/Character';
import { IStarship } from './../../store/Starship';

export interface ICharacterDetailsProps extends ICharacter {
  open: boolean,
  onClose: () => void,
  starshipList: IStarship[],
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
    },
    gridList: {
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CharacterDetails : React.FC<ICharacterDetailsProps> = props => {
  const { open, onClose, id, name } = props;
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Avatar
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            />
            <Typography variant="h6" className={classes.title}>
              {name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container maxWidth="sm">
          <List>
            <ListItem>
              <ListItemText primary="Starships" secondary={props.starships.length} />
            </ListItem>
            <GridList cellHeight={160} className={classes.gridList} cols={1}>
              {props.starshipList.map( starship => (
                <GridListTile key={starship.id} cols={1}>
                  <Starship {...starship} />
                  <GridListTileBar
                    title={starship.name}
                    subtitle={starship.model}
                  />
                </GridListTile>
              ))}
            </GridList>
          </List>
        </Container>
      </Dialog>
    </div>
  )
};

const Starship : React.FC<IStarship> = props => {
  const [ url, setUrl ] = React.useState( `https://starwars-visualguide.com/assets/img/starships/${props.id}.jpg` );
  return (
      <img
        style={{
          objectFit: 'cover',
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
        src={url}
        alt={props.name}
        onError={() => setUrl('https://via.placeholder.com/200?text=Image not found')}
      />
  )
}

export default CharacterDetails;