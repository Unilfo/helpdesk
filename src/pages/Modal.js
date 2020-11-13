import React, {Fragment, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Title from '../components/Title'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
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

export default function ModalForm({opened, closeModal, item}){
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('')
  const [id, setId] = useState('')
  const [fio1, setFio1] = useState('')
  const [fio2, setFio2] = useState('')
  const [fio3, setFio3] = useState('')
  const [roleId, setRoleId] = useState('')
  const [tabNumber, setTabNumber] = useState('')
  const [img, setImg] = useState('profile.jpg')
  const [login, setLogin] = useState('')
  const [password, setPasword] = useState('')



  useEffect(()=>{
      setId(item.id)
      setFio1(item.fio1)
      setFio2(item.fio2)
      setFio3(item.fio3)
      setTabNumber(item.tabNumber)
      setStatus(()=>{
        if(item.status){
          return item.status.id
        }else{
          return ''
        }
      })
      setRoleId(()=>{
        if(item.role){
          return item.role.id
        }else{
          return ''
        }
      })
    setLogin(item.login)
    setPasword(item.password)
      setOpen(opened)
  },[opened])


  const handleChangeRole = (event) => {
    setRoleId(event.target.value);
  };


  const handleClose = () => {
    setOpen(false);
    setStatus('');
    setId('')
    setFio1('')
    setFio2('')
    setFio3('')
    setRoleId(null)
    setTabNumber('')
    setLogin('')
    setPasword('')
    setImg('profile.jpg')
    closeModal()
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const FileUploader = props => {
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
      hiddenFileInput.current.click();
    };
    const handleChange = event => {
      const fileUploaded = event.target.files[0];
      setImg(URL.createObjectURL(fileUploaded))
    };
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
    );
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <input type="file" className={classes.inputHidden}/>
      <Title>Карточка пользователя</Title>
      <Grid container spacing={5}>
        <Grid item>
          <FileUploader/>
            {/*<Avatar src='profile.jpg' className={classes.large} onClick={handleClick}></Avatar>*/}
        </Grid>
        <Grid item xs={8}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Фамилия</InputLabel>
            <Input  aria-describedby="my-helper-text" value={fio1}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Имя</InputLabel>
            <Input  aria-describedby="my-helper-text" value={fio2}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Отчество</InputLabel>
            <Input  aria-describedby="my-helper-text" value={fio3}/>
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
            <Input aria-describedby="my-helper-text" value={tabNumber}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Статус</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleChangeStatus}
            >
              <MenuItem value={1}>Действует</MenuItem>
              <MenuItem value={2}>Неактивен</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Логин</InputLabel>
            <Input  aria-describedby="my-helper-text" value={login}/>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="my-input">Пароль</InputLabel>
            <Input aria-describedby="my-helper-text"  type="password" value={password}/>
          </FormControl>
        </Grid>
        <Grid item className={classes.groupButton} xs={10}>
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
