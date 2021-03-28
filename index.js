const redux = require ('redux')
const combineReducers = redux.combineReducers
const {logger} = require('redux-logger')
const applyMiddleware = redux.applyMiddleware




// action constant
const BUY_CAKE = 'BUY_CAKE';
// action creator function
buyCake = () => {
  return {
    type: BUY_CAKE,
    info: 'first redux action'
  }
}
const BUY_ICECREAM = 'BUY_ICECREAM';

buyIceCream = () => {
  return {
    type: BUY_ICECREAM
  }
}

// reducer
// (previousState, action) => newState

// initial state when using one reducer for both icecreams and cakes
// const initialState = {
//   numberOfCakes: 10,
//   numberOfIceCreams: 20
// }
const initialCakeState = {
    numberOfCakes : 10,
}
const initialIceCreamState = {
    numberOfIceCreams : 20,
}

// define reducer function

// old reducer that handled both cake and icecreams:
//   const reducer = (state = initialState, action) => {
//     switch(action.type) {
//       case BUY_CAKE:
//         return {
//           ...state,
//           numberOfCakes: state.numberOfCakes -1
//         }
//       case BUY_ICECREAM:
//         return {
//           ...state, 
//           numberOfIceCreams: state.numberOfIceCreams -1
//         }
//       default: return state
//     }
//   }
const cakeReducer = (state = initialCakeState, action) => {
  switch(action.type) {
    case BUY_CAKE:
      return {
        ... state,
        numberOfCakes: state.numberOfCakes - 1
      }
    default: return state;
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams -1
      }
      default: return state
  }  
}

// combine reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer
})

const store = redux.createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state:', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()
