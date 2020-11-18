import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button         from '@material-ui/core/Button'
import FormControl    from '@material-ui/core/FormControl'
import InputLabel     from '@material-ui/core/InputLabel'
import Input          from '@material-ui/core/Input'
import Dialog         from '@material-ui/core/Dialog'
import DialogContent  from '@material-ui/core/DialogContent'
import DialogActions  from '@material-ui/core/DialogActions'
import Title from '../components/Title'
import ImageIcon from '@material-ui/icons/Image'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import './modalTask.css'
import ImgDialog from './ImgDialog'
import Grid from '@material-ui/core/Grid'




const useStyles = makeStyles((theme) => ({
  dialog:{
    paddingLeft:40,
    paddingRight:40,
    paddingTop:40,
    paddingBottom:20,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  input:{
    marginRight:40
  },
  editor:{
    height:'60%',
    minHeight:'100%',
    display:'flex',
    width:'100%'
  },
  panel:{
    display:'flex',
    flexFlow:'column',
    width:'100%',
    wordWrap:'break-word',
    paddingRight:40,
    paddingLeft:40
  },
  panelButtonImgsFiles:{
    display:'flex',
  },
  contentEditableArea:{
    outline:'none',
  },
  inputId:{
    display: 'none'
  },
  otvet:{
    wordWrap:'break-word',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    marginTop:5,
    marginBottom:5,
    paddingLeft: 20,
    paddingRight: 20,
    height:'50%',
    minHeight:'30%',
  },
  buttons:{
    color: '#3f51b5',
    "&:hover": {
      borderRadius: '5px',
      backgroundColor: 'rgb(7, 177, 77, 0.42)'
    },
  },
  groupFiles:{
    height:'70%',
    width:250
  },
  groupFilesImgs:{
    // display:'flex',
    // flexFlow:'row',
  },
  textFilesImgs:{
  // marginRight:25
  }
}));


export default function ModalTasks({opened, closeModal, item}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('paper')
  const [otvet, setOtvet] = useState('aasdasdasdasdasdasdasdaasdasd' +
    'asdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdas' +
    'dasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaa' +
    'sdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdas' +
    'dasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasd')
  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const [files, setFiles] = useState([])
  const [openImg, setOpenImg] = useState(false)
  const [img, setImg] = useState(null)

  const handleClose = () => {
    setOpen(false)
  };

  const descriptionElementRef = React.useRef(null)

  useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const Otvet = () => {
    return (
      <div>
        Ответ:
        <div>
          {otvet}
        </div>
      </div>
    )
  }

  const load = (e) => {
    let oldData = files
    setFiles(
      [...oldData, e.target.files[0]]
    )
  }


  const Files = () => {
    if(files.length !== 0){
      return (
        <div className={classes.groupFilesImgs}>
          {files.map((el)=> <div className={classes.textFilesImgs} key={el.name} onDoubleClick={()=>openedDialog(el)}>{el.name}</div>)}
        </div>
      )
    }
    else{
      return ''
    }
  }

  const openedDialog = (el) => {
    setImg(el)
    setOpenImg(true)
  }

  const closeDialog = () => {
    setOpenImg(false)
  }

  // const mouseUP = (e) => {
  //   let content = document.createElement('img')
  //   content.src = 'profile.jpg'
  //   let selection = document.getSelection()
  //   if (selection.getRangeAt && selection.rangeCount) {
  //     let range = window.getSelection().getRangeAt(0)
  //     range.insertNode(content)
  //   }
  // }

  return (
    <div>
      <Button variant="contained" color='primary' size='small' onClick={handleClickOpen('paper')}>Создать</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        maxWidth={'lg'}
      >
        <div className={classes.dialog}>
          <Title>Заявка</Title>
          <ImgDialog opened={openImg} closeDialog={closeDialog} img={img}/>
          <div>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="my-input">Тема</InputLabel>
              <Input  aria-describedby="my-helper-text" value=''/>
            </FormControl>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="my-input">Автор</InputLabel>
              <Input  aria-describedby="my-helper-text" value=''/>
            </FormControl>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="my-input">Ответственный</InputLabel>
              <Input  aria-describedby="my-helper-text" value=''/>
            </FormControl>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="my-input">Дата</InputLabel>
              <Input  aria-describedby="my-helper-text" value=''/>
            </FormControl>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="my-input">Статус</InputLabel>
              <Input  aria-describedby="my-helper-text" value=''/>
            </FormControl>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="my-input">Приоритет</InputLabel>
              <Input  aria-describedby="my-helper-text" value=''/>
            </FormControl>
          </div>
        </div>
        <div className={classes.panel}>
          <div className={classes.panelButtonImgsFiles}>
            <div className='groupButtons'>
              <input accept="image/*" className={classes.inputId} id="icon-button-file" type="file" onChange={load}/>
              <label htmlFor="icon-button-file">
                <ImageIcon fontSize='large' className={classes.buttons}/>
              </label>
            </div>
            <div>
              <input className={classes.inputId} id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <AttachFileIcon fontSize='large' className={classes.buttons}/>
              </label>
            </div>
          </div>
        </div>
        <div className={classes.editor}>
          <DialogContent dividers={scroll === 'paper'}>
            <div contentEditable suppressContentEditableWarning className={classes.contentEditableArea}>
              <div contentEditable suppressContentEditableWarning>
                Введите текст...
              </div>
            </div>
          </DialogContent>
          <div id='files' className={classes.groupFiles}>
            Прикрепленные файлы
            <div>
              <Files/>
            </div>
          </div>
        </div>
        <div className={classes.otvet}>
          {otvet && <Otvet/>}
        </div>
        <DialogActions>
          <Button variant="contained" color='primary' size='small' onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button variant="contained" color='primary' size='small' onClick={handleClose} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
