import { todoAuthLogin, todoAuthRegister } from 'features/todo/redux/slices/todoAuthSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

import AuthView from './auth-view'

const AuthContainer = () => {
  const dispatch = useDispatch()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [age, setAge] = React.useState('')

  const [isRegister, setIsRegister] = React.useState(false)

  const handleChange = {
    name: setName,
    email: setEmail,
    password: setPassword,
    age: setAge,
  }
  const handleSubmit = () => {
    if (isRegister) {
      dispatch(todoAuthRegister({
        email,
        password,
        name,
        age: +age,
      }))
    } else {
      dispatch(todoAuthLogin({
        email,
        password,
      }))
    }
  }
  const propsView = {
    handleChange,
    handleSubmit,
    isRegister,
    setIsRegister,
    name,
    email,
    password,
    age,
  }
  return <AuthView {...propsView} />
}

export default AuthContainer