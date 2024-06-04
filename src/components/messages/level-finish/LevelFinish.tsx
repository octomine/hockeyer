import { levelUp, showMessage } from '@app/slices';
import { ILevel, IState, UIMessage } from '@app/slices/types';
import { useDispatch, useSelector } from 'react-redux';

const LevelFinish = () => {
  const dispatch = useDispatch();
  const { level, time } = useSelector<IState, ILevel>((state) => state.level);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>{`уровень ${level} завершён`}</div>
      <div>{`время: ${time}`}</div>
      <div
        style={{ background: 'white', padding: '.5em 2em' }}
        onClick={() => {
          dispatch(levelUp());
          dispatch(showMessage(UIMessage.LevelUp));
        }}
      >
        дальше
      </div>
    </div>
  );
};

export default LevelFinish;
