import React, {useEffect, useRef, useState} from 'react'
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
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';


import FroalaEditor from 'react-froala-wysiwyg';

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';


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
    outline:'none',
    display:'flex',
    flexFlow:'column'
  },
  panel:{
    display:'flex',
    margin:20,
    wordWrap:'break-word',
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
}));


export default function ModalTasks({opened, closeModal, item}){
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('paper')
  const [otvet, setOtvet] = useState('aasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasdaasdasdasdasdasdasdasd')
  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const [ppp, setPpp] = useState(false)
  const [img, setImg] = useState('')

  const [model, setModel] = useState('Text')

  const handleClose = () => {
    setOpen(false)
  };

  const descriptionElementRef = React.useRef(null)

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const Otvet = () => {
    return(
      <div>
        Ответ:
        <div>
          {otvet}
        </div>
      </div>
    )
  }


  const load = (e) => {
    if(e.target.files.length > 0){
      let img = new Image(200, 200)
      img.classList.add('zoom')
      img.src = URL.createObjectURL(e.target.files[0])
      img.ondblclick = () => {
        setPpp(true)
        setImg(URL.createObjectURL(e.target.files[0]))
      }
      document.getElementById('editor').appendChild(img)
    }
  }

  const closeDialog = () => {
    setPpp(false)
  }

  const editor = useRef(null)
  const [content, setContent] = useState('')

  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }

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
          <ImgDialog opened={ppp} closeDialog={closeDialog} img={img}/>
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
        {/*<div className={classes.panel}>*/}
        {/*  <div className='groupButtons'>*/}
        {/*    <input accept="image/*" className={classes.inputId} id="icon-button-file" type="file" onChange={load}/>*/}
        {/*    <label htmlFor="icon-button-file">*/}
        {/*      <ImageIcon fontSize='large'/>*/}
        {/*    </label>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <input className={classes.inputId} id="icon-button-file" type="file" />*/}
        {/*    <label htmlFor="icon-button-file">*/}
        {/*      <AttachFileIcon fontSize='large'/>*/}
        {/*    </label>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <DialogContent dividers={scroll === 'paper'}>
          {/*<div id='editor' contentEditable suppressContentEditableWarning className={classes.editor}>*/}
          {/*    <div contentEditable suppressContentEditableWarning>*/}
          {/*      Введите текст...*/}
          {/*    </div>*/}
          {/*</div>*/}
          <FroalaEditor
            tag='textarea'
            config={{
              placeholder: "Edit Me",
              events : {
                'focus' : function(e, editor) {
                  console.log(editor.selection.get());
                }
              }
            }}
            model={model}
            onModelChange={() => setModel('11111111')}
          />
        </DialogContent>
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
