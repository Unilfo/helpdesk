import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Title from '../components/Title'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  input: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  groupButton:{
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginRight: theme.spacing(8)
  }
}));

export default function ModalForm(){
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Title>Карточка пользователя</Title>
      <Grid container spacing={5}>
        <Grid item>
          <Avatar src='profile.jpg' className={classes.large} onClick={()=>alert('Выбор аватарки')}></Avatar>
        </Grid>
        <Grid item xs={8}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Фамилия</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Имя</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Отчество</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Роль</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Email</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
        </Grid>
        <Grid item className={classes.groupButton}>
          <Button className={classes.button} variant="contained" color="primary" size="small" onClick={handleClose}>
            Закрыть
          </Button>
          <Button className={classes.button} variant="contained" color="primary" size="small" onClick={handleClose}>
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </div>
  )

  return(
      <Fragment>
        <Button variant="contained" color="primary" size="small" onClick={handleOpen}>
          Создать
        </Button>
        <Modal
          open={open}
        >
          {body}
        </Modal>
      </Fragment>
    )
}
