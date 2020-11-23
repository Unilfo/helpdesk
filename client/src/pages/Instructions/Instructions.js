import React, {Fragment, useEffect, useState} from 'react'
import Title from '../../components/Title/Title'
import Grid from '@material-ui/core/Grid'
import {Input} from '@material-ui/core'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import ModalInstraction from './ModalInstraction'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import InstractionVeaver from './instractionVeaver'

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
    wordWrap: 'break-word'
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
  const classes = useStyles()
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState(dataFetch)
  const [open, setOpen] = useState(false);
  const [instraction, setInstraction] = useState({})
  const [openedInstraction, setOpenedInstraction] = useState(false)


  const closeModal =() => {
    setOpen(false)
    setOpenedInstraction(false)
  }

  useEffect(()=>{
    if(searchText === ''){
      setData(dataFetch)
    }
    else{
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
    setSearchText(event.target.value)
  }

  const openModal = () => {
    setInstraction({})
    setOpen(true)
  }

  const handleEditeInstraction = (item) => {
    setInstraction(item)
    setOpen(true)
  }

  const openedinatraction = (item) => {
    setInstraction(item)
    setOpenedInstraction(true)
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
        <ModalInstraction opened={open} closeModal={closeModal} instraction={instraction}/>
        <InstractionVeaver openedInstraction={openedInstraction} instraction={instraction} closeModal={closeModal}/>
        <Grid item>
          <Title>Инструкции</Title>
        </Grid>
        <Grid item xs={2}>
          <Input placeholder={'Поиск'} value={searchText} onChange={handleChange}></Input>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color='primary' size='small' onClick={openModal}>Создать</Button>
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
                        onDoubleClick={()=>openedinatraction(columnChild)}
                        key={columnChild.nodeId}
                        label={
                          <div className={classes.labelRoot}>
                            <Typography variant="body2" >
                              {columnChild.label}
                            </Typography>
                            <EditIcon className={classes.editIcon} onClick={()=>handleEditeInstraction(columnChild)}/>
                          </div>
                        }
                      >
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
                            <TreeItem
                              onDoubleClick={()=>openedinatraction(columnChild)}
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
                            >
                            </TreeItem>
                        )}
                        return ''
                      })}
                    </TreeItem>
                  )
                }
                return ''
              })}
            </TreeView>
          </Grid>
        </Grid>
    </Fragment>
  );
}
