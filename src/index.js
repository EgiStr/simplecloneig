    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import registerServiceWorker from './registerServiceWorker';
    import store from './store/store'
    import { Provider } from 'react-redux'
    
    import 'materialize-css/dist/css/materialize.min.css';
    
    ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById('root')
    );
    registerServiceWorker();
