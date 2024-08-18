import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import ArticleDetail from './components/ArticleDetail';

function App() {
    return (
        <div className="App">
          <Routes>
            <Route exact path="/" component={Homepage} />
            <Route path="/article/:articleUrl" component={ArticleDetail} />
          </Routes>
        </div>
      );
    }
    
    export default App;
    