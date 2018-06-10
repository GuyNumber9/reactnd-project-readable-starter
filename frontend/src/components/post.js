import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPosts } from '../actions/index';
import Voter from './voter';
import Moment from 'moment';
import uuidv1 from 'uuid';

class PostComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            modalId: uuidv1()
        }

        this.deletePost = this.deletePost.bind(this);
        this.confirmDeletePost = this.confirmDeletePost.bind(this);
        this.editPost = this.editPost.bind(this);
    }

    deletePost() {
        window.$(`#modal-${this.state.modalId}`).modal('show');
    }

    confirmDeletePost() {
        fetch(`http://localhost:3001/posts/${this.props.post.id}`,
            {
                method: 'DELETE',
                headers: {
                    "Authorization": "whatever-you-want"
                }
            }).then(() => {
                this.props.getPosts();
                window.$(`#modal-${this.state.modalId}`).modal('hide');
                this.props.history.push('/');
            })
    }

    editPost() {
        this.props.history.push(`/form/${this.props.post.id}`);
    }

    componentDidMount() {
        this.props.history.push('/error404');
    }

    render() {
        return (<div>
            <div className="card">
                <div className="card-header">
                    <span className="h5">{this.props.post.title}</span> <small className="text-muted">by {this.props.post.author}</small>
                </div>
                <div className="card-body">
                    {this.props.post.body}
                </div>
                <div className="card-footer justify-content-between">
                    <small>{Moment(this.props.post.timestamp).format('MMM Do YYYY')}</small>
                    <div className="float-right">
                        <Voter className="post-voter" id={this.props.post.id} voteCount={this.props.post.voteScore} upVote={this.props.upVote} downVote={this.props.downVote} />
                        <div className="btn-group">
                            <button className="btn btn-secondary" type="button" onClick={this.editPost}>Edit</button>
                            <button className="btn btn-danger" type="button" onClick={this.deletePost}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id={`modal-${this.state.modalId}`} className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure that you want to delete this post?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={this.confirmDeletePost}>Delete</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        getPosts: () => dispatch(fetchPosts())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PostComponent));