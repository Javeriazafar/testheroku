import itemActionTypes from './item.types';

const INITIAL_STATE = {
  set:false,
  req_idd:'',
  flag:false
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case itemActionTypes.TOGGLE_ITEM_HIDDEN:
      return {
        ...state,
       
        req_idd:action.payload,
        
      };
      case itemActionTypes.TOGGLE_FLAG:
      return {
        ...state,
        
        flag:!state.flag
      };
    
    default:
      return state;
  }
};

export default itemReducer;