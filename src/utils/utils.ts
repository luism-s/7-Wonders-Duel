
import { v4 as uuidv4 } from 'uuid';
import { ELEMENT_MARGIN, BOARD_WIDTH } from '../contants';
import { GameElement, ElementTypes, Coordinates } from '../types';

export const getRowOfCards = (howMany: number, cardWidth: number): Array<Coordinates> => {
  const filling: Coordinates = {
    x: (cardWidth + ELEMENT_MARGIN),
    y: 0
  };

  return new Array(howMany)
    .fill(filling)
    .map((pos, index) => ({ ...pos, x: pos.x * index}));
};

export const reverse = <T>(array: Array<T>) => [ ...array ].reverse();

export const moveElementBackward = <T>(array: Array<T>, elMatchersPredicate:(el: T) => boolean) =>
  array.reduce((acc, curr, index) => index > 0 && elMatchersPredicate(curr) ? swap(acc, index, index - 1) : acc, array);

export const centerRow = (row: Array<Coordinates>, cardsQuantity: number, cardWidth: number) =>
  row.map((position) => ({
    ...position,
    x: position.x - (cardsQuantity * cardWidth + (cardsQuantity - 1) * ELEMENT_MARGIN) / 2
  }));

export const movePositions = (positions: Array<Coordinates>, { x = 0, y = 0 }: Partial<Coordinates>): Array<Coordinates> => 
  positions.map((position) => ({
    x: position.x + x,
    y: position.y + y
  }));

export const centerHorizontally = (positions: Array<Coordinates>) => movePositions(positions, { x: BOARD_WIDTH / 2 });

export const injectPositions = <T>(elements: Array<T>, positions: Array<Coordinates>): Array<T> =>
  elements.reduce((acc, curr, index) => {
    if (index < positions.length) {
      const { x, y } = positions[index];

      return [ ...acc, { ...curr, x, y } ];
    }

    return acc;
  }, []);

export const shuffleArray = <T>(array: Array<T>) => [ ...array ].sort(() => Math.random() - 0.5);

export const swap = <T>(array: Array<T>, i: number, j: number): Array<T> => {
  const _array = [ ...array ];

  [ _array[i], _array[j] ] = [ _array[j], _array[i] ];

  return _array;
};

export const getRandomElements = <T>(array: Array<T>, howMany?: number) => {
  const shuffledElements = shuffleArray<T>(array);
  const limit = howMany && howMany < shuffledElements.length ? howMany : shuffledElements.length;

  return shuffledElements.slice(0, limit);
};

export const flipCards = (cards: Array<GameElement>) => cards.map((card) => ({ ...card, faceDown: true }));

export const keyBy = <ArrayT>(array: Array<ArrayT>, key: string) => 
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

export const flattenDeep = <T>(array): Array<T> => Array.isArray(array)
  ? array.reduce((acc: Array<any>, curr) => acc.concat(flattenDeep(curr)) , [])
  : [ array ]

export const createElement = (type: ElementTypes) => ({
  type,
  id: uuidv4(),
  x: 0,
  y: 0,
  faceDown: false,
  imageFile: '',
  imageFileBackface: ''
});

const getElementRealSize = (elementType: ElementTypes) => {
  switch (elementType) {
    case ElementTypes.WONDER_CARD:
      return {
        width: 100,
        height: 66
      }

    case ElementTypes.BUILDING_CARD:
      return {
        width: 44,
        height: 68
      }
    
    case ElementTypes.MILITARY_TOKEN_5:
      return {
        width: 45,
        height: 20
      }
  
    case ElementTypes.MILITARY_TOKEN_2:
      return {
        width: 38,
        height: 17
      }
    
    case ElementTypes.PROGRESS_TOKEN:
      return {
        width: 35,
        height: 35
      }
    
    case ElementTypes.CONFLICT_PAWN:
      return {
        width: 14,
        height: 45
      }
    case ElementTypes.COIN_1:
      return {
        width: 20,
        height: 20
      }
    
    case ElementTypes.COIN_3:
      return {
        width: 25,
        height: 25
      }
    
    case ElementTypes.COIN_6:
      return {
        width: 30,
        height: 30
      }
    
    case ElementTypes.BOARD:
      return {
        width: 390,
        height: 110
      }
    default:
      return {
        width: 0,
        height: 0
      }
  }
};

export const getElementScale = (elementType: ElementTypes) => {
  switch (elementType) {
    case ElementTypes.BUILDING_CARD:
    case ElementTypes.WONDER_CARD:
      return 2.25;
    case ElementTypes.COIN_1:
    case ElementTypes.COIN_3:
    case ElementTypes.COIN_6:
      return 2.5;
    case ElementTypes.CONFLICT_PAWN:
    case ElementTypes.MILITARY_TOKEN_5:
    case ElementTypes.MILITARY_TOKEN_2:
    case ElementTypes.PROGRESS_TOKEN:
    case ElementTypes.BOARD:
      return 1.75;
    default:
      return 1;
  }
};

export const getElementSize = (elementType: ElementTypes) => {
  const { width, height } = getElementRealSize(elementType);
  const scale = getElementScale(elementType);

  return {
    width: width * scale,
    height: height * scale
  };
};

export const getElementStyles = (elementType: ElementTypes): React.CSSProperties => {
  const { width, height } = getElementSize(elementType);
  
  switch (elementType) {
    case ElementTypes.WONDER_CARD:
      return {
        width: `${ width }px`,
        height: `${ height }px`
      }

    case ElementTypes.BUILDING_CARD:
      return {
        width: `${ width }px`,
        height: `${ height }px`
      }
    
    case ElementTypes.MILITARY_TOKEN_5:
      return {
        width: `${ width }px`,
        height: `${ height }px`
      }

    case ElementTypes.MILITARY_TOKEN_2:
      return {
        width: `${ width }px`,
        height: `${ height }px`
      }
    
    case ElementTypes.PROGRESS_TOKEN:
      return {
        width: `${ width }px`,
        height: `${ height }px`,
        borderRadius: '50%'
      }
    
    case ElementTypes.CONFLICT_PAWN:
      return {
        width: `${ width }px`,
        height: `${ height }px`,
        borderRadius: 'initial',
        boxShadow: 'initial'
      }
    case ElementTypes.COIN_1:
      return {
        width: `${ width }px`,
        height: `${ height }px`,
        borderRadius: '50%'
      }
    
    case ElementTypes.COIN_3:
      return {
        width: `${ width }px`,
        height: `${ height }px`,
        borderRadius: '50%'
      }
    
    case ElementTypes.COIN_6:
      return {
        width: `${ width }px`,
        height: `${ height }px`,
        borderRadius: '50%'
      }
    
    case ElementTypes.BOARD:
      return {
        width: `${ width }px`,
        height: `${ height }px`
      }
    default:
      return {
        width: `${ width }px`,
        height: `${ height }px`
      }
  }
};
