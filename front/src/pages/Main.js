import React, { useState, useEffect } from 'react';

import api from '../services'

function Main({ history }) {

  const [atividades, setAtividades] = useState([])
  const [idAtividade, setIdAtividade] = useState()

  async function loadAtividades() {
    const response = await api.get('atividade/projeto/27')
    setAtividades(response.data)
  }

  useEffect(
    () => {
      loadAtividades()
    }, []
  )

  async function getAtividade($id) {
    const response = await api.get(`atividade/get/${$id}`)
    setAtividades([response.data])
  }

  async function remove($id) {
    await api.delete(`atividade/delete/${$id}`)
    loadAtividades()
  }

  return (
    <>
      <div className="container">
        <div className="card-panel blue">
          <a
            className="waves-effect waves-teal btn-flat"
            onClick={() => history.push('/create')}
          >Adicionar Atividade</a>
          <h4>Atividades</h4>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input
            id='id'
            type='number'
            value={idAtividade}
            onChange={(event) => { setIdAtividade(event.target.value) }}
          />
          <label className="active" for='id'>Id Ativide</label>
          <a
            onClick={() => getAtividade(idAtividade)}
            className="blue waves-effect waves-light btn"
          >
            <i className="right material-icons">search</i>Buscar
          </a>
        </div>
      </div>

      <table className="highlight">
        <thead>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th>Feito em</th>
            <th>Id Proj.</th>
            <th>Projeto</th>
            <th>editar</th>
            <th>excluir</th>
          </tr>
        </thead>
        <tbody>
          {(atividades) && (atividades.map((value, index) => (
            <tr key={index}>
              <td>{value.id}</td>
              <td>{value.descricao}</td>
              <td>{value.dataCadastro}</td>
              <td>{value.idProjeto}</td>
              <td>{value.descricaoProjeto}</td>
              <td>
                <a
                  className="blue btn"
                  onClick={() => history.push(`edit/${value.id}`)}
                >
                  <i className="material-icons">edit</i>
                </a>
              </td>
              <td>
                <a className="blue btn" onClick={() => remove(value.id)}>
                  <i className="material-icons">delete</i>
                </a>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </>
  )
}

export default Main
