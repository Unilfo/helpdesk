import React, {Fragment, useEffect, useState} from 'react'
import Title from '../../components/Title/Title'
import Grid from '@material-ui/core/Grid'
import TablePagination from '@material-ui/core/TablePagination'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ModalForm from '../Instructions/Modal'
import {Input} from '@material-ui/core'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Button from '@material-ui/core/Button'

//Нужно добавить логин пароль аватрку


const columns = [
  {id: 'id', label: '№', minWidth: 50,},
  {id: 'fio1', label: 'Фамилия', minWidth: 170, maxWidth: 250, align: 'left',},
  {id: 'fio2', label: 'Имя', minWidth: 170, maxWidth: 250, align: 'left',},
  {id: 'fio3', label: 'Отчество', minWidth: 170, maxWidth: 250, align: 'left',},
  {id: 'status', label: 'Статус', minWidth: 170, maxWidth: 250, align: 'left',},
  {id: 'role', label: 'Роль', minWidth: 170, maxWidth: 250, align: 'left',},
  {id: 'tabNumber', label: 'Табельный номер', minWidth: 170, maxWidth: 250, align: 'left',},
  {id: 'login', label: 'login', minWidth: 170, maxWidth: 250, align: 'left',},
  {id: 'password', label: 'password', minWidth: 170, maxWidth: 250, align: 'left',},
]

function createData(id, fio1, fio2, fio3, status, role, tabNumber, login, password) {
  return {id, fio1, fio2, fio3, status, role, tabNumber, login, password}
}


const rows = [
  createData(1, 'Иванов', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '12', 'pog', 'qwe'),
  createData(2, 'Иванов', 'Иван', 'Иванович', {id: 2, label: 'Неактивен'}, {
    id: 1,
    label: 'Администратор'
  }, '34', 'login', 'qwe'),
  createData(3, 'Иванов', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '123', 'login', 'qwe'),
  createData(4, 'Иванов', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '96', 'login', 'qwe'),
  createData(5, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 1,
    label: 'Администратор'
  }, '0', 'login', 'qwe'),
  createData(6, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(7, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(8, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(9, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(10, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(11, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(12, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(13, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(14, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(15, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(16, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
  createData(17, 'петров', 'Иван', 'Иванович', {id: 1, label: 'Действует'}, {
    id: 2,
    label: 'Пользователь'
  }, '0', 'login', 'qwe'),
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    // maxHeight: 535,
  },
  pagination: {
    height: 50,
    overflow: 'hidden',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  input_search: {
    marginBottom: 15
  },
  caption: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  button_open:{
    [theme.breakpoints.down('sm')]: {
      paddingBottom:'0px!important',
    },
  },
}))

export default function Employees() {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [open, setOpen] = React.useState(false)
  const [searchText, SetSearchText] = useState(null)
  const [dataT, setData] = useState(rows)
  const [sortData, setSortData] = useState(null)
  const [item, setItem] = useState({})


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const openModal = (item) => {
    if (item) {
      setItem(item)
    } else {
      const itemNull = {
        id: '',
        fio1: '',
        fio2: '',
        fio3: '',
        role: {id: '', label: ''},
        status: {id: '', label: ''},
        tabNumber: {},
        login: '',
        password: ''
      }
      setItem(itemNull)
    }
    setOpen(true)
  }

  const search = (event) => {
    SetSearchText(event.target.value)
  }

  useEffect(() => {
    if (searchText == null)
      return rows
    else {
      const filteredRowsFIO = rows.filter((data) => {
        return data.fio1.toLowerCase().includes(searchText.toLowerCase().trim())
      })
      const filteredRowsTabelNumber = rows.filter((data) => {
        return data.tabNumber.toLowerCase().includes(searchText.toLowerCase().trim())
      })
      const filteredRowsByLogin = rows.filter((data) => {
        return data.login.toLowerCase().includes(searchText.toLowerCase().trim())
      })
      const filteredRows = [...new Set([...filteredRowsFIO, ...filteredRowsTabelNumber, ...filteredRowsByLogin])]
      setData(filteredRows)
    }
  }, [searchText])


  useEffect(() => {
    if (sortData !== null) {
      const arr = rows.sort((a, b) => (a[sortData] - b[sortData]) ? -1 : 1)
      setData(arr)
    }
  }, [sortData])

  useEffect(() => () => {
    setSortData(null)
  })


  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item className={classes.title}>
          <Title>Пользователи</Title>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.button_open}>
          <Button variant="contained" color='primary' size='small' onClick={openModal}>Добавить</Button>
          <ModalForm opened={open} closeModal={closeModal} item={item}/>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.input_search}>
          <Input placeholder={'Поиск'} onChange={search}></Input>
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
                    onClick={() => setSortData(column.id)}
                  >
                    {column.label}
                    <TableSortLabel/>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataT.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => openModal(row)}>
                    {columns.map((column) => {
                      const value = row[column.id].label ? row[column.id].label : row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
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
    </Fragment>
  )
}
