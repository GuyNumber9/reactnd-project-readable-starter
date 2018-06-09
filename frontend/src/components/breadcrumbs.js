import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class BreadCrumbComponent extends React.Component {
    render(){
        return this.props.breadcrumbs ? (<nav aria-label="breadcrumbs">
            <ol className="breadcrumb">
                {
                    this.props.breadcrumbs.map((breadcrumb, index) => {
                        if(breadcrumb.link){
                            return <li className="breadcrumb-item" key={index}><Link to={breadcrumb.link}><span className="cap-first-letter">{ breadcrumb.label }</span></Link></li>
                        }
                        else {
                            return <li className="breadcrumb-item" key={index}><span className="cap-first-letter">{ breadcrumb.label }</span></li>
                        }
                    })
                }
            </ol>
        </nav>) : (<div></div>);
    }
}

function mapStateToProps(state){
    return {
        breadcrumbs: state.breadcrumbs
    }
}

export default connect(mapStateToProps)(BreadCrumbComponent);