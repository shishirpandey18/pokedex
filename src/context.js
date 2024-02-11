import React, { useContext, useReducer, useState } from "react"
const AppContext =React.createContext()


const AppProvider = ({children})=>{

    // useReducer[state,dispatch]=useState(reducer,initialState)
    return (
        <AppContext.Provider value="shishir pandey">{children}</AppContext.Provider>
    )
}

//custom hook create
const useGlobalContext=()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalContext}