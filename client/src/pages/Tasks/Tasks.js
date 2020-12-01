import React, {useState} from 'react'
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


const columns = [
  {id: 'id', label: '№', minWidth: 50,},
  {id: 'theme', label: 'Тема', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'responsible', label: 'Ответственный', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'data', label: 'Дата', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'status', label: 'Статус', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'author', label: 'Автор', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'text', label: 'Текст', minWidth: 170, maxWidth: 250, align: 'left'},
]

function createData(id, theme, responsible, data, status, author, text) {
  return {id, theme, responsible, data, status, author, text}
}

const rows = [
  createData(1, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(2, 'Тема 2', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(3, 'Тема 3', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(4, 'Тема 4', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(5, 'Тема 5', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(6, 'Тема 6', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(7, 'Тема 7', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(8, 'Тема 8', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(9, 'Тема 9', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(10, 'Тема 10', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(11, 'Тема 11', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(12, 'Тема 12', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(13, 'Тема 13', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(14, 'Тема 14', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(15, 'Тема 15', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(16, 'Тема 16', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(17, 'Тема 17', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(18, 'Тема 18', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(19, 'Тема 19', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
    marginBottom: 15
  },
  title: {

  },
  button_open:{

  },
  pagination_text:{

  },
  caption: {
    [theme.breakpoints.up('xs')]: {
      display:'none'
    },
  },
  container_toolbar: {}
}))

export default function Tasks() {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [opened, setOpened] = useState(false)
  const [item, setItem] = useState({})

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
          <Input placeholder={'Поиск'}></Input>
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
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    onClick={() => openModal(row)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
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
          count={rows.length}
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
