import { ILevel, IState } from '@app/slices/types';
import { Label } from '@app/ui';
import { useSelector } from 'react-redux';

const TimeCounter = () => {
  const { time } = useSelector<IState, ILevel>((state) => state.level);
  return <Label additional>{time}</Label>;
};

export default TimeCounter;
