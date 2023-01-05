// Componentes Funcionales

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// Componentes de Clase

class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}


