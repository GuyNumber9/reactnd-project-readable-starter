import React from 'react';
import { connect } from 'react-redux';
import { setBreadcrumbs } from '../actions/index';

class Error404 extends React.Component {

    componentDidMount(){
        this.setBreadcrumbs();
    }

    setBreadcrumbs(){
        let breadcrumbs = [{
            label: 'Home',
            link: '/'
        },
        {
            label: 'Error 404'
        }];

        this.props.setBreadcrumbs(breadcrumbs);
    }

    render(){
        return <div className="panel panel-default">

        <h1>Error 404: Page not found</h1>

        </div>
    }
}

function mapDispatchToProps(dispatch){
    return {
        setBreadcrumbs: (breadcrumbs) => {
            dispatch(setBreadcrumbs(breadcrumbs));
        }
    }
}

export default connect(null, mapDispatchToProps)(Error404);