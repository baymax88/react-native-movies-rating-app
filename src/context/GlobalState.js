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

  function setData(data) {
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  }

  function setName(name) {
    dispatch({
      type: 'SET_NAME',
      payload: name
    })
  }

  function removeData() {
    dispatch({
      type: 'DELETE'
    })
  }
  return (
    <GlobalContext.Provider value={{
      name: state.name,
      token: state.token,
      error: state.error,
      setData,
      setName,
      removeData
    }}>{children}</GlobalContext.Provider>
  )
}