import React from 'react';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            motivo: '',  // String
            tipo: '',   // String // inamovible | trasladable | nolaborable | puente
            dia: '',    // Number // Día del mes
            mes: '',    // Number // Número de mes en base 1 (enero = 1)
            _id: '',
            id: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addDia = this.addDia.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    addDia(e) {
        e.preventDefault();
        if (this.state._id) {
            fetch(`http://localhost:80/api/feriados/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({_id: '', title: '', description: ''});
                    this.fetchTasks();
                });
        } else {
            fetch('http://localhost:80/api/feriados', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({html: 'Task Saved'});
                    this.setState({title: '', description: ''});
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }

    }

    edit(id) {
        fetch(`http://localhost:80/api/feriados/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    motivo: data.motivo,
                    tipo: data.tipo,
                    _id: data._id
                });
            });
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('http://localhost:80/api/feriados')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                console.log(this.state.tasks);
            });
    }

    render() {
        return (
            <div>
                <nav className="navbar-left  navbar navbar-light bg-light">
                    <span className="ml-auto navbar-brand mb-0 h1">Feriados</span>
                </nav>
                <div className="container" style={{padding: '10px'}}>

                    <div className="row col-12">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form onSubmit={this.addDia} className="form-inline">
                                            <div className="form-group row">
                                                <div className="form-group mb-2">
                                                    <label htmlFor="staticEmail"
                                                           className="col-sm-3 col-form-label">Motivo</label>

                                                    <input name="motivo" onChange={this.handleChange}
                                                           value={this.state.motivo} type="text"
                                                           placeholder="Motivo"

                                                    />
                                                </div>
                                                <div className="form-group mb-2">
                                                    <label htmlFor="staticEmail"
                                                           className="col-sm-3 col-form-label">Tipo</label>

                                                    <input name="tipo" onChange={this.handleChange}
                                                           value={this.state.tipo}
                                                           cols="60"
                                                           rows="10" placeholder="Tipo"></input>
                                                </div>
                                                <div className="form-group mb-2" style={{padding: '15px'}}>
                                                    <button type="submit" className="btn btn-secondary">
                                                        Enviar
                                                    </button>
                                                </div>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="card-body" style={{padding: '15px'}}>
                                    <table className="col-12">
                                        <thead>
                                        <tr>
                                            <th>Motivo</th>
                                            <th>Tipo</th>
                                            <th>Dia</th>
                                            <th>Mes</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.tasks.map(dia => {
                                                return (
                                                    <tr key={dia._id}>

                                                        <td>{dia.motivo}</td>
                                                        <td>{dia.tipo}</td>
                                                        <td>{dia.dia}</td>
                                                        <td>{dia.mes}</td>

                                                        <td>
                                                            <button onClick={() => this.edit(dia.id)}
                                                                    className="btn btn-success"
                                                            >
                                                                <i className="material-icons">editar</i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default App;
