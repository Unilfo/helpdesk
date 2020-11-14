import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Title from '../components/Title'
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ModalTasks from './ModalTasks'

const columns = [
  { id: 'id', label: '№', minWidth: 50,},
  { id: 'theme', label: 'Тема', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'responsible', label: 'Ответственный', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'data', label: 'Дата', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'status', label: 'Статус', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'author', label: 'Автор', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'text', label: 'Текст', minWidth: 170, maxWidth: 250, align: 'left'},
];

function createData(id, theme, responsible, data, status, author, text) {
  return { id, theme, responsible, data, status, author, text};
}

const rows = [
  createData(1, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(2, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(3, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(4, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(5, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(6, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(7, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(8, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(9, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(10, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(11, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(12, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(13, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(14, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(15, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(16, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(17, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(18, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(19, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(20, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(21, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(22, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
  createData(23, 'Тема 1', 'Иванов', '01012020', 'в работе', 'Петров', '123'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 535,
    width: '100%',
  },
  pagination:{
    height: 50,
    overflow: 'hidden'
  },
});

export default function Tasks() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [opened, setOpened] = useState(false)


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const closeModal =() => {
    setOpened(false)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item>
          <Title>Задачи</Title>
        </Grid>
        <Grid item xs={3}>
          <ModalTasks opened={opened} closeModal={closeModal}/>
          {/*<Button variant="contained" color='primary' size='small' onClick={()=>setOpened(true)}>Создать</Button>*/}
        </Grid>
        <Grid item xs={3}>
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
          style={{ minWidth: column.minWidth }}
        >
          {column.label}
        </TableCell>
      ))}
      </TableRow>
      </TableHead>
      <TableBody>
      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {column.format && typeof value === 'number' ? column.format(value) : value}
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
    </React.Fragment>
  );
}
