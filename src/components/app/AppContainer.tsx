import { useState } from 'react';
import { OptsButton, TButton, UIHolder, Wrapper } from './AppContainer.styled';
import { Game } from '../game';

export const AppContainer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Wrapper>
      <div>TEST!!1</div>
      <Game></Game>
      {isPlaying ? (
        <OptsButton
          onClick={() => {
            setIsPlaying(false);
          }}
        ></OptsButton>
      ) : (
        <UIHolder>
          <TButton
            onClick={() => {
              setIsPlaying(true);
            }}
          >
            играть
          </TButton>
        </UIHolder>
      )}
    </Wrapper>
  );
};
