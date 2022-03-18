import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

type Props = {
  handleChange,
  handleSubmit,
  isRegister,
  setIsRegister,
  name,
  email,
  password,
  age,
}

const AuthView = ({
  handleChange,
  handleSubmit,
  isRegister,
  setIsRegister,
  name,
  email,
  password,
  age,
}: Props) => {
  return (
    <Grid container>
      <Grid item>
        <Grid>{isRegister ? 'Register' : 'Login'}</Grid>
        <Button onClick={() => setIsRegister(!isRegister)}>
          Click to {isRegister ? 'Login' : 'Register'}
        </Button>
      </Grid>
      <Grid item container direction="column">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          flexDirection="column"
        >
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => handleChange['email'](event.currentTarget.value)}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => handleChange['password'](event.currentTarget.value)}
          />
          {isRegister && (
            <>
              <TextField
                required={isRegister}
                id="name"
                label="Name"
                value={name}
                onChange={(event) => handleChange['name'](event.currentTarget.value)}
              />
              <TextField
                required={isRegister}
                id="age"
                label="Age"
                type="number"
                value={age}
                onChange={(event) => handleChange['age'](event.currentTarget.value)}
              />
            </>
          )}
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AuthView