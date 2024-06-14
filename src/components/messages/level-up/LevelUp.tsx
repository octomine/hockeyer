import { resetTime, setIsPlaying, showMessage } from '@app/slices';
import { IState, UIMessage } from '@app/slices/types';
import { useDispatch, useSelector } from 'react-redux';

const LevelUp = () => {
  const dispatch = useDispatch();
  const level = useSelector<IState, number>((state) => state.level.level);
  // TODO: запилить нормальный countdow или придумать что получше
  setTimeout(() => {
    dispatch(showMessage(UIMessage.None));
    dispatch(resetTime());
    dispatch(setIsPlaying(true));
  }, 3 * 1000);

  return <div>{`уровень: ${level}`}</div>;
};

export default LevelUp;
