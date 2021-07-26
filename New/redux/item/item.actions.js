import ItemActionTypes from './item.types';

export const toggleCartHidden = (item) => ({
  type: ItemActionTypes.TOGGLE_ITEM_HIDDEN,
  payload:item
});

export const togglefLAG = () => ({
  type: ItemActionTypes.TOGGLE_FLAG,
  
});