import {
  ApolloClient, ApolloProvider, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import MenuBar from './components/MenuBar';
import Register from './components/Register';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <MenuBar />
        <Routes>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
