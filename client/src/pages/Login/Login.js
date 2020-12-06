import React, {useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {useHistory, withRouter} from 'react-router-dom'
import {LOGIN} from './query'
import {useMutation} from '@apollo/client'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    marginTop: 15,
    color: 'red',
  },
}))

function SignInSide() {
  let history = useHistory()
  const classes = useStyles()
  const [login, setlogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [logined] = useMutation(LOGIN)


  useEffect(() => {
    history.push('/home')
  }, [])

  const changeLogin = (e) => {
    setlogin(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const Error = () => {
    if (error) {
      return (
        <div className={classes.error}>
          Неверный логин или пароль
        </div>
      )
    }
    return null
  }

  const submit = (e) => {
    e.preventDefault()
    logined({
      variables: {
        login,
        password,
      },
    }).then(({data}) => {
      if (data.loginUser.token !== 'fail') {
        localStorage.setItem('token', data.loginUser.token)
        history.push({
          pathname: '/home',
        });
      } else {
        setError(true)
      }
    })
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline/>
      <Grid item xs={false} sm={4} md={7} className={classes.image}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Help desk
          </Typography>
          <Error/>
          <form className={classes.form} onSubmit={submit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Логин"
              name="email"
              autoComplete="email"
              autoFocus
              value={login}
              onChange={changeLogin}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={changePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Войти
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default withRouter(SignInSide )

