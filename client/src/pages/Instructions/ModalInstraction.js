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
import {useMutation} from '@apollo/client'
import Container from '@material-ui/core/Container'
import {ADD_INSTRACTION, GetAllInstractions, UPDATE_INSTRACTION} from './query'


const useStyles = makeStyles((theme) => ({
  root: {

  },
  paper: {

  },
  input: {
    minWidth:250
  },
  groupButton: {
    display: 'flex',
    justifyContent:"space-between",
  },
}))

export default function ModalForm({opened, closeModal, instraction}) {
  const classes = useStyles()
  const [createInstraction] = useMutation(ADD_INSTRACTION)
  const [updateInstraction] = useMutation(UPDATE_INSTRACTION)
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
          accept="application/pdf"
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
          title: title,
          name: fileName,
          path: path,
          belongs: +belongs,
          group: false,
        },
        refetchQueries:[{query: GetAllInstractions}]
      }).then(() => {
        console.log('ура')
      })
    } else {
      updateInstraction({
        variables: {
          id: +id,
          title: title,
          name: fileName,
          path: path,
          belongs: +belongs,
          group: false,
        },
        refetchQueries: [{query: GetAllInstractions}]
      }).then(() => {
        console.log('ура 2')
      })
    }
    handleClose()
  }

  const body = (
    <div className={classes.paper}>
      <Title>Добавление инструкции</Title>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item xs={12}>
          <FileUploader/>
        </Grid>
        <Grid item  xs={12}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Наименование</InputLabel>
            <Input aria-describedby="my-helper-text" value={title || ''} onChange={(e) => setTitle(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item  xs={12}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Имя файла</InputLabel>
            <Input aria-describedby="my-helper-text" value={fileName || ''}/>
          </FormControl>
        </Grid>
        <Grid item  xs={12}>
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
        </Grid>
        <Grid item  xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={group || false}
                onChange={handleChangeChecked}
                name="checkedB"
                color="primary"
                disabled
              />
            }
            label="Это группа?"
          />
        </Grid>
        <Grid
          item
          className={classes.groupButton}
        >
          <Button variant="contained" color="primary" size="small" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="contained" color="primary" size="small" onClick={handleSave}>
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </div>
  )

  return (
    <Fragment>
      <Container maxWidth="lg">
        <Dialog
          open={open}
          scroll={'paper'}
          maxWidth={'xs'}
          PaperProps={{classes: {root: classes.root}}}
        >
          <DialogContent>
            {body}
          </DialogContent>
        </Dialog>
      </Container>
    </Fragment>
  )
}
