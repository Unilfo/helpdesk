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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import {gql, useMutation} from '@apollo/client'


const ADD_INSTRACTION = gql`
    mutation CreateInstraction(
        $title: String!
        $path: String!
        $belongs: Int!
        $group: Boolean!
        $name: String!
    ) {
        createInstraction(
            title: $title,
            path: $path,
            belongs: $belongs,
            group: $group,
            name: $name
        ){
            id
            title
            path
            belongs
            group
            name
        }

    }
`

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
  root: {
    height: '60%',
    width: '25%',
    [theme.breakpoints.down('xs')]: {
      height: '90%',
      width: '90%',
    },
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    width: '100%',
    height: '100%',
    padding: '2%',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      height: '90%',
      width: '90%',
    },
  },
  input: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(5),
    width: 400,
    marginRight: 30,
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(16),
    },
  },
  groupButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 25,
  },
  buttonAdd: {
    marginTop: 20,
  }
}))

export default function ModalForm({opened, closeModal, instraction}) {
  const classes = useStyles()
  const [createInstraction] = useMutation(ADD_INSTRACTION)
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [path, setPath] = useState('')
  const [group, setGroup] = useState(false)
  const [belongs, setBelongs] = useState('')
  const [fileName, setFileName] = useState('')



  useEffect(() => {
    setId(instraction.id)
    setTitle(instraction.title)
    setPath(instraction.path)
    setBelongs(instraction.belongs)
    setGroup(instraction.group)
    setFileName(instraction.name)
    setOpen(opened)
  }, [opened])

  const handleChangeBelongs = (event) => {
    setBelongs(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
    setTitle('')
    setPath('')
    setBelongs('')
    setGroup(false)
    setFileName('')
    closeModal()
  }


  const FileUploader = props => {
    const hiddenFileInput = React.useRef(null)
    const handleClick = event => {
      hiddenFileInput.current.click()
    }
    const handleChange = event => {
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = function () {
        setPath(reader.result)
        setFileName(event.target.files[0].name)
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={handleClick}>Выбрать файл</Button>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{display: 'none'}}
        />
      </Fragment>
    )
  }

  const handleChangeChecked = (event) => {
    setGroup(event.target.checked)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (id === undefined) {
      createInstraction({
        variables: {
          title:title,
          name: fileName,
          path:path,
          belongs:+belongs,
          group:false
        }
      }).then(() => {
        console.log('ура')
      })
    } else {

    }
    handleClose()
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Title>Добавление инструкции</Title>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <FileUploader/>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Наименование</InputLabel>
            <Input aria-describedby="my-helper-text" value={title || ''} onChange={(e) => setTitle(e.target.value)}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Имя файла</InputLabel>
            <Input aria-describedby="my-helper-text" value={fileName || ''}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Группа</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={belongs || ''}
              onChange={handleChangeBelongs}
            >
              <MenuItem value={1}>1С</MenuItem>
              <MenuItem value={2}>Axapta</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={group || false}
                onChange={handleChangeChecked}
                name="checkedB"
                color="primary"
              />
            }
            label="Это группа?"
          />
        </Grid>
        <Grid item className={classes.groupButton} xs={12} sm={12}>
          <Button className={classes.button} variant="contained" color="primary" size="small" onClick={handleClose}>
            Закрыть
          </Button>
          <Button className={classes.button} variant="contained" color="primary" size="small" onClick={handleSave}>
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
        PaperProps={{classes: {root: classes.root}}}
      >
        <DialogContent>
          {body}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
