import { Button } from '@app/ui';
import { Wrapper } from './Menu.styled';
import { TMenuItemProps } from './Menu.types';
import { useDispatch } from 'react-redux';
import { showMessage } from '@app/slices';
import { UIMessage } from '@app/slices/types';

const Menu = () => {
  const dispatch = useDispatch();

  const menu: TMenuItemProps[] = [
    {
      label: 'играть',
      callback: () => {
        dispatch(showMessage(UIMessage.LevelUp));
      },
    },
    { label: 'учить', callback: () => {}, disabled: false, additional: true },
    { label: 'смотреть', callback: () => {}, disabled: true, additional: true },
  ];

  return (
    <Wrapper>
      {menu.map(
        ({ label, callback, disabled = false, additional = false }, i) => (
          <Button
            key={`${label}_${i}`}
            disabled={disabled}
            additional={additional}
            onClick={callback}
          >
            {label}
          </Button>
        ),
      )}
    </Wrapper>
  );
};

export default Menu;
