import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './pages/Main'
import Cadastrar from './pages/Cadastrar'
import Editar from './pages/Editar'

function Routes() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Main} />
      <Route path='/create' component={Cadastrar} />
      <Route path='/edit/:id' component={Editar} />
    </BrowserRouter>
  )
}

export default Routes
