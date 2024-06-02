import { useState } from 'react';
import { OptsButton, TButton, UIHolder, Wrapper } from './AppContainer.styled';

export const AppContainer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Wrapper>
      <div>TEST!!1</div>
      <div id="game"></div>
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
            click
          </TButton>
        </UIHolder>
      )}
    </Wrapper>
  );
};
