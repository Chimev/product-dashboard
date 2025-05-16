'use client'

import { store } from '@/store'
import React from 'react'
import { Provider } from 'react-redux'

const ReduxProvider = ({children}: any) => {
  return (
    <div>
        <Provider store={store}>
         {children}
        </Provider>
        
      
    </div>
  )
}

export default ReduxProvider