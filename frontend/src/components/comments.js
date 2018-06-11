import React from 'react';
import { connect } from 'react-redux';
import CommentForm from './commentForm';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Voter from './voter';
import { vote, fetchPosts } from '../actions/index';
import uuidv1 from 'uuid';

class CommentsComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            sortby: "posted",
            comments: [],
            modalId: uuidv1(),
            editComment: {
                id: '',
                body: ''
            },
            deleteComment: ''
        };
        this._mounted = false;
        this.onSortbyChange = this.onSortbyChange.bind(this);
        this.sortMethod = this.sortMethod.bind(this);
        this.getCommentsResponse = this.getCommentsResponse.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.voteCallback = this.voteCallback.bind(this);
        this.confirmEdit = this.confirmEdit.bind(this);
        this.handleEditCommentChange = this.handleEditCommentChange.bind(this);
        this.confirmDeleteComment = this.confirmDeleteComment.bind(this);
    }

    deleteMaker(comment, modalId){
        return () => {
            window.$(`#comment-delete-modal-${modalId}`).modal({
                show: true
            });

            this.setState({
                deleteComment: comment.id
            })
        }
    }

    editMaker(comment, modalId) {
        return () => {

            window.$(`#comment-edit-modal-${modalId}`).modal({
                show: true
            });

            this.setState({
                editComment: {
                    id: comment.id,
                    body: comment.body
                }
            })
        }
    }

    confirmEdit() {
        let body = JSON.stringify({
            body: this.state.editComment.body,
            timestamp: Date.now()
        })
        fetch(`http://localhost:3001/comments/${this.state.editComment.id}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                body
            }).then(() => {
                window.$(`#comment-edit-modal-${this.state.modalId}`).modal('hide');
                this.fetchComments();
            })

    }

    handleEditCommentChange(e) {
        this.setState({
            editComment: {
                body: e.target.value,
                id: this.state.editComment.id
            }
        });
    }

    confirmDeleteComment() {
            fetch(`http://localhost:3001/comments/${this.state.deleteComment}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "whatever-you-want"
                }
            }).then(() => {
                window.$(`#comment-delete-modal-${this.state.modalId}`).modal('hide');
                this.fetchComments();
                this.props.getPosts();
            });
    }

    upVote(id) {
        this.props.vote(id, 'upVote', this.voteCallback);
    }

    downVote(id) {
        this.props.vote(id, 'downVote', this.voteCallback);
    }

    voteCallback() {
        this.fetchComments();
    }

    onSortbyChange(event) {
        this.setState({
            sortby: event.target.value
        });
    }

    sortMethod(first, second) {
        switch (this.state.sortby) {
            case "posted":
                return first.timestamp > second.timestamp;
            case "score":
                return first.voteScore < second.voteScore;
            default:
                return first.timestamp > second.timestamp;
        }
    }

    getCommentsResponse(data) {
        if (data.error) {
            console.error('Error',data);
        }
        else if(this._mounted){
            this.setState({
                ...this.state,
                comments: data
            });
        }
    }
    
    handleAddComment(comment) {
        this.setState({
            ...this.state,
            comments: [...this.state.comments, comment]
        })
    }

    componentWillMount(){
        this._mounted = false;
    }

    componentDidMount() {
        this._mounted = true;
        this.fetchComments();
    }

    componentWillUnmount(){
        this._mounted = false;
    }

    fetchComments() {
        fetch(`http://localhost:3001/posts/${this.props.parentId}/comments`, {
            headers: {
                'Authorization': 'whatever-you-want'
            }

        }).then((resp) => {
            return resp.json();
        }).then(this.getCommentsResponse);
    }

    render() {
        return <div>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="d-flex w-100 mb-1 justify-content-between">
                        <div className="input-group">Comments</div>
                        <div className="input-group col-sm-4">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="comment-sortby">Sort</label>
                            </div>
                            <select id="comment-sortby" className="custom-select" onChange={this.onSortbyChange} defaultValue={this.state.sortby}>
                                <option value="posted">Posted</option>
                                <option value="score">Score</option>
                            </select>
                        </div>
                    </div>
                </div>
                {this.state.comments.sort(this.sortMethod).map(comment => {
                    return (
                    <div key={comment.id} className="list-group-item flex-column align-items-start">
                        <div className="d-flex w-100 mb-1">
                            {comment.body}
                        </div>
                        <div className="d-flex w-100 justify-content-between text-muted">
                            <small>by {comment.author} on the {Moment(comment.timestamp).format('Do [of] MMM YYYY')}</small>
                            <small><Voter voteCount={comment.voteScore} className="comment-voter" downVote={() => this.downVote(comment.id)} upVote={() => this.upVote(comment.id)} /></small>
                        </div>
                        <div className="btn-group btn-group-sm">
                        <button className="btn btn-secondary" type="button" onClick={this.editMaker(comment, this.state.modalId)}>Edit</button>
                        <button className="btn btn-danger" type="button" onClick={this.deleteMaker(comment, this.state.modalId)}>Delete</button>
                        </div>
                    </div>);
                }
                )}
                {this.state.comments.length !== 0 ? '' : (<div
                            className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h6>No comments</h6>
                            </div>
                        </div>)}

                <div className="list-group-item flex-column align-items-start">
                    <CommentForm parentId={this.props.parentId} addComment={this.handleAddComment} />
                </div>
            </div>
            <div id={`comment-edit-modal-${this.state.modalId}`} className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="form-group p-2">
                        <label htmlFor={`comment-edit-modal-text-${this.state.modalId}`}>Edit comment</label>
                        <textarea id={`comment-edit-modal-text-${this.state.modalId}`} className="form-control"  value={this.state.editComment.body} onChange={this.handleEditCommentChange}>
                        </textarea>
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.confirmEdit}>Confirm</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id={`comment-delete-modal-${this.state.modalId}`} className="modal" tabIndex="-1" role="dialog">
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
                            <button type="button" className="btn btn-danger" onClick={this.confirmDeleteComment}>Delete</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

CommentsComponent.propTypes = {
    parentId: PropTypes.string.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        vote: (id, type, callback) => {
            return dispatch(vote(id, type, 'comment', callback));
        },
        getPosts: () => dispatch(fetchPosts())
    }
}

export default connect(null, mapDispatchToProps)(CommentsComponent);