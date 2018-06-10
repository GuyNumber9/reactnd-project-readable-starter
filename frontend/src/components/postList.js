import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, sortByChange } from '../actions/index';
import { Link } from 'react-router-dom';
import Moment from 'moment';

class PostList extends React.Component {
    constructor() {
        super();

        this.categoryFilter = this.categoryFilter.bind(this);
        this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    }

    componentDidMount() {
        // fetch posts if not yet loaded
        this.props.posts.length || this.props.getPosts();
    }

    categoryFilter(post) {
        if (!this.props.category) {
            return true;
        }
        return post.category === this.props.category;
    }
    
    categoryChangeHandler(event){
        this.props.onSortbyChange(event.target.value);
    }

    render() {
        return (
            <div>
                <h2>Posts</h2>
                <div className="form-group row">
                    <label htmlFor="sortBy" className="col-sm-2 col-form-label">Sort by</label>
                    <div className="col-sm-2">
                        <select id="sortBy" className="form-control" onChange={this.categoryChangeHandler} defaultValue={this.props.sortby}>
                            <option value="posted">Posted</option>
                            <option value="voteScore">Votes</option>
                        </select>
                    </div>
                </div>

                <div className="list-group">
                    {this.props.posts.sort((first, second) => {
                        switch (this.props.sortby) {
                            case 'posted':
                                return first.timestamp > second.timestamp;
                            case 'voteScore':
                                return first.voteScore < second.voteScore;
                            default:
                                return first.timestamp > second.timestamp;
                        }
                    }).filter(this.categoryFilter).map((post) => {
                        return (<Link to={`/${post.category}/${post.id}`} key={post.id}
                            className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{post.title}</h5>
                                <small>{Moment(post.timestamp).fromNow()}</small>
                            </div>
                            <p className="mb-1">
                                by {post.author}
                            </p>
                            <div className="d-flex justify-content-between">
                                <small>
                                    {post.voteScore} {post.voteScore >= 0 ? <i className="far fa-thumbs-up"></i> : <i className="far fa-thumbs-down"></i>}
                                </small>
                                <small>
                                    {post.commentCount} <i className="far fa-comment-alt"></i>
                                </small>
                            </div>
                        </Link>);
                    })}
                    {(this.props.posts.filter(this.categoryFilter)).length !== 0 ? '' : (<div
                            className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">No posts</h5>
                            </div>
                        </div>)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        sortby: state.sortby
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: (category) => dispatch(fetchPosts(category)),
        onSortbyChange: (sortby) => dispatch(sortByChange(sortby))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);