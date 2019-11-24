import React, { useState } from 'react'

import api from '../services'

function Cadastrar({ history }) {

  const [descricao, setDescricao] = useState()
  const [idProjeto, setIdProjeto] = useState()

  async function save() {
    await api.post('atividade/create', {
      descricao: descricao,
      idProjeto: idProjeto
    })

    history.push('../')
  }

  return (
    <>
      <br /><br /><br /><br />
      <br /><br /><br /><br />

      <div className="container">
        <div className="card-panel blue">
          <h4>Cadastrar Evento</h4>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s10">
                <input
                  id="descricao"
                  type="text"
                  value={descricao}
                  onChange={(event) => { setDescricao(event.target.value) }} />
                <label className="active" htmlFor="descricao">Descrição</label>
              </div>
              <div className="input-field col s2">
                <input
                  id="id_projeto"
                  type="number"
                  value={idProjeto}
                  onChange={(event) => setIdProjeto(event.target.value)}
                />
                <label htmlFor="id_projeto" className="active">Id Projeto</label>
              </div>
            </div>
            <button
              className="blue btn waves-effect waves-light"
              type="submit"
              onClick={() => save()}
            >
              <i className="material-icons right">send</i>Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cadastrar
