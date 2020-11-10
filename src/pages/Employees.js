import React, {Fragment, useEffect, useState} from 'react'
import Title from '../components/Title';
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
import ModalForm from './Modal'
import {Input} from '@material-ui/core'
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button'

const columns = [
  { id: 'id', label: '№', minWidth: 50,},
  { id: 'fio1', label: 'Фамилия', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'fio2', label: 'Имя', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'fio3', label: 'Отчество', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'status', label: 'Статус', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'role', label: 'Роль', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'tabNumber', label: 'Табельный номер', minWidth: 170, maxWidth: 250, align: 'left'},
];

function createData(id, fio1, fio2, fio3, status, role, tabNumber) {
  return { id, fio1, fio2, fio3, status, role, tabNumber};
}

const rows = [
  createData(1, 'Иванов', 'Иван', 'Иванович', 'действует', 'admin', '12'),
  createData(2, 'Иванов', 'Иван', 'Иванович', 'действует', 'admin', '34'),
  createData(3, 'Иванов', 'Иван', 'Иванович', 'действует', 'admin', '123'),
  createData(4, 'Иванов', 'Иван', 'Иванович', 'действует', 'admin', '96'),
  createData(5, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(6, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(7, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(8, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(9, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(10, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(11, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(12, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(13, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(14, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(15, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(16, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
  createData(17, 'петров', 'Иван', 'Иванович', 'действует', 'admin', '0'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 535,
  },
  pagination:{
    height: 50,
    overflow: 'hidden'
  },
});

export default function Employees() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [searchText, SetSearchText] = useState(null)
  const [dataT, setData] = useState(rows)
  const [sortData, setSortData] = useState(null)
  const [item, setItem] = useState({})


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const closeModal =() => {
    setOpen(false)
  }

  const openModal = (item) => {
    setItem(item)
    setOpen(true)
  }

  const search = (event) => {
    SetSearchText(event.target.value)
  }

  useEffect(()=>{
    if(searchText == null)
      return rows
    else{
      const filteredRowsFIO = rows.filter((data) => {
        return data.fio1.toLowerCase().includes(searchText.toLowerCase().trim())
      })
      const filteredRowsTabelNumber = rows.filter((data) => {
        return data.tabNumber.toLowerCase().includes(searchText.toLowerCase().trim())
      })
      const filteredRows = [...new Set([...filteredRowsFIO, ...filteredRowsTabelNumber])]
      setData(filteredRows)
    }
  },[searchText])


  useEffect(()=>{
    if(sortData !== null) {
      const arr = rows.sort((a, b) => (a[sortData] - b[sortData]) ? -1 : 1)
      setData(arr)
    }
  },[sortData])

  useEffect(()=>()=>{
    setSortData(null)
  })


  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Title>Пользователи</Title>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color='primary' size='small' onClick={openModal}>Добавить</Button>
          <ModalForm opened={open} closeModal={closeModal} item={item}/>
        </Grid>
        <Grid item xs={3}>
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
                    style={{ minWidth: column.minWidth }}
                    onClick={()=>setSortData(column.id)}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={()=>openModal(row)}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
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
        />
      </Paper>
    </Fragment>
  )
}
