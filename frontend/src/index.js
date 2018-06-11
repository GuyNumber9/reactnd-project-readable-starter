import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mainReducer } from './reducers';
import './index.css';
import Navbar from './components/navbar';
import Breadcrumbs from './components/breadcrumbs';
import MainView from './views/mainView';
import PostView from './views/postView';
import CategoryView from './views/categoryView';
import FormView from './views/formView';
import Error404 from './views/error404View';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(mainReducer, applyMiddleware(thunk));

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <div>
            <header>
                <Navbar />
            </header>
            <div className="container">
                <Breadcrumbs />
                <Switch>
                    <Route exact path="/" component={MainView} />
                    <Route exact path="/error404" component={Error404} />
                    <Route path="/form/:id?" component={FormView} />
                    <Route path="/:category/:id" component={PostView} />
                    <Route exact path="/:category/" component={CategoryView} />
                    <Route component={Error404} />
                </Switch>   
            </div>
        </div>
    </Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
