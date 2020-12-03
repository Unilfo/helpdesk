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
import './instraction.css'
import {gql, useQuery} from '@apollo/client'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  labelRoot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  editIcon: {
    color: '#3f51b5',
    '&:hover': {
      color: 'green',
    },
  },
  input_search: {
    minWidth:225
  },
}))

const GetAllInstractions = gql`
    query GetAllInstractions{
        instraction{
            id
            title
            path
            belongs
            group
            name
        }
    }
`

export default function Instructions() {
  const {loading, error, data} = useQuery(GetAllInstractions)
  const classes = useStyles()
  const [searchText, setSearchText] = useState('')
  const [dataInstraction, setDataInstraction] = useState([])
  const [open, setOpen] = useState(false)
  const [instraction, setInstraction] = useState({})
  const [openedInstraction, setOpenedInstraction] = useState(false)

  useEffect(() => {
    if (searchText === '') {
      if (!loading && data) {
        setDataInstraction(data.instraction)
      }
    } else {
      const filteredData = dataInstraction.filter((el) => {
        if (!el.group) {
          return el.title.toLowerCase().includes(searchText.toLowerCase().trim())
        }
      })
      const newData = [...new Set([...filteredData])]
      setDataInstraction(newData)
    }
  }, [searchText])

  useEffect(() => {
    if (!loading && data) {
      setDataInstraction(data.instraction)
    }
  }, [loading, data])

  useEffect(() => () => {
    setInstraction({})
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error </p>
  }

  const closeModal = () => {
    setOpen(false)
    setOpenedInstraction(false)
  }

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
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={3}
        >
          <ModalInstraction opened={open} closeModal={closeModal} instraction={instraction}/>
          <InstractionVeaver openedInstraction={openedInstraction} instraction={instraction} closeModal={closeModal}/>
          <Grid item>
            <Title>Инструкции</Title>
          </Grid>
          <Grid item>
            <Button variant="contained" color='primary' size='small' onClick={openModal}>Создать</Button>
          </Grid>
          <Grid item>
            <Input placeholder={'Поиск'} value={searchText} onChange={handleChange} className={classes.input_search}></Input>
          </Grid>
          <Grid item xs={12} md={12} lg={12} sm={12}>
            <TreeView
              className={classes.root}
              defaultCollapseIcon={<ExpandMoreIcon/>}
              defaultExpandIcon={<ChevronRightIcon/>}
              multiSelect
            >
              {searchText !== '' ?
                dataInstraction.map((columnChild) => {
                  return (
                    <TreeItem
                      nodeId={columnChild.id}
                      onDoubleClick={() => openedinatraction(columnChild)}
                      key={columnChild.id}
                      label={
                        <div className={classes.labelRoot}>
                          <Typography>
                            {columnChild.title}
                          </Typography>
                          <EditIcon className={classes.editIcon} onClick={() => handleEditeInstraction(columnChild)}/>
                        </div>
                      }
                    >
                    </TreeItem>
                  )
                })
                :
                dataInstraction.map((column) => {
                  if (column.group) {
                    return (
                      <TreeItem nodeId={column.id} label={column.title} key={column.id}>
                        {dataInstraction.map((columnChild) => {
                          if (!columnChild.group && columnChild.belongs == column.id) {
                            return (
                              <TreeItem
                                onDoubleClick={() => openedinatraction(columnChild)}
                                label={
                                  <div className={classes.labelRoot}>
                                    <Typography>
                                      {columnChild.title}
                                    </Typography>
                                    <EditIcon className={classes.editIcon}
                                              onClick={() => handleEditeInstraction(columnChild)}/>
                                  </div>
                                }
                                nodeId={columnChild.id}
                                key={columnChild.id}
                              >
                              </TreeItem>
                            )
                          }
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
      </Container>
    </Fragment>
  )
}
