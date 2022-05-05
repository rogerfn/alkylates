
import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';


let store = configureStore({
    
    reducer: {
        auth
        
    }
}
);

export default store;
