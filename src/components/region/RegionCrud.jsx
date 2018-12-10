import React, { Component } from 'react'
import Main from '../template/Main'
import { getAxiosInstance, getStateUrl, getRegionUrl } from '../../services';

const headerProps = {
    icon: 'hour',
    title: 'Regiões',
    subtitle: 'Cadastro de Regiões'
}

const baseUrl = getRegionUrl()
const statesUrl = getStateUrl()

const initialState = {
    region: { name: '', searchActive: '', stateId: '', stateName: ''},
    list: [], 
    statesList: []
}

export default class RegionCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        getAxiosInstance()(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
        getAxiosInstance()(statesUrl).then(resp => {
            this.setState({ statesList: resp.data })
        })
    }

    clear() {
        this.setState({ region: initialState.region })
    }

    save() {
        const region = this.state.region
        const method = region._id ? 'put' : 'post'
        const url = region._id ? `${baseUrl}/${region._id}` : baseUrl

        getAxiosInstance()[method](url, region)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                //Zera o user do initial state, e seta  a lista atualizada.
                this.setState({ region: initialState.region, list })
            })
    }

    getUpdatedList(region){
        //Retorna uma lista com todos os elementos menos o atual.
        const list = this.state.list.filter(u => u._id !== region._id)

        //Coloca o elemento na primeira posição da lista.
        if (region) list.unshift(region)

        return list
    }

    updateField(event) {
        if (event.target.type === 'text'){
            const region = { ...this.state.region }
            region[event.target.name] = event.target.value
            this.setState({ region })
        }
        if (event.target.type === 'checkbox'){
            const region = { ...this.state.region }
            region[event.target.name] = event.target.value === 'true' ? false : true //Inversion.
            this.setState({ region })
        }
        //Como só tem 1 select, já sei que as informações são do state.
        if (event.target.type === 'select-one'){
            const region = { ...this.state.region }
            region.stateId = event.target.value
            region.stateName = event.target.selectedOptions[0].text;
            this.setState({ region })
        }

    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                <div className="col-12 col-md-4">
                        <div className="formGroup">
                            <label>Estado</label>
                            <select className="form-control" name="state" value={this.state.region.stateId}
                                onChange={e => this.updateField(e)} required>
                                    <option value="-1">Selecione</option>
                                    {this.renderStatesToSelect()}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="formGroup">
                            <label>Região</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.region.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a região" />
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="formGroup">
                            <label className="centered">Ativo</label>
                            <input type="checkbox" className="form-control" 
                                name="searchActive"
                                value={this.state.region.searchActive}
                                checked={this.state.region.searchActive === true}
                                onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(region){
        this.setState({ region })
    }

    remove(region){
        getAxiosInstance().delete(`${baseUrl}/${region._id}`).then(resp => {
            const list = this.state.list.filter(u => u !== region)
            //const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Estado</th>
                        <th>Região</th>
                        <th>Ativo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(region => {
            return (
                <tr key={region._id}>
                    <td>{region.stateName}</td>
                    <td>{region.name}</td>
                    <td>{region.searchActive === true ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(region)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(region)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderStatesToSelect(){
        return this.state.statesList.map(state => {
            return (
                <option key={state._id} value={state._id} id={state._id}>
                    {state.name}
                </option>
            )
        })
    }

    render(){
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}

