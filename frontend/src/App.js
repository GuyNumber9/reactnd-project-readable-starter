import React from 'react';
import { connect } from 'react-redux';
import PostList from './components/postList';
import { setBreadcrumbs } from './actions/index';



class App extends React.Component {
  componentWillMount(){
    this.props.setBreadcrumbs([{label: "Home"}]);
  }
  render() {
    return (
        <div className="App">
          <PostList />
        </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    setBreadcrumbs: (breadcrumbs) => dispatch(setBreadcrumbs(breadcrumbs))
  }
}

export default connect(null, mapDispatchToProps)(App);
