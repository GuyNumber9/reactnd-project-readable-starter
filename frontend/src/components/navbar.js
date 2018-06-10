import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    componentDidMount() {
        this.props.fetchCategories();
    }
    
    render() {
        return (<nav className="navbar navbar-expand-sm navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Readable</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/form">New Post</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <span id="navbarDropdown" className="nav-link dropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories <span style={{ "fontSize": "0.5em" }}>&#9660;</span>
                        </span>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {
                                this.props.categories.map((category) => {
                                    return <Link className="dropdown-item" key={category.path} to={`/${category.path}`}>{category.name}</Link>;
                                })
                            }
                        </div>
                    </li>
                </ul>
            </div>

        </nav>);
    }
}

export default connect((state) => {
    return {
        categories: state.categories
    }
}, (dispatch) => {
    return {
        fetchCategories: () => dispatch(Actions.fetchCategories())
    }
})(Navbar);