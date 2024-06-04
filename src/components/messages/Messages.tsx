import { IState, UIMessage } from '@app/slices/types';
import { useSelector } from 'react-redux';
import { LevelFinish } from './level-finish';
import { LevelUp } from './level-up';

const Messages = () => {
  const message = useSelector<IState, UIMessage>((state) => state.UI.message);

  switch (message) {
    case UIMessage.LevelFinish:
      return <LevelFinish></LevelFinish>;
    case UIMessage.LevelUp:
      return <LevelUp></LevelUp>;
    case UIMessage.None:
    default:
      return null;
  }
};

export default Messages;
