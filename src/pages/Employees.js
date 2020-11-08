import React, {Fragment} from 'react'
import Title from '../components/Title';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TablePagination from '@material-ui/core/TablePagination'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import makeStyles from '@material-ui/core/styles/makeStyles'


const columns = [
  { id: 'id', label: '№', minWidth: 50,},
  { id: 'fio1', label: 'Фамилия', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'fio2', label: 'Имя', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'fio3', label: 'Отчество', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'status', label: 'Статус', minWidth: 170, maxWidth: 250, align: 'left'},
  { id: 'role', label: 'Роль', minWidth: 170, maxWidth: 250, align: 'left'},
];

function createData(id, fio1, fio2, fio3, status, role) {
  return { id, fio1, fio2, fio3, status, role};
}

const rows = [
  createData(1, 'Иванов', 'Иван', 'Иванович', 'действует', 'admin'),
  createData(1, 'Иванов', 'Иван', 'Иванович', 'действует', 'admin'),
  createData(1, 'Иванов', 'Иван', 'Иванович', 'действует', 'admin'),
  createData(1, 'Иванов', 'Иван', 'Иванович', 'действует', 'admin'),
  createData(1, 'Иванов', 'Иван', 'Иванович', 'действует', 'admin'),
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={3} spacing={3}>
          <Title>Пользователи</Title>
        </Grid>
        <Grid item xs={3} spacing={3}>
          <Button variant="contained" color='primary' size='small'>Создать</Button>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
    </Fragment>
  )
}
