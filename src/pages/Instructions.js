import React, {Fragment, useEffect, useState} from 'react'
import Title from '../components/Title';
import Grid from '@material-ui/core/Grid'
import {Input} from '@material-ui/core'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button'
import ModalInstraction from './ModalInstraction'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
    wordWrap: 'break-word'
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
  labelRoot: {
    display: 'flex',
    justifyContent:'space-between'
  },
  editIcon:{
    color: '#3f51b5',
    '&:hover': {
      color: 'green',
    },
  }
});

const dataFetch = [
  {id:1, nodeId:'1', label:'1c', path:'asd', prinadlejit:1, group:true},
  {id:2, nodeId:'2', label:'Axapta', path:'asd', prinadlejit:2, group:true},
  {id:3, nodeId:'3', label:'q', path:'Kak_ustroen_JavaScript_2019_Krokford.pdf', prinadlejit:1, group:false},
  {id:4, nodeId:'4', label:'w', path:'asd', prinadlejit:1, group:false},
  {id:5, nodeId:'5', label:'инструкция', path:'asd', prinadlejit:1, group:false},
  {id:6, nodeId:'6', label:'rrrr', path:'asd', prinadlejit:2, group:false},
  {id:7, nodeId:'7', label:'Процессуальныособенности', path:'Memo_Crimea.pdf', prinadlejit:1, group:false},
  {id:8, nodeId:'8', label:'инструкция по 1с', path:'asd', prinadlejit:2, group:false},
  {id:9, nodeId:'9', label:'u', path:'asd', prinadlejit:1, group:false},
  {id:10, nodeId:'10', label:'i', path:'asd', prinadlejit:1, group:false},
]


export default function Instructions() {
  const classes = useStyles();
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.3);
  const [searchText, setSearhText] = useState('')
  const [data, setData] = useState(dataFetch)
  const [docFile, setDocFile] = useState('')
  const [open, setOpen] = React.useState(false);
  const [instraction, setInstraction] = useState({})


  const closeModal =() => {
    setOpen(false)
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }




  useEffect(()=>{
    if(searchText === ''){
      setData(dataFetch)
    }
    else{
      // const group = dataFetch.filter((el)=> el.group === true)
      const filteredData = dataFetch.filter((el) => {
        if (!el.group){
          return el.label.toLowerCase().includes(searchText.toLowerCase().trim())
        }
      })
      const newData = [...new Set([...filteredData])]
      setData(newData)
    }
  },[searchText])

  useEffect(()=>{
    setData(data)
  },[data])


  useEffect(()=>()=>{
    setInstraction({})
  },[])

  const handleChange = (event) => {
    setSearhText(event.target.value)
  }

  const changeScalePlus = () => {
    const oldScale = scale
    setScale(oldScale+0.1)
  }
  const changeScaleMinus = () => {
    const oldScale = scale
    setScale(oldScale-0.1)
  }

  const changePrevPage = () => {
    if(pageNumber - 1 > 0 ){
      setPageNumber(pageNumber - 1)
    }
  }

  const changeNextTage = () => {
    setPageNumber(pageNumber + 1)
  }

  const handleChangeDokFile = (item) => {
    setDocFile(item.path)
    setPageNumber(1)
    setNumPages(1)
  }

  const openModal = () => {
    setInstraction({})
    setOpen(true)
  }

  const handleEditeInstraction = (item) => {
    setInstraction(item)
    setOpen(true)
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
        <ModalInstraction opened={open} closeModal={closeModal} instraction={instraction}/>
        <Grid item>
          <Title>Инструкции</Title>
        </Grid>
        <Grid item xs={2}>
          <Input placeholder={'Поиск'} value={searchText} onChange={handleChange}></Input>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color='primary' size='small' onClick={openModal}>Создать</Button>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.pageControls}>
            <ZoomInIcon className={classes.pageControlsButtons} fontSize={'large'} onClick={changeScalePlus}></ZoomInIcon>
            <ZoomOutIcon className={classes.pageControlsButtons} fontSize={'large'} onClick={changeScaleMinus}></ZoomOutIcon>
            <NavigateBeforeIcon className={classes.pageControlsButtons} fontSize={'large'} onClick={changePrevPage}></NavigateBeforeIcon>
            <NavigateNextIcon className={classes.pageControlsButtons} fontSize={'large'} onClick={changeNextTage}></NavigateNextIcon>
            <p>Страница {pageNumber} из {numPages}</p>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={5}>
            <TreeView
              className={classes.root}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              multiSelect
            >
              {searchText !== ''?
                data.map((columnChild)=>{
                  return(
                      <TreeItem
                        nodeId={columnChild.nodeId}
                        label={
                          <div className={classes.labelRoot}>
                            <Typography variant="body2" >
                              {columnChild.label}
                            </Typography>
                            <EditIcon className={classes.editIcon} onClick={()=>handleEditeInstraction(columnChild)}/>
                          </div>
                        }
                        key={columnChild.nodeId}
                        onClick={()=>handleChangeDokFile(columnChild)}>
                      </TreeItem>
                  )})
                :
                data.map((column)=>{
                if(column.group){
                  return(
                    <TreeItem nodeId={column.nodeId} label={column.label} key={column.nodeId}>
                      {data.map((columnChild)=>{
                        if(!columnChild.group && columnChild.prinadlejit === column.id){
                        return(
                          <Fragment>
                            <TreeItem
                              label={
                                <div className={classes.labelRoot}>
                                  <Typography variant="body2" >
                                    {columnChild.label}
                                  </Typography>
                                  <EditIcon className={classes.editIcon} onClick={()=>handleEditeInstraction(columnChild)}/>
                                </div>
                              }
                              nodeId={columnChild.nodeId}
                              key={columnChild.nodeId}
                              onClick={()=>handleChangeDokFile(columnChild)}>
                            </TreeItem>
                          </Fragment>
                        )}
                      })}
                    </TreeItem>
                  )
                }
              })}
            </TreeView>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Document
                file={docFile}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} scale={scale}/>
              </Document>
            </div>
          </Grid>
        </Grid>
    </Fragment>
  );
}
