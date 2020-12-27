import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Title from '../../components/Title/Title'
import ImageIcon from '@material-ui/icons/Image'
import './modalTask.css'
import ImgDialog from '../ImgDialog/ImgDialog'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import format from 'date-fns/format'
import DateFnsUtils from '@date-io/date-fns'
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import ruLocale from 'date-fns/locale/ru'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import {useMutation} from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import {ADD_TASK, UPDATE_TASK, GetAllTasks} from './query'

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    height: 350,
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('sm')]: {
      borderRight: 'none',
    },
  },
  input: {
    width: 240,
    marginRight: 30,
  },
  datePiker: {
    marginTop: 16,
  },
  editor: {
    overflowY: 'auto',
    height: 320,
  },
  panelButtonImgsFiles: {
    marginTop: 15,
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    wordWrap: 'break-word',
  },
  contentEditableArea: {
    height: '100%',
    width: '100%',
    outline: 'none',
  },
  inputId: {
    display: 'none',
  },
  otvet: {
    width: '100%',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  buttons: {
    color: '#3f51b5',
    '&:hover': {
      borderRadius: '5px',
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
    },
  },
  groupFiles: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  },
  groupFilesImgs: {
    overflowY: 'auto',
    height: 310,
  },
  labelTitle: {
    paddingLeft: 10,
  },
  root: {
    minHeight: 600,
  },
}))

class RuLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, 'LLLL', {locale: this.locale})
  }

  getDatePickerHeaderText(date) {
    return format(date, 'dd MMMM', {locale: this.locale})
  }
}

export default function ModalTasks({opened, closeModal, items}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('paper')
  const [answer, setAnswer] = useState('')
  const [files, setFiles] = useState([])
  const [openImg, setOpenImg] = useState(false)
  const [img, setImg] = useState(null)
  const descriptionElementRef = React.useRef(null)
  const [createTask] = useMutation(ADD_TASK)
  const [updateTask] = useMutation(UPDATE_TASK)
  const [id, setId] = useState('')
  const [theme, setTheme] = useState('')
  const [responsible, setResponsible] = useState('')
  const [date, setDate] = useState(new Date())
  const [status, setStatus] = useState('')
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const [priority, setPriority] = useState(false)

  useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }

    setId(items.id)
    setTheme(items.theme)
    setResponsible(() => {
      if (items.responsible) {
        return items.responsible.id
      } else {
        return ''
      }
    })
    setStatus(items.status || false)
    setPriority(() => {
      if (items.priority) {
        return items.priority.id
      } else {
        return ''
      }
    })
    setAuthor(() => {
      if (items.author) {
        return items.author.id
      } else {
        return ''
      }
    })
    setDate(items.date || new Date())
    setText(items.text)
    setAnswer(items.answer)
  }, [open])

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2)
      month = '0' + month
    if (day.length < 2)
      day = '0' + day

    return [year, month, day].join('-')
  }

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleChangeResponsible = (event) => {
    setResponsible(event.target.value)
  }

  const handleChangeStatus = (event) => {
    setStatus(event.target.checked)
  }


  const handleChangePriority = (event) => {
    setPriority(event.target.value)
  }

  const handleClose = () => {
    setId('')
    setTheme('')
    setResponsible('')
    setStatus(false)
    setPriority('')
    setAuthor('')
    setDate(new Date())
    setText('')
    setAnswer('')
    closeModal()
    setOpen(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    console.log('id', id)
    console.log('theme',theme)
    console.log('responsible',responsible)
    console.log('date',date)
    console.log('status',status)
    console.log('priority',priority)
    console.log('author',author)
    console.log('text',text)

    if (id === undefined) {
      createTask({
        variables: {
          theme: theme,
          responsible: +responsible,
          date: date,
          status: status,
          priority: priority,
          author: +author,
          text: text,
          answer: answer
        },
        refetchQueries: [{query: GetAllTasks}]
      }).then(() => {
        console.log('ура')
      })
    } else {
      updateTask({
        variables: {
          id: +id,
          theme: theme,
          responsible: +responsible,
          date: date,
          status: status,
          priority: +priority,
          author: +author,
          text: text,
          answer: answer
        },
        refetchQueries: [{query: GetAllTasks}]
      }).then(() => {
        console.log('ура 2')
      })
    }
    handleClose()
  }

  const load = (e) => {
    let oldData = files
    console.log(e.target.files[0])
    setFiles(
      [...oldData, e.target.files[0]],
    )
  }

  const Files = () => {
    if (files.length !== 0) {
      return (
        <div className={classes.groupFilesImgs}>
          {files.map((el) => <div className={classes.textFilesImgs} key={el.name}
                                  onDoubleClick={() => openedDialog(el)}>{el.name}</div>)}
        </div>
      )
    } else {
      return ''
    }
  }

  const openedDialog = (el) => {
    setImg(el)
    console.log(el)
    setOpenImg(true)
  }

  const closeDialog = () => {
    setOpenImg(false)
  }

  useEffect(() => {
    setOpen(opened)
  }, [opened])


  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
        maxWidth={'lg'}
        PaperProps={{classes: {root: classes.root}}}
      >
        <Container>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <Title>Заявка</Title>
            </Grid>
            <Grid item>
              <ImgDialog opened={openImg} closeDialog={closeDialog} img={img}/>
            </Grid>
            <Grid item xs={12} md={12} sm={12} lg={12}>
              <FormControl className={classes.input}>
                <InputLabel htmlFor="my-input">Тема</InputLabel>
                <Input
                  aria-describedby="my-helper-text"
                  value={theme || ''}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.input}>
                <InputLabel htmlFor="my-input">Автор</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={author || ''}
                  onChange={(e) => setAuthor(e.target.value)}
                >
                  <MenuItem value={1}>Сидоров</MenuItem>
                  <MenuItem value={2}>Петров</MenuItem>
                  <MenuItem value={3}>Иванов</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.input}>
                <InputLabel id="demo-simple-select-label">Ответственный</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={responsible || ''}
                  onChange={handleChangeResponsible}
                >
                  <MenuItem value={1}>Сидоров</MenuItem>
                  <MenuItem value={2}>Петров</MenuItem>
                  <MenuItem value={3}>Иванов</MenuItem>
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
                <DatePicker
                  className={classes.datePiker}
                  value={date}
                  onChange={(e) => {
                    setDate(formatDate(e))
                  }}
                  format={'d MMM yyyy'}
                  cancelLabel={'отмена'}
                />
              </MuiPickersUtilsProvider>
              <FormControl className={classes.input}>
                <InputLabel id="demo-simple-select-label">Приоритет</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={priority || false}
                  onChange={handleChangePriority}
                >
                  <MenuItem value={1}>Высокий</MenuItem>
                  <MenuItem value={2}>Средний</MenuItem>
                  <MenuItem value={3}>Низкий</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={status || false}
                    onChange={handleChangeStatus}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Закрыть заявку"
              />
            </Grid>
            <Grid item xs={12} className={classes.panelButtonImgsFiles}>
              <input accept="image/*" className={classes.inputId} id="icon-button-file" type="file" onChange={load}/>
              <label htmlFor="icon-button-file">
                <ImageIcon fontSize='large' className={classes.buttons}/>
              </label>
            </Grid>
            <Grid container alignItems="stretch">
              <Grid item xs={12} sm={9} className={classes.dialogContent}>
                <DialogContent>
                  <div className={classes.editor}>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      InputProps={{disableUnderline: true}}
                      // rows={4}
                      placeholder='Введите текст...'
                      value={text}
                      contentEditable
                      suppressContentEditableWarning
                      className={classes.contentEditableArea}
                      onChange={(e) => {
                        setText(e.target.value)
                      }}
                    />
                  </div>
                </DialogContent>
              </Grid>
              <Grid item xs={12} sm={3} className={classes.labelTitle}>
                <Title>
                  Прикрепленные файлы
                </Title>
                <div id='files' className={classes.groupFiles}>
                  <Files/>
                </div>
              </Grid>
            </Grid>
            <Grid item className={classes.otvet}>
              <div>
                Ответ:
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    InputProps={{disableUnderline: true}}
                    value={answer}
                    contentEditable
                    suppressContentEditableWarning
                    className={classes.contentEditableArea}
                    onChange={(e) => {
                      setAnswer(e.target.value)
                    }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <DialogActions>
          <Button variant="contained" color='primary' size='small' onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button variant="contained" color='primary' size='small' onClick={handleSave} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
