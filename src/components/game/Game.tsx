import { initGame } from '@app/game';
import { useEffect, useState } from 'react';

const Game = () => {
  const [game, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    setGame(initGame());
  }, []);

  console.log(game);

  return <div id="game"></div>;
};

export default Game;
