import React, {useState, useEffect, useContext} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import useLocalStorage from '../utils/useLocalStorage'
import useFetch from '../utils/useFetch'
import {CurrentUserContext} from '../utils/CurrentUser'
import {Redirect} from 'react-router-dom'


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

export default function SignInSide(props) {
  const classes = useStyles()
  // const isLogin = props.match.path === '/login'
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
  const [{isLoading, response, error}, doFetch] = useFetch()
  const [, setToken] = useLocalStorage('token')
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext)
  console.log('currentUserState', currentUserState)


  const handleSubmit = event => {
    event.preventDefault()
    doFetch({
      login,
      password,
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }

    console.log('response', response)
    if(response.token === 'ok'){

    }else if(response.token !== 'ok' && response.token !== 'fail'){
      setToken(response.token)
    }
    setIsSuccessfullSubmit(true)
    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.token,
    }))
  }, [response, setToken, setCurrentUserState])

  if (isSuccessfullSubmit) {
    return <Redirect to="/"/>
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
          {/*<Error/>*/}
          <form className={classes.form} onSubmit={handleSubmit}>
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
              onChange={(e) => setLogin(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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


