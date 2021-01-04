import React, {Fragment, useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Title from '../../components/Title/Title'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import './style.css'
import {useMutation} from '@apollo/client'
import Container from '@material-ui/core/Container'
import DialogActions from '@material-ui/core/DialogActions'
import {GetAllUsers, UPDATE_USER, ADD_USER, DELETE_USER} from './query'


const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 770,
  },
  root: {
    height: 550,
    minHeight: 580,
  },
  card: {},
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  input: {
    minWidth: 240,
  },
  error: {
    color: 'red'
  },
  groupButton: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: 18,
    paddingLeft: 18
  },
  inputHidden: {
    display: 'none',
  },
}))

export default function ModalForm({opened, closeModal, item}) {
  const [createUser] = useMutation(ADD_USER)
  const [updateUser] = useMutation(UPDATE_USER)
  const [deleteUser] = useMutation(DELETE_USER)
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [statusId, setStatus] = useState('')
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [surname, setSurname] = useState('')
  const [roleId, setRoleId] = useState('')
  const [tab_number, setTabNumber] = useState('')
  const [img, setImg] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPasword] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    setId(item.id)
    setName(item.name)
    setPatronymic(item.patronymic)
    setSurname(item.surname)
    setTabNumber(item.tab_number)
    setStatus(() => {
      if (item.statusId) {
        return item.statusId.id
      } else {
        return ''
      }
    })
    setRoleId(() => {
      if (item.roleId) {
        return item.roleId.id
      } else {
        return ''
      }
    })
    setLogin(item.login)
    setPasword(item.password)
    setImg(item.avatar)
    setOpen(opened)
  }, [opened])


  const handleChangeRole = (event) => {
    setRoleId(event.target.value)
  }

  const handleDeleteUser = () => {
    deleteUser({
      variables: {
        id: +id,
      },
      refetchQueries: [{query: GetAllUsers}]
    }).then(() => {
      alert('Пользователь удален')
    }).catch((error) => {
      alert('Имеются документы ссылающиеся на пользователя')
    })
    closeModal()
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (name === undefined
      || patronymic === undefined
      || surname === undefined
      || tab_number === undefined
      || statusId === ''
      || roleId === ''
      || login === undefined
      || password === undefined
    ) {
      setError(true)
      return
    }
    if (id === undefined) {
      createUser({
        variables: {
          name: name,
          patronymic: patronymic,
          surname: surname,
          tab_number: tab_number,
          statusId: +statusId,
          roleId: +roleId,
          login: login,
          password: password,
          avatar: img || 'profile.jpg',
        },
        refetchQueries: [{query: GetAllUsers}]
      }).then(() => {
        console.log('ура')
      })
    } else {
      updateUser({
        variables: {
          id: +id,
          name: name,
          patronymic: patronymic,
          surname: surname,
          tab_number: tab_number,
          statusId: +statusId,
          roleId: +roleId,
          login: login,
          password: password,
          avatar: img || 'profile.jpg',
        },
        refetchQueries: [{query: GetAllUsers}]
      }).then(() => {
        console.log('ура 2')
      })
    }
    setError(false)
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
    setStatus('')
    setId('')
    setName('')
    setPatronymic('')
    setSurname('')
    setRoleId('')
    setTabNumber('')
    setLogin('')
    setPasword('')
    setImg('')
    setError(false)
    closeModal()
  }

  const handleChangeStatus = (event) => {
    setStatus(event.target.value)
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
        setImg(reader.result)
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
    return (
      <Fragment>
        <Avatar src={img} className={classes.large} onClick={handleClick}></Avatar>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{display: 'none'}}
        />
      </Fragment>
    )
  }

  const body = (
    <div className={classes.paper}>
      <input type="file" className={classes.inputHidden}/>
      <Grid
        container
        className={classes.card}
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={9}>
          <Title>Карточка пользователя</Title>
          {error && <div className={classes.error}>Проверте корректнось данных</div>}
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="secondary" size="small" onClick={handleDeleteUser}>
            Удалить запись
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FileUploader/>
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Фамилия</InputLabel>
            <Input aria-describedby="my-helper-text" value={surname || ''}
                   onChange={(e) => setSurname(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Имя</InputLabel>
            <Input aria-describedby="my-helper-text" value={name || ''} onChange={(e) => setName(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Отчество</InputLabel>
            <Input aria-describedby="my-helper-text" value={patronymic || ''}
                   onChange={(e) => setPatronymic(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Роль</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={roleId}
              onChange={handleChangeRole}
            >
              <MenuItem value={1}>Пользователь</MenuItem>
              <MenuItem value={2}>Администратор</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Табельный номер</InputLabel>
            <Input aria-describedby="my-helper-text" value={tab_number || ''}
                   onChange={(e) => setTabNumber(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Статус</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusId}
              onChange={handleChangeStatus}
            >
              <MenuItem value={1}>Действует</MenuItem>
              <MenuItem value={2}>Неактивен</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Логин</InputLabel>
            <Input aria-describedby="my-helper-text" value={login || ''} onChange={(e) => setLogin(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Пароль</InputLabel>
            <Input aria-describedby="my-helper-text" type="password" value={password || ''}
                   onChange={(e) => setPasword(e.target.value)}/>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )

  return (
    <Fragment>
      <Container fixed>
        <Dialog
          open={open}
          scroll={'paper'}
          maxWidth={'lg'}
          PaperProps={{classes: {root: classes.root}}}
        >
          <DialogContent>
            {body}
          </DialogContent>
          <DialogActions>
            <Grid item xs={12} className={classes.groupButton}>
              <Button variant="contained" color="primary" size="small" onClick={handleClose}>
                Закрыть
              </Button>
              <Button variant="contained" color="primary" size="small" onClick={handleSave}>
                Сохранить
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </Container>
    </Fragment>
  )
}
