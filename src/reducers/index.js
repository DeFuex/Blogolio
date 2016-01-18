// export {default as helloworld } from './helloworld.js';
import { combineReducers } from 'redux'
import counter from './counter'

const rootReducer = combineReducers({
  counter
})

export default rootReducer