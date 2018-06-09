import React from 'react';
import * as Actions  from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CategoryList extends React.Component {
    componentDidMount(){
        this.props.fetchCategories();
    }

    render(){
        return <ul>{ this.props.categories.map(category => <Link key={category.path} to={`/category/${category.path}`}><li>{category.name}</li></Link>) }</ul>;
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
})(CategoryList);