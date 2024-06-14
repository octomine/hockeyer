import { IState, UIMessage } from '@app/slices/types';
import { useSelector } from 'react-redux';
import { LevelFinish } from './level-finish';
import { LevelUp } from './level-up';
import { Wrapper } from './Messages.styled';
import { Menu } from './menu';

const Messages = () => {
  const message = useSelector<IState, UIMessage>((state) => state.UI.message);

  const msg = () => {
    switch (message) {
      case UIMessage.LevelFinish:
        return <LevelFinish></LevelFinish>;
      case UIMessage.LevelUp:
        return <LevelUp></LevelUp>;
      case UIMessage.Menu:
        return <Menu></Menu>;
      case UIMessage.None:
      default:
        return null;
    }
  };

  return <Wrapper>{msg()}</Wrapper>;
};

export default Messages;
