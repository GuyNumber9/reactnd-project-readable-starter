import React from 'react';
import { connect } from 'react-redux';
import PostForm from '../components/postForm';
import * as Actions from '../actions/index';

class FormView extends React.Component {

    componentWillMount(){
        this.setBreadcrumbs();
    }

    componentDidUpdate(){
        this.setBreadcrumbs();
    }

    setBreadcrumbs(){
        this.props.setBreadcrumbs([
            {
                label: 'Home',
                link: '/'
            },
            {
                label: this.props.match.params.id ? 'Edit post' : 'Create post'
            }
        ]);
    }

    render(){
        return (
            <div>
                <h3>Post form</h3>
                <PostForm postId={this.props.match.params.id} />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        setBreadcrumbs: function(breadcrumbs){
            dispatch(Actions.setBreadcrumbs(breadcrumbs));
        }
    }
}

export default connect(null, mapDispatchToProps)(FormView);