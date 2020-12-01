import React, {Fragment, useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Title from '../../components/Title/Title'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogContent from '@material-ui/core/DialogContent'


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  root:{
    height:'40%',
    width:'50%',
    [theme.breakpoints.down('xs')]: {
      height:'90%',
      width:'90%',
    },
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    width:'100%',
    height:'100%',
    padding:'2%',
    overflow:'hidden',
  },
  input: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    width: 180,
  },
  button: {
    marginTop: theme.spacing(3),
  },
  groupButton: {

  },
  buttonAdd: {
    marginTop: 20,
  }
}))

export default function ModalForm({opened, closeModal, instraction}) {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [path, setPath] = useState('')
  const [group, setGroup] = useState('')

  useEffect(() => {
    setTitle(instraction.label)
    setPath(instraction.path)
    setGroup(instraction.prinadlejit)
    setOpen(opened)
  }, [opened])

  const handleChangeRole = (event) => {
    setGroup(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
    setTitle('')
    setPath('')
    setGroup(null)
    closeModal()
  }

  const hiddenFileInput = React.useRef(null)

  const handleClick = event => {
    hiddenFileInput.current.click()
  }
  const handleChange = event => {
    const fileUploaded = event.target.files[0]
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Title>Добавление инструкции</Title>
      <Grid container>
        <Grid item xs={12}>
          <Button variant="contained"
                  color='primary'
                  size='small'
                  onClick={handleClick}
                  className={classes.buttonAdd}
          >
            Выбрать файл
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{display: 'none'}}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Наименование</InputLabel>
            <Input aria-describedby="my-helper-text" value={title}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Путь</InputLabel>
            <Input aria-describedby="my-helper-text" value={path}/>
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
        <Grid item className={classes.groupButton} xs={12}>
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

  return (
    <Fragment>
      <Dialog
        open={open}
        scroll={'paper'}
        maxWidth={'lg'}
        PaperProps={{ classes: {root: classes.root } }}
      >
        <DialogContent>
          {body}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
