import React, {Fragment, useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Title          from '../components/Title'
import Button         from '@material-ui/core/Button'
import FormControl    from '@material-ui/core/FormControl'
import InputLabel     from '@material-ui/core/InputLabel'
import Input          from '@material-ui/core/Input'
import Dialog         from '@material-ui/core/Dialog'
import DialogTitle    from '@material-ui/core/DialogTitle'
import DialogContent  from '@material-ui/core/DialogContent'
import DialogActions  from '@material-ui/core/DialogActions'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import IconButton     from '@material-ui/core/IconButton'
import TextEditor     from './TextEditor'


const useStyles = makeStyles((theme) => ({
  input:{
    marginRight:40
  },
  text:{
    width:'100%'
  }
}));


export default function ModalTasks({opened, closeModal, item}){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };


  const TextArea = () => {
    return(
      <Fragment>
        <TextEditor></TextEditor>
      </Fragment>
    )
  }

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button variant="contained" color='primary' size='small' onClick={handleClickOpen('paper')}>Создать</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.dialog}
        maxWidth={'lg'}
      >
        <DialogTitle id="scroll-dialog-title">
          <Title>Заявка</Title>
          <hr/>
            <IconButton>
              <AttachFileIcon/>
            </IconButton>
            <IconButton>
              <AttachFileIcon/>
            </IconButton>
            <IconButton>
              <AttachFileIcon/>
            </IconButton>
            <IconButton>
              <AttachFileIcon/>
            </IconButton>
          <hr/>
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
          </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <div>
            <TextArea/>
          </div>
        </DialogContent>
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
