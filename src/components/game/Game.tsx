import { initGame } from '@app/game';
import { useEffect, useState } from 'react';

const Game = () => {
  const [, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    setGame(initGame());
  }, []);

  return <div id="game"></div>;
};

export default Game;
