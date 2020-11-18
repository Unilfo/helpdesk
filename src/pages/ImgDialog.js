import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import './imgDialog.css'


function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function ImgDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = useState('')

  useEffect(() => {
    if(props.img){
      setOpen(props.opened)
      let fr = new FileReader();
      fr.onloadend = function () {
        setImg(fr.result)
      }
      fr.readAsDataURL(props.img);
    }
  },[props])

  const handleClose = () => {
    setOpen(false);
    props.closeDialog()
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
          <img src={img} alt=""/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
