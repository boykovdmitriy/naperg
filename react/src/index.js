import React from 'react'
import ReactDOM from 'react-dom'
import { AUTH_TOKEN } from './constants/constants'
import { ApolloLink } from 'apollo-client-preset'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import FeedPage from './components/post/FeedPage'
import DraftsPage from './components/post/DraftsPage'
import CarsPage from './components/car/CarsPage'
import CreateCar from './components/car/CreateCar'
import CreatePage from './components/post/CreatePage'
import DetailPage from './components/post/DetailPage'
import DetailCar from './components/car/DetailCar'
import UsersPage from './components/user/UsersPage'
import UserPage from './components/user/UserPage'
import Login from './components/user/Login'
import 'tachyons'
import './index.css'
import Header from './components/nav/Header'
import 'font-awesome/css/font-awesome.min.css';
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

// const httpLink = new HttpLink({ uri: 'http://82.223.14.38:4000' })
// const httpLink = new HttpLink({ uri: 'http://159.65.108.215:4000/' })


const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)


const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <React.Fragment>
      <Header />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <div className="fl w-100 pl4 pr4">
          <Switch>
            <Route exact path="/" component={FeedPage} />
            <Route path="/car/create" component={CreateCar} />
            <Route path="/car/:id" component={DetailCar} />
            <Route path="/drafts" component={DraftsPage} />
            <Route path="/cars" component={CarsPage} />
            <Route path="/users" component={UsersPage} />
            <Route path="/user/:id" component={UserPage} />
            <Route path="/create" component={CreatePage} />
            <Route path="/post/:id" component={DetailPage} />
            <Route exact path="/login" component={Login} />

          </Switch>
        </div>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
