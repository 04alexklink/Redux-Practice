const redux = require('redux');
const axios = require('axios')
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default;

const createStore = redux.createStore

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


// create the 3 actions
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: {users}
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: {error}
  }
}
// example of an action object without creating the action creator function
// const fetchUsersFailure = {
//   type: FETCH_USERS_FAILURE,
//   payload: {
//     error: request.error
//   }
// }

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state, 
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        error: ''
      }
    case FETCH_USERS_FAILURE:
     return {
       loading: false,
       users: [],
       error: action.payload
     }
    default: return state
  }
}

fetchUsers = () => {
    store.dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      const users = response.data.map(user => user.id)
      store.dispatch(fetchUsersSuccess(users))
    })
    .catch(error => {
      store.dispatch(fetchUsersFailure(error.message))
    })
}

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
fetchUsers()