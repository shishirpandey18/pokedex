import React from 'react'
import MyRoute from './MyRoute'
import { AppProvider } from './context'
import { createContext } from 'react';

const initialState = {
  rock:"#f7f7f",
  ghost:'#ffffa1',
  electric:'#F6D6A7',
  bug:'#e0a7f6',
  poison:'#F4F4F4',
  normal:'#ffc0cbdc',
  fairy:'#FBE3DF',
  grass:'#E2F9E1',
  water:'#E0F1FD',
  dark:'#FBE3DF',
  flying:'#FBE3D',
  psychic:'#FBE3DF',
  ice:'#FBE3DF',
  dragon:'#FBE3DF',
  fire:'#FBE3DF',
  icon:'moon',
  normal:'#FBE3F',
  ground:'#FBE3DF',
  fighting:'#FBE3DF',
  steel:'#FBE3DF',
  shadow:'#FBE3DF',
}
export const colorContext = createContext(initialState)

const App = () => {


  return (
    <>
    <colorContext.Provider value={initialState}>
    
    <AppProvider>
    <MyRoute/>
    </AppProvider>
    
    </colorContext.Provider>
    </>
  )
}

export default App