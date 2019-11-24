import React, { useEffect, useState } from 'react'

import api from '../services'

function Editar({ match, history }) {

  const [idProjetoPrevious, setIdProjetoPrevious] = useState()
  const [descricaoPrevious, setDescricaoPrevious] = useState()
  const [descricao, setDescricao] = useState()
  const [idProjeto, setIdProjeto] = useState()

  useEffect(() => {
    async function loadAtividade() {
      const response = await api.get(`atividade/get/${match.params.id}`)
      setDescricaoPrevious(response.data.descricao)
      setIdProjetoPrevious(response.data.idProjeto)
    }
    loadAtividade()
  }, [])

  async function save() {
    await api.put('atividade/put', {
      id: match.params.id,
      descricao: descricao,
      idProjeto: idProjeto
    })

    history.push('../../')
  }

  return (
    <>
      <br /><br /><br /><br />
      <br /><br /><br /><br />

      <div className="container">
        <div className="card-panel blue">
          <h4>Editar Evento</h4>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s8">
                <input
                  id="descricao"
                  type="text"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)} />
                <label className="active" htmlFor="descricao">Descrição anterior: {descricaoPrevious}</label>
              </div>
              <div className="input-field col s4">
                <input
                  id="id_projeto"
                  type="number"
                  value={idProjeto}
                  onChange={(event) => setIdProjeto(event.target.value)}
                />
                <label htmlFor="id_projeto" className="active">
                  Id Projeto Anterior: {idProjetoPrevious}
                </label>
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

export default Editar
