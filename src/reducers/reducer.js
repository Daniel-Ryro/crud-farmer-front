// reducers.js
const initialState = {
  producers: [],
};

const producerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCERS':
      return {
        ...state,
        producers: action.payload,
      };
    default:
      return state;
  }
};

export default producerReducer;
