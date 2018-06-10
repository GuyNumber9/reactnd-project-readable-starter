import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import uuidv1 from 'uuid';


class PostFormComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            "title": "",
            "category": "react",
            "body": ""
        };
        this.onPostRequestPass = this.onPostRequestPass.bind(this);
        this.onPostRequestFail = this.onPostRequestFail.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleFormResponse = this.handleFormResponse.bind(this);
    }

    onSubmit(event){
        event.preventDefault();

        let postID = this.state.id || uuidv1();
        if(!this.state.id){
            this.setState({
                id: postID
            });
        }

        var body = {
            "id": postID,
            "title": this.state.title,
            "category": this.state.category,
            "body": this.state.body,
            "author": this.state.author || 'anonymous',
            "timestamp": this.state.timestamp || Date.now()
        }

        if(this.state.id){
            fetch(`http://localhost:3001/posts/${this.state.id}`, {
                headers: { 
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(body)
            }).then(this.handleFormResponse);
        }
        else {
            fetch('http://localhost:3001/posts', {
                headers: { 
                    'Authorization': 'whatever-you-want',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body)
            }).then(this.handleFormResponse);
        }
    }

    handleFormResponse(){
        this.props.getPosts();
        this.props.history.push(`/${this.state.category}/${this.state.id}`);
    }

    onPostRequestPass(data){
        this.setState({
            id: data.id,
            title: data.title,
            body: data.body,
            timestamp: data.timestamp,
            author: data.author
        });
    }

    onPostRequestFail(data){
        console.log('onPostRequestFail()');
        console.log(data);
    }

    componentDidMount(){
        if(this.props.postId){
            fetch(`http://localhost:3001/posts/${this.props.postId}`, {
                headers: {
                    'Authorization': 'whatever-you-want'
                }
            }).then((resp) => {
                if(resp.status === 200){
                    return resp.json();
                }
                return resp;
            }).then(this.onPostRequestPass).catch(this.onPostRequestFail);
        }
    }

    onTitleChange(event){
        this.setState({
            "title": event.target.value
        });
    }

    onCategoryChange(event){
        this.setState({
            "category": event.target.value
        });
    }

    onBodyChange(event){
        this.setState({
            "body": event.target.value
        });
    }

    render(){
        return (<form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label htmlFor="postTitle">Title</label>
                <input id="postTitle" className="form-control" name="title" type="text" value={this.state.title} onChange={this.onTitleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="postCategory">Category</label>
                <select id="postCategory" className="form-control" name="category" value={this.state.category} onChange={this.onCategoryChange}>
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="postBody">Body</label>
                <textarea id="postBody" className="form-control" name="body" value={this.state.body} onChange={this.onBodyChange} />
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
            </form>);
    }
}

function mapDispatchToProps(dispatch){
    return {
        getPosts: () => dispatch(fetchPosts())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PostFormComponent));