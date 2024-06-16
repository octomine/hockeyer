import { levelUp, showMessage } from '@app/slices';
import { ILevel, IState, UIMessage } from '@app/slices/types';
import { WrapperV } from '@app/style';
import { Button } from '@app/ui';
import { useDispatch, useSelector } from 'react-redux';

const LevelFinish = () => {
  const dispatch = useDispatch();
  const { level, time } = useSelector<IState, ILevel>((state) => state.level);

  return (
    <WrapperV>
      <div>{`уровень ${level} завершён`}</div>
      <div>{`время: ${time}`}</div>
      <Button
        onClick={() => {
          dispatch(levelUp());
          dispatch(showMessage(UIMessage.LevelUp));
        }}
      >
        дальше
      </Button>
    </WrapperV>
  );
};

export default LevelFinish;
