import { combineReducers } from 'redux';
import { GameElement } from '../types';
import elements from './elements-reducer';
import selectedElements from './selected-elements-reducer';

export interface AppState {
  elements: Array<GameElement>;
  selectedElements: Array<string>;
}

export default combineReducers<AppState>({
  elements,
  selectedElements
});
