import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
  userName: '',
  userToken: '',
  error: null
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function login(loginData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('https://carolinehoeg.com/semesterprojekt/api/login', loginData, config);

      dispatch({
        type: 'LOGIN',
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: error.response.data.error
      })
    }
  }

  return (
    <GlobalContext.Provider value={{
      userName: state.userName,
      userToken: state.userToken,
      error: state.error,
      login
    }}>{children}</GlobalContext.Provider>
  )
}