import React, {Fragment, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Title from '../../components/Title/Title'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'


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
    width: '45%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
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
  buttonAdd:{
    marginTop: theme.spacing(3),
  }
}));

export default function ModalForm({opened, closeModal, instraction}){
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('')
  const [path, setPath] = useState('')
  const [group, setGroup] = useState('')

  useEffect(()=>{
    setTitle(instraction.label)
    setPath(instraction.path)
    setGroup(instraction.prinadlejit)
    setOpen(opened)
  },[opened])

  const handleChangeRole = (event) => {
    setGroup(event.target.value);
  }

  const handleClose = () => {
    setOpen(false);
    setTitle('')
    setPath('')
    setGroup(null)
    closeModal()
  }

  const hiddenFileInput = React.useRef(null)

  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Title>Добавление инструкции</Title>
      <Grid container spacing={5}>
        <Grid item>
          <Button variant="contained"
                  color='primary'
                  size='small'
                  onClick={handleClick}
                  className={classes.buttonAdd}
          >
            Выбрать
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{display: 'none'}}
          />
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Наименование</InputLabel>
            <Input  aria-describedby="my-helper-text" value={title}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Путь</InputLabel>
            <Input  aria-describedby="my-helper-text" value={path}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Группа</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={group}
              onChange={handleChangeRole}
            >
              <MenuItem value={2}>1С</MenuItem>
              <MenuItem value={1}>Axapta</MenuItem>
            </Select>
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
      <Modal open={open}>
        {body}
      </Modal>
    </Fragment>
  )
}
