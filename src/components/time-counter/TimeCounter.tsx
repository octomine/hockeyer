import { ILevel, IState } from '@app/slices/types';
import { useSelector } from 'react-redux';

const TimeCounter = () => {
  const { time } = useSelector<IState, ILevel>((state) => state.level);
  return <div>{time}</div>;
};

export default TimeCounter;
