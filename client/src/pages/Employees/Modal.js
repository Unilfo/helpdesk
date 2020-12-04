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
import {gql, useMutation} from '@apollo/client'
import Container from '@material-ui/core/Container'
import DialogActions from '@material-ui/core/DialogActions'


const ADD_USER = gql`
    mutation CreateUser(
        $name: String!
        $patronymic: String!
        $surname: String!
        $tab_number: String!
        $statusId: Int!
        $roleId: Int!
        $login: String!
        $password: String!
        $avatar: String!
    ) {
        createUser(
            name: $name,
            patronymic: $patronymic,
            surname: $surname,
            statusId: $statusId,
            roleId: $roleId,
            tab_number: $tab_number,
            login: $login,
            password: $password,
            avatar: $avatar
        ){
            id
        }

    }
`

const UPDATE_USER = gql`
    mutation UpdateUser(
        $id:Int!
        $name: String!
        $patronymic: String!
        $surname: String!
        $tab_number: String!
        $statusId: Int!
        $roleId: Int!
        $login: String!
        $password: String!
        $avatar: String!
    ) {
        updateUser(
            id:$id,
            name: $name,
            patronymic: $patronymic,
            surname: $surname,
            statusId: $statusId,
            roleId: $roleId,
            tab_number: $tab_number,
            login: $login,
            password: $password,
            avatar: $avatar
        )
    }
`

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 770,
  },
  root: {
    height: 550,
    minHeight:580,
  },
  card: {

  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  input: {
    minWidth: 240,
  },
  button: {

  },
  groupButton: {
    display: 'flex',
    justifyContent:"space-between",
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

  const handleSave = (e) => {
    e.preventDefault()
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
          avatar: img,
        },
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
          avatar: img,
        },
      }).then(() => {
        console.log('ура 2')
      })
    }
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
      const fileUploaded = event.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])

      reader.onload = function () {
        console.log(reader.result)
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
      <Title>Карточка пользователя</Title>
      <Grid
        container
        className={classes.card}
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
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
              <MenuItem value={2}>Пользователь</MenuItem>
              <MenuItem value={1}>Администратор</MenuItem>
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
