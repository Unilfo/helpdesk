import React, {Fragment, useEffect, useRef, useState} from 'react'
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
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import WebViewer from '@pdftron/webviewer'

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const dataFetch = [
  {id:1, nodeId:'1', label:'1c', path:'asd', prinadlejit:1, group:true},
  {id:2, nodeId:'2', label:'Axapta', path:'asd', prinadlejit:2, group:true},
  {id:3, nodeId:'3', label:'q', path:'asd324324', prinadlejit:1, group:false},
  {id:4, nodeId:'4', label:'w', path:'asd', prinadlejit:1, group:false},
  {id:5, nodeId:'5', label:'инструкция', path:'asd', prinadlejit:1, group:false},
  {id:6, nodeId:'6', label:'rrrr', path:'asd', prinadlejit:2, group:false},
  {id:7, nodeId:'7', label:'rrrrrrrwwer', path:'asd', prinadlejit:1, group:false},
  {id:8, nodeId:'8', label:'инструкция по 1с', path:'asd', prinadlejit:2, group:false},
  {id:9, nodeId:'9', label:'u', path:'asd', prinadlejit:1, group:false},
  {id:10, nodeId:'10', label:'i', path:'asd', prinadlejit:1, group:false},
]


export default function Instructions() {
  const classes = useStyles();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearhText] = useState('')
  const [data, setData] = useState(dataFetch)

  const viewer = useRef(null);


  useEffect(() => {
    WebViewer(
      {
        path: '/public',
        initialDoc: 'Kak_ustroen_JavaScript_2019_Krokford.pdf',
      },
      viewer.current,
    ).then((instance) => {
      const { docViewer } = instance;
      docViewer.on('documentLoaded', () => {
        console.log('asdasd')
      });
    });
  }, []);




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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const handleChange = (event) => {
    setSearhText(event.target.value)
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item>
          <Title>Инструкции</Title>
        </Grid>
        <Grid item xs={3}>
          <Input placeholder={'Поиск'} value={searchText} onChange={handleChange}></Input>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
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
                      label={columnChild.label}
                      key={columnChild.nodeId}
                      onClick={()=>console.log(columnChild.path)}/>
                  )}):
                data.map((column)=>{
                if(column.group){
                  return(
                    <TreeItem nodeId={column.nodeId} label={column.label} key={column.nodeId}>
                      {data.map((columnChild)=>{
                        if(!columnChild.group && columnChild.prinadlejit === column.id){
                        return(
                          <TreeItem
                            nodeId={columnChild.nodeId}
                            label={columnChild.label}
                            key={columnChild.nodeId}
                            onClick={()=>console.log(columnChild.path)}/>
                        )}
                      })}
                    </TreeItem>
                  )
                }
              })}
            </TreeView>
          </Grid>
          <Grid item xs={6}>
            <Document
              file="Kak_ustroen_JavaScript_2019_Krokford.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div>
              <p>
                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
              </p>
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
              >
                Previous
              </button>
              <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          </Grid>
        </Grid>
      <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
    </Fragment>
  );
}
