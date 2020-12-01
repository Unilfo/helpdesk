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
import ModalForm from './Modal'
import {Input} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {useQuery, gql} from '@apollo/client'

const GetAllUsers = gql`
    query GetAllUsers{
        users{
            id
            name
            patronymic
            surname
            roleId{
                title
            }
            statusId{
                title
            }
            tab_number
            login
            password
        }
    }
`


const columns = [
  {id: 'id', label: '№', minWidth: 80},
  {id: 'surname', label: 'Фамилия', minWidth: 150, maxWidth: 250, align: 'left'},
  {id: 'name', label: 'Имя', minWidth: 150, maxWidth: 250, align: 'left'},
  {id: 'patronymic', label: 'Отчество', minWidth: 150, maxWidth: 250, align: 'left'},
  {id: 'statusId', label: 'Статус', minWidth: 150, maxWidth: 250, align: 'left'},
  {id: 'roleId', label: 'Роль', minWidth: 170, maxWidth: 250, align: 'left'},
  {id: 'tab_number', label: 'Табельный номер', minWidth: 100, maxWidth: 250, align: 'left'},
  {id: 'login', label: 'login', minWidth: 100, maxWidth: 250, align: 'left'},
  {id: 'password', label: 'password', minWidth: 100, maxWidth: 250, align: 'left'},
]


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  pagination: {
    height: 50,
    overflow: 'hidden',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  input_search: {
    marginBottom: 15,
  },
  caption: {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
  },
  button_open: {},
}))

export default function Employees() {
  const {loading, error, data} = useQuery(GetAllUsers)
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [open, setOpen] = React.useState(false)
  const [searchText, SetSearchText] = useState(null)
  const [dataT, setData] = useState('')
  const [item, setItem] = useState({})

  // useEffect(()=>{
  //   setData(data)
  //   console.log(dataT)
  // },[data])

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error </p>
  }

  if (data) {
    // console.log(data)
  }


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
        password: '',
      }
      setItem(itemNull)
    }
    setOpen(true)
  }

  const search = (event) => {
    SetSearchText(event.target.value)
  }

  // useEffect(() => {
  //   if (searchText == null)
  //     return data
  //   else {
  //     const filteredRowsFIO = data.filter((data) => {
  //       return data.fio1.toLowerCase().includes(searchText.toLowerCase().trim())
  //     })
  //     const filteredRowsTabelNumber = data.filter((data) => {
  //       return data.tabNumber.toLowerCase().includes(searchText.toLowerCase().trim())
  //     })
  //     const filteredRowsByLogin = data.filter((data) => {
  //       return data.login.toLowerCase().includes(searchText.toLowerCase().trim())
  //     })
  //     const filteredRows = [...new Set([...filteredRowsFIO, ...filteredRowsTabelNumber, ...filteredRowsByLogin])]
  //     setData(filteredRows)
  //   }
  // }, [searchText])

  // {dataT.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item className={classes.title}>
          <Title>Пользователи</Title>
        </Grid>
        <Grid item xs={6} sm={3} md={4} className={classes.button_open}>
          <Button variant="contained" color='primary' size='small' onClick={openModal}>Добавить</Button>
          <ModalForm opened={open} closeModal={closeModal} item={item}/>
        </Grid>
        <Grid item xs={12} sm={3} md={2} className={classes.input_search}>
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
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => openModal(row)}>
                    {columns.map((column) => {
                      let value = row[column.id]
                      if(row[column.id] instanceof Object){
                        value = row[column.id].title
                      }
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
          count={data.users.length}
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
