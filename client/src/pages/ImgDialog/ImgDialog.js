import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import './imgDialog.css'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  dialog_content: {
    paddingTop: '5px!important',
    paddingLeft: '5px!important',
    paddingRight: '5px!important',
  },
  img_dialog: {
    [theme.breakpoints.down('xs')]: {
      width: 290,
      height: 400,
    },
  },
}))

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

export default function ImgDialog(props) {
  const [open, setOpen] = React.useState(false)
  const [img, setImg] = useState('')
  const classes = useStyles()


  useEffect(() => {
    if (props.img) {
      setImg(props.img)
      setOpen(props.opened)
    }
  }, [props])

  const handleClose = () => {
    setOpen(false)
    props.closeDialog()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent className={classes.dialog_content}>
          <img src={img} alt="" className={classes.img_dialog}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
