import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsPlaying, showMessage } from '@app/slices';
import { IState, UIMessage } from '@app/slices/types';
import { Game } from '../game';
import { Messages } from '../messages';
import { TimeCounter } from '../time-counter';

import { OptsButton, UIHolder, Wrapper } from './AppContainer.styled';

export const AppContainer = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector<IState, boolean>(
    (state) => state.game.isPlaying,
  );

  useEffect(() => {
    dispatch(showMessage(UIMessage.Menu));
  }, []);

  return (
    <Wrapper>
      <TimeCounter></TimeCounter>
      <Game></Game>
      {isPlaying ? (
        <OptsButton
          onClick={() => {
            dispatch(setIsPlaying(false));
            dispatch(showMessage(UIMessage.Menu));
          }}
        >
          A
        </OptsButton>
      ) : (
        <UIHolder>
          <Messages></Messages>
        </UIHolder>
      )}
    </Wrapper>
  );
};
