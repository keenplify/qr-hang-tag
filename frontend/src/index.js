import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import Cookies from 'universal-cookie';
import { Modal, Button } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from './components/NavigationComponent';
import Home from './components/HomeComponent';
import HomeMember from './components/HomeMemberComponent';
import HomeAdmin from './components/HomeAdminComponent';
import Register from './components/AccountRegisterComponent';
import HangtagsViewerAdminComponent from './components/HangtagsViewerAdminComponent';
import HangtagsViewerAdmicCreateBatchComponent from './components/HangtagsViewerAdmicCreateBatchComponent';
import HangtagScannerComponent from './components/HangtagScannerComponent';
import HangtagViewer from './components/HangtagViewerComponent';
import BatchPrinter from './components/BatchPrinterComponent';

if(window.matchMedia('(prefers-color-scheme: dark)').matches) localStorage.setItem('colorScheme', 'dark');
else localStorage.setItem('colorScheme', 'light')

const cookies = new Cookies()
ReactDOM.render(
  <React.StrictMode>
    {
      localStorage.getItem('err') &&
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Something went wrong.</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
          <p>{localStorage.getItem('err')}</p>
        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            localStorage.removeItem('err')
            document.location = '/'
          }} >Close</Button>
        </Modal.Footer>
      </Modal>
    }
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          {
            !cookies.get('type') && <Home />
          }
          {
            cookies.get('type') === 'member' && <HomeMember />
          }
          {
            cookies.get('type') === 'admin' && <HomeAdmin /> 
          }
        </Route>
        <Route exact path="/hangtags/createbatch">
          {
            cookies.get('type') === 'admin' && <HangtagsViewerAdmicCreateBatchComponent close={()=> {document.location="/hangtags"}}/>
          }
        </Route>
        <Route exact path="/scanner" component={HangtagScannerComponent}/>
        <Route exact path="/register"><Register /></Route>
        <Route exact path="/hangtags">
          {
            !cookies.get('type') && <Home />
          }
          {
            cookies.get('type') === 'admin' && <HangtagsViewerAdminComponent /> 
          }
        </Route>
        <Route exact path="/batchprint/:batchId" component={BatchPrinter}/>
        <Route exact path="/qr/:hangtagId" component={HangtagViewer}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
