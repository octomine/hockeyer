import { UIHolder, Wrapper } from './AppContainer.styled';

export const AppContainer = () => (
  <Wrapper>
    <div>TEST!!1</div>
    <div id="game"></div>
    <UIHolder>
      <div
        onClick={() => {
          console.log('CLICK!!1');
        }}
      >
        click
      </div>
    </UIHolder>
  </Wrapper>
);
