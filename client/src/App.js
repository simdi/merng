import {
  ApolloClient, ApolloProvider, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import MenuBar from './components/MenuBar';
import Register from './components/Register';
import { AuthProvider } from './context/auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div className="ui container">
            <MenuBar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="login" element={<Login />} />
              <Route exact path="register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
