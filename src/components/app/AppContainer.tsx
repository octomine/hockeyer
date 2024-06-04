import { useDispatch, useSelector } from 'react-redux';

import { setIsPlaying, showMessage } from '@app/slices';
import { Game } from '../game';
import { OptsButton, UIHolder, Wrapper } from './AppContainer.styled';
import { IState, UIMessage } from '@app/slices/types';
import { Messages } from '../messages';
import { useEffect } from 'react';

export const AppContainer = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector<IState, boolean>(
    (state) => state.game.isPlaying,
  );

  useEffect(() => {
    dispatch(showMessage(UIMessage.LevelUp));
  }, []);

  return (
    <Wrapper>
      <div>TEST!!1</div>
      <Game></Game>
      {isPlaying ? (
        <OptsButton
          onClick={() => {
            dispatch(setIsPlaying(false));
          }}
        ></OptsButton>
      ) : (
        <UIHolder>
          <Messages></Messages>
        </UIHolder>
      )}
    </Wrapper>
  );
};
