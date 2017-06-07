import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import { syncHistory } from 'react-router-redux'
import { routerMiddleware } from 'react-router-redux'
import { SearchChannel } from './pages'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore)

const configureStore = (initialState) => {
  const configuredStore = createStoreWithMiddleware(rootReducer, initialState)
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      configuredStore.replaceReducer(nextRootReducer)
    })
  }
  return configuredStore
}

const store = configureStore()

class MainLayout extends Component {
  render() {
    return (
      <div className="main">
      <div className="row-fluid">
<h1 id="heading">Channelize</h1>
     <h3><i>Search Channels Across the Globe...</i></h3>
  </div>
        <div className="page">
          {this.props.children}
        </div>
        </div>
    )
  }
}


render(
  <Provider store={store}>
    <Router>
      <Route path='/' component={MainLayout}>
        <Route path='search' component={SearchChannel}/>
        <IndexRedirect to="/search" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
