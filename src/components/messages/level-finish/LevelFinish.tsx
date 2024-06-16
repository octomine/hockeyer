import { levelUp, showMessage } from '@app/slices';
import { ILevel, IState, UIMessage } from '@app/slices/types';
import { Label } from '@app/ui';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Wrapper } from './LevelFinish.styled';

const LevelFinish = () => {
  const dispatch = useDispatch();
  const { level, time } = useSelector<IState, ILevel>((state) => state.level);

  return (
    <Wrapper>
      <Label additional size="s">{`уровень ${level} завершён`}</Label>
      <Label size="l">{`время: ${time}`}</Label>
      <Button
        onClick={() => {
          dispatch(levelUp());
          dispatch(showMessage(UIMessage.LevelUp));
        }}
      >
        дальше
      </Button>
    </Wrapper>
  );
};

export default LevelFinish;
