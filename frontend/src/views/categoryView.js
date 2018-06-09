import React from 'react';
import { connect } from 'react-redux';
import { setBreadcrumbs } from '../actions/index';
import PostList from '../components/postList';

class CategoryView extends React.Component {
    componentWillMount(){
        this.props.setBreadcrumbs([
            {
                label: 'Home',
                link: '/'
            },
            {
                label: this.props.match.params.category
            }
        ]);
    }

    componentDidUpdate(){
        this.props.setBreadcrumbs([
            {
                label: 'Home',
                link: '/'
            },
            {
                label: this.props.match.params.category
            }
        ]);
    }

    render(){
        return (<div>
            <PostList posts={this.props.posts} category={this.props.match.params.category} />
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch){
    return {
        setBreadcrumbs: (breadcrumbs) => dispatch(setBreadcrumbs(breadcrumbs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);