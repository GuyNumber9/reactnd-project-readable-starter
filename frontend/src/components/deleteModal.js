import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid';

class DeleteModalComponent extends React.Component {
    constructor(){
        super();
        let id = uuidv1();

        this.state = {
            id
        }

        this.deleteClick = this.deleteClick.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        
    }

    deleteClick(){
        window.$(`#modal-${this.state.id}`).modal({
            show: true
        });
    }

    confirmDelete(){
        this.props.onDelete();
    }


    render(){
        return (
            <div>
            <div id={`modal-${this.state.id}`} className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={this.confirmDelete}>Delete</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-danger" type="button" onClick={this.deleteClick}>Delete</button>
            </div>
        )
    }
}

DeleteModalComponent.propTypes = {
    message: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default DeleteModalComponent;