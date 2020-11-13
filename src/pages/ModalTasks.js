import React, {Fragment, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Title from '../components/Title'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'


function getModalStyle() {
  const top = 50;
  const left = 50;

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
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(3),
    width:180
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  groupButton:{
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  inputHidden:{
    display:'none'
  }
}));

export default function ModalTasks({opened, closeModal, item}){
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);


  const handleCloseModal = () => {
    setOpen(false)
    closeModal()
  }

  useEffect(()=>{
    setOpen(opened)
  },[opened])

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <input type="file" className={classes.inputHidden}/>
      <Title>Задачи</Title>
      <Grid container spacing={5}>
        <Grid item>

        </Grid>
        <Grid item xs={8}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Фамилия</InputLabel>
            <Input  aria-describedby="my-helper-text" />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Имя</InputLabel>
            <Input  aria-describedby="my-helper-text"/>
          </FormControl>
        </Grid>
        <Grid item className={classes.groupButton} xs={10}>
          <Button className={classes.button} variant="contained" color="primary" size="small" onClick={handleCloseModal}>
            Закрыть
          </Button>
          <Button className={classes.button} variant="contained" color="primary" size="small" onClick={handleCloseModal}>
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </div>
  )

  return(
      <Fragment>
        <Modal open={open}>
          {body}
        </Modal>
      </Fragment>
    )
}
