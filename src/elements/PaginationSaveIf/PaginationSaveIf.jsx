import React, {Component} from 'react';
import Pager from "react-bootstrap/es/Pager";


export class PaginationSaveIf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: this.props.lista,
        };
    }

    render() {
        let statusPrev = "";
        let statusNext = "";


        if (this.props.pagina > 0) {
            statusPrev = <Pager.Item
                previous
                onClick={(e) => {
                    this.props.setPagina(this.props.pagina - 1);
                }}
            >
                &lt; Anterior
            </Pager.Item>

        } else statusPrev = "";

        if (this.props.pagina < this.props.lista.totalPages - 1) {
            statusNext = <Pager.Item
                next
                onClick={(e) => {
                    this.props.setPagina(this.props.pagina + 1);
                }}
            >
                Próxima &gt;
            </Pager.Item>

        } else statusNext = "";

        return (
            <Pager>
                {statusPrev}
                {statusNext}
            </Pager>
        );
    }
}

export default PaginationSaveIf;