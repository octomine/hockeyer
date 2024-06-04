import { useDispatch, useSelector } from 'react-redux';

import { setIsPlaying } from '@app/slices';
import { Game } from '../game';
import { OptsButton, TButton, UIHolder, Wrapper } from './AppContainer.styled';
import { IState } from '@app/slices/types';

export const AppContainer = () => {
  const dispatch = useDispatch()
  const isPlaying = useSelector<IState, boolean>((state) => state.game.isPlaying)

  return (
    <Wrapper>
      <div>TEST!!1</div>
      <Game></Game>
      {isPlaying ? (
        <OptsButton
          onClick={() => {
            dispatch(setIsPlaying(false))
          }}
        ></OptsButton>
      ) : (
        <UIHolder>
          <TButton
            onClick={() => {
              dispatch(setIsPlaying(true))
            }}
          >
            играть
          </TButton>
        </UIHolder>
      )}
    </Wrapper>
  );
};
