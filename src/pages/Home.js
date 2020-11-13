import React, {Fragment} from 'react'
import Title from '../components/Title'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  iconButton:{
    marginLeft:10
  }
}));


export default function Home() {

  const classes = useStyles();


  return(
    <Fragment>
      <Title>Home</Title>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            Задач мне
            <IconButton color="inherit" className={classes.iconButton}>
              <Badge badgeContent={2} color="secondary"/>
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            Мои задачи
            <IconButton color="inherit" className={classes.iconButton}>
              <Badge badgeContent={10} color="secondary"/>
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            Новое
            <IconButton color="inherit" className={classes.iconButton}>
              <Badge badgeContent={4} color="secondary"/>
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            Требует внимания
            <IconButton color="inherit" className={classes.iconButton}>
              <Badge badgeContent={1} color="secondary"/>
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
};
