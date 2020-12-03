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
    mutation CreateUser(
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
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    outline: 'none',
    width: '100%',
    height: '100%',
  },
  root: {
    height: '60%',
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      height: '90%',
      width: '90%',
    },
  },
  card: {
    display: 'flex',
    flexFlow: 'column'
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: 20,
  },
  input: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(3),
    width: 180,
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(4),
  },
  groupButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10
    },
  },
  inputHidden: {
    display: 'none',
  },
}))

export default function ModalForm({opened, closeModal, item}) {
  const [createUser] = useMutation(ADD_USER)
  const [updateUser] = useMutation(UPDATE_USER)
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
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
    console.log(item)
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
          avatar: img
        }
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
          avatar: img
        }
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
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = function () {
        console.log(reader.result);//base64encoded string
        setImg(reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      // setImg(URL.createObjectURL(fileUploaded))
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
    <div style={modalStyle} className={classes.paper}>
      <input type="file" className={classes.inputHidden}/>
      <Title>Карточка пользователя</Title>
      <Grid container className={classes.card}>
        <Grid item>
          <FileUploader/>
        </Grid>
        <Grid item>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Фамилия</InputLabel>
            <Input aria-describedby="my-helper-text" value={surname || ''} onChange={(e) => setSurname(e.target.value)}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Имя</InputLabel>
            <Input aria-describedby="my-helper-text" value={name || ''} onChange={(e) => setName(e.target.value)}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Отчество</InputLabel>
            <Input aria-describedby="my-helper-text" value={patronymic || ''}
                   onChange={(e) => setPatronymic(e.target.value)}/>
          </FormControl>
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
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Табельный номер</InputLabel>
            <Input aria-describedby="my-helper-text" value={tab_number || ''} onChange={(e) => setTabNumber(e.target.value)}/>
          </FormControl>
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
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Логин</InputLabel>
            <Input aria-describedby="my-helper-text" value={login || ''} onChange={(e) => setLogin(e.target.value)}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Пароль</InputLabel>
            <Input aria-describedby="my-helper-text" type="password" value={password || ''}
                   onChange={(e) => setPasword(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item className={classes.groupButton}>
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
