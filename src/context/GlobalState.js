import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {
  name: '',
  token: '',
  error: null
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function setData(data) {
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  }

  return (
    <GlobalContext.Provider value={{
      name: state.name,
      token: state.token,
      error: state.error,
      setData
    }}>{children}</GlobalContext.Provider>
  )
}