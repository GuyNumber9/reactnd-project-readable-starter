import React from 'react';
import { connect } from 'react-redux';
import Post from '../components/post';
import Comments from '../components/comments';
import * as Actions from '../actions/index';
import { vote, fetchPost } from '../actions/index';

class PostView extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: []
        };
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
    }

    upVote(){
        this.props.vote(this.props.post.id, 'upVote');
    }

    downVote(){
        this.props.vote(this.props.post.id, 'downVote');
    }

    componentWillMount(){
        this._mounted = false;
    }

    componentDidUpdate(){
        this._mounted = true;
        this.setBreadcrumbs();
    }

    componentDidMount() {
        this.setBreadcrumbs();
        if (this.props.match.params.id) {
            this.props.fetchPost(this.props.match.params.id);
        }
    }
    
    setBreadcrumbs(){
        let breadcrumbs = [{
            label: 'Home',
            link: '/'
        }];
        if(this.props.post.category){
            breadcrumbs.push({
                label: this.props.post.category,
                link: `/${this.props.post.category}`
            })
        }
        breadcrumbs.push({
            label: this.props.post.title || 'View post',
        });
        this.props.setBreadcrumbs(breadcrumbs);
    }

    render() {
        return <div>
            <div className="mb-4">
                <Post upVote={this.upVote} downVote={this.downVote} post={this.props.post} />
            </div>
            {this._mounted & <Comments parentId={this.props.match.params.id} />}
        </div>;
    }
}

function mapStateToProps(state){
    return {
        post: state.currentPost
    }
}

function mapDispatchToProps(dispatch){
    return {
        setBreadcrumbs: (breadcrumbs) => dispatch(Actions.setBreadcrumbs(breadcrumbs)),
        fetchPost: (id) => dispatch(fetchPost(id)),
        vote: (id, type) => {
            return dispatch(vote(id, type));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);