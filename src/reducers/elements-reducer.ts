import { SET_ELEMENTS, SET_ELEMENT_POSITION, ADD_ELEMENTS, FLIP_ELEMENT, BRING_ELEMENT } from '../actions/types';
import { ElementsActionType } from '../actions/elements-actions';
import { GameElement } from '../types';
import { reverse, moveElementBackward } from '../utils';

const initialState: Array<GameElement> = [];

export default (state = initialState, action: ElementsActionType) => {
  const _state = [ ...state ];

  switch (action.type) {
    case SET_ELEMENTS:
      return action.payload;
    case ADD_ELEMENTS:
      return [ ...state, ...action.payload ];
    case SET_ELEMENT_POSITION: {
      const { id, position: { x, y } } = action.payload;
      const elIndex = state.findIndex((el) => el.id === id);

      if (elIndex !== -1) {
        _state[elIndex].x = x;
        _state[elIndex].y = y; 
      }

      return _state;
    }
    case FLIP_ELEMENT: {
      const { id } = action.payload;
      const elIndex = state.findIndex((el) => el.id === id);

      if (elIndex !== -1) {
        _state[elIndex].faceDown = !_state[elIndex].faceDown;
      }
      
      return _state;
    }
    case BRING_ELEMENT: {
      const { id, direction } = action.payload;
      const elIndex = state.findIndex((el) => el.id === id);

      if (elIndex !== -1) {
        const sameTypeElements = _state.filter((el) => el.type === _state[elIndex].type);
        const differentTypeElements = _state.filter((el) => el.type !== _state[elIndex].type);
        let shiftedState = [ ..._state ];

        switch (direction) {
          case 'forward':
          case 'backward': {
            const shiftedTypeElements = direction === 'forward' 
              ? reverse(moveElementBackward(reverse(sameTypeElements), (el) => el.id === id))
              : moveElementBackward(sameTypeElements, (el) => el.id === id);

            shiftedState = [
              ...differentTypeElements,
              ...shiftedTypeElements
            ];
            break;
          }
          case 'front':
          case 'back': {
            const differentIdElements = sameTypeElements.filter((el) => el.id !== id);

            const shiftedTypeElements = direction === 'front' 
              ? [ ...differentIdElements, _state[elIndex] ]
              : [ _state[elIndex], ...differentIdElements ];

            shiftedState = [
              ...differentTypeElements,
              ...shiftedTypeElements
            ];
            break;
          }
          default:
            break;
        }
        
        return shiftedState;
      }

      return _state;
    }
    default: {
      return state;
    }
  }
};
