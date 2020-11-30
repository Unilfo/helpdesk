import React, {Fragment} from 'react'
import Title from '../../components/Title/Title'
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
    // [theme.breakpoints.down('sm')]: {
    //   display:'flex',
    //   flexFlow: 'column'
    // },
  },
  iconButton:{
    marginLeft:10
  }
}));


export default function Home() {

  const classes = useStyles();


  return(
    <Fragment>
      <Title>Главная</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            Задач мне
            <IconButton color="inherit" className={classes.iconButton}>
              <Badge badgeContent={2} color="secondary"/>
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            Мои задачи
            <IconButton color="inherit" className={classes.iconButton}>
              <Badge badgeContent={10} color="secondary"/>
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            Новое
            <IconButton color="inherit" className={classes.iconButton}>
              <Badge badgeContent={4} color="secondary"/>
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            Сроки
            <IconButton color="inherit" className={classes.iconButton}>
              <Badge badgeContent={1} color="secondary"/>
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
};
