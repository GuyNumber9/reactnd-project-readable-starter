import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid';

class CommentFormComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            comment: ""
        }
        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onPostCommentSuccess = this.onPostCommentSuccess.bind(this);
    }
    onSubmitComment(event){
        event.preventDefault();

        let body = {
            id: uuidv1(),
            body: this.state.comment,
            timestamp: Date.now(),
            author: 'anonymous',
            parentId: this.props.parentId
        }

        fetch(`http://localhost:3001/comments`, {
            method: 'POST',
            headers: {
                'Authorization': 'whatever-you-want',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(this.onPostCommentSuccess)

        body.voteScore = 1;
        this.setState({
            body
        })
    }
    onPostCommentSuccess(resp){
        if(this.props.addComment){
            this.props.addComment(this.state.body);
            this.setState({
                comment: ''
            });
            this.props.getPosts();
        }
    }
    onCommentChange(event){
        this.setState({
            comment: event.target.value
        })
    }
    render(){
        return (<form onSubmit={this.onSubmitComment}>
            <div className="form-group">
            <label htmlFor="commentTextarea">Add a comment</label>
            <textarea id="commentTextarea" value={this.state.comment} onChange={this.onCommentChange} className="form-control" />
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
        </form>);
    }
}

CommentFormComponent.propTypes = {
    parentId: PropTypes.string.isRequired,
    addComment: PropTypes.func
}

function mapDispatchToProps(dispatch){
    return {
        getPosts: () => dispatch(fetchPosts())
    }
}

export default connect(null, mapDispatchToProps)(CommentFormComponent);