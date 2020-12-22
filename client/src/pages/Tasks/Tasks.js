import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Title from '../../components/Title/Title'
import {Input} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ModalTasks from './ModalTasks'
import {useQuery} from '@apollo/client'
import {GetAllTasks} from './query'

const columns = [
  {id: 'id', label: '№', minWidth: 50},
  {id: 'theme', label: 'Тема', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'responsible', label: 'Ответственный', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'date', label: 'Дата', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'status', label: 'Статус', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'priority', label: 'Приоритет', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'author', label: 'Автор', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'text', label: 'Текст', minWidth: 170, maxWidth: 250, align: 'left'},
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  cell: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  cellTheme: {
    maxWidth: 250,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cellText: {
    maxWidth: 250,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  container: {
    maxHeight: 800,
    width: '100%',
  },
  pagination: {
    height: 50,
    overflow: 'hidden',
  },
  input_search: {
    marginBottom: 15,
  },
  title: {},
  button_open: {},
  pagination_text: {},
  caption: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  container_toolbar: {},
}))

export default function Tasks() {
  const {loading, error, data} = useQuery(GetAllTasks)
  console.log(error)
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [opened, setOpened] = useState(false)
  const [item, setItem] = useState({})
  const [dataTasks, setDataTasks] = useState([])
  const [searchText, setSearchText] = useState(null)

  useEffect(() => {
    if (!loading && data) {
      setDataTasks(data.tasks)
    }
  }, [loading, data])

  useEffect(() => {
    if (searchText === '') {
      setDataTasks(data.tasks)
    } else if (searchText === null) {
      return dataTasks
    } else {
      const filteredData = data.tasks.filter((data) => {
        return data.theme.toLowerCase().includes(searchText.toLowerCase().trim())
      })
      setDataTasks(filteredData)
    }
  }, [searchText])

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error </p>
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const closeModal = () => {
    setOpened(false)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const openModal = (item) => {
    setItem(item)
    setOpened(true)
  }

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.container_toolbar}>
        <Grid item className={classes.title} xs={6} md={1}>
          <Title>Задачи</Title>
        </Grid>
        <Grid item xs={6} sm={3} md={4} className={classes.button_open}>
          <ModalTasks opened={opened} closeModal={closeModal} items={item}/>
        </Grid>
        <Grid item xs={12} sm={3} md={2} className={classes.input_search}>
          <Input placeholder={'Поиск'} value={searchText || ''} onChange={(e) => setSearchText(e.target.value)}></Input>
        </Grid>
      </Grid>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{minWidth: column.minWidth}}
                    className={column.id === 'theme' ? classes.cellTheme : classes.cell}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => openModal(row)}
                  >
                    {columns.map((column) => {
                      let value = column.id === 'status' ? row[column.id] ? 'Закрыта' : 'В работе' : row[column.id]
                      if (row[column.id] instanceof Object) {
                        value = row[column.id].title ? row[column.id].title : row[column.id].name
                      }
                      return (
                        <TableCell key={column.id} align={column.align}
                                   className={column.id === 'theme' ? classes.cellTheme : column.id === 'text'? classes.cellText: classes.cell}>
                          {value}
                          {/*{column.format && typeof value === 'number' ? column.format(value) : value}*/}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataTasks.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={'Строк на странице'}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          className={classes.pagination}
          classes={{caption: classes.caption}}
        />
      </Paper>
    </React.Fragment>
  )
}
