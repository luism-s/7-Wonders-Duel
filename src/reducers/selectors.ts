import { AppState } from './reducers';
import { ElementTypes, GameElement } from '../types';

export const getElements = (state: AppState, type?: ElementTypes) =>
  type ? state.elements.filter((el) => el.type === type) : state.elements;

export const getElementOfType = (state: AppState, type: ElementTypes) => {
  const elements = getElements(state, type);

  return elements.length > 0 ? elements[0] : null;
};

export const getElement = (state: AppState, id: string) =>
  state.elements.filter((el) => el.id === id);

export const getSelectedElements = (state: AppState) => 
  state.selectedElements.reduce((selectedElements: Array<GameElement>, id: string) => {
    const elIndex = state.elements.findIndex((el) => el.id === id);

    return elIndex !== -1 ? [ ...selectedElements, state.elements[elIndex]] : selectedElements;
  }, []);

export const getSelectedElementsIds = (state: AppState) => state.selectedElements;
