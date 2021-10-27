import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import PwApiService from './services/pw-api-service/pw-api-service';

const pwApi = new PwApiService();

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(pwApi)));
store.subscribe(()=>{
    console.log('getState',store.getState());
})

export default store;
