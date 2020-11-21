import Grid from '@material-ui/core/Grid'
import React, {Fragment, useEffect, useState} from 'react'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Page } from 'react-pdf'
import { Document } from 'react-pdf/dist/esm/entry.webpack'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import './instaractionVeaver.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '45%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  pageControls:{
    width:'80%',
    display: 'flex',
    justifyContent:'space-between',
    alignItems:'center',
    color: '#3f51b5',
  },
  pageControlsButtons:{
    "&:hover": {
      borderRadius: '5px',
      backgroundColor: 'rgb(7, 177, 77, 0.42)'
    },
  },
}))

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

export default function InstractionVeaver({openedInstraction, closeModal, instraction}) {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [numPages, setNumPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1)
  const [docFile, setDocFile] = useState('')

  useEffect(()=>{
    setOpen(openedInstraction)
    setDocFile(instraction)
    setPageNumber(1)
    setNumPages(1)
  },[openedInstraction])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const changeScalePlus = () => {
    const oldScale = scale
    setScale(oldScale+0.1)
  }

  const changeScaleMinus = () => {
    const oldScale = scale
    setScale(oldScale-0.1)
  }

  const setPageNumberInput = (e) => {
    let count = e.target.value
    if(count - 1 > 0 && count < numPages){
      setPageNumber(count)
    }
  }

  const changePrevPage = () => {
    if(pageNumber - 1 > 0 ){
      setPageNumber(pageNumber - 1)
    }
  }

  const changeNextTage = () => {
    if (pageNumber < numPages){
      setPageNumber(pageNumber + 1)
    }
  }

  const handleChangeDokFile = (item) => {
    setDocFile(item.path)
    setPageNumber(1)
    setNumPages(1)
  }

  const body = (
    <Fragment>
      <div style={modalStyle} className={classes.paper}>
      <Grid item xs={3}>
        <div className={classes.pageControls}>
          <ZoomInIcon className={classes.pageControlsButtons} fontSize={'large'} onClick={changeScalePlus}></ZoomInIcon>
          <ZoomOutIcon className={classes.pageControlsButtons} fontSize={'large'} onClick={changeScaleMinus}></ZoomOutIcon>
          <input placeholder='страница' value={pageNumber} type="text" onChange={setPageNumberInput}/>
          <NavigateBeforeIcon className={classes.pageControlsButtons} fontSize={'large'} onClick={changePrevPage}></NavigateBeforeIcon>
          <NavigateNextIcon className={classes.pageControlsButtons} fontSize={'large'} onClick={changeNextTage}></NavigateNextIcon>
          <p>Страница {pageNumber} из {numPages}</p>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div>
          <Document
            file={docFile.path}
            onLoadSuccess={onDocumentLoadSuccess}
            style={classes.page}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              style={classes.page}
            />
          </Document>
        </div>
      </Grid>
      </div>
    </Fragment>
  )

  return(
    <Modal open={open} onClose={()=>closeModal()}>
      {body}
    </Modal>
  )
}

