import { PlayGame } from '../scenes';
import { Directions, TMoveParams, TSwipeListeners } from './Swipe.types';

const HORIZONTAL = [Directions.Left, Directions.Right];

class Swipe {
  private scene: Phaser.Scene;
  private scrollCoeff: number = 1;

  private listeners!: TSwipeListeners;
  private downPoint = new Phaser.Math.Vector2();
  private downTime = 0;

  private lastPoint!: Phaser.Math.Vector2;
  private lastDirection = Directions.None;

  constructor(scene: Phaser.Scene, levelWidth: number = 0) {
    this.scene = scene;
    const { scale: { width } } = scene;
    this.setLevelWidth(levelWidth ? levelWidth : width);
    this.setupEvents();
  }

  addListeners(listeners: TSwipeListeners) {
    this.listeners = listeners;
  }

  setLevelWidth(levelWidth: number) {
    const { scale: { width } } = this.scene;
    this.scrollCoeff = levelWidth / width;
  }

  private setupEvents() {
    this.scene.input.addListener(
      Phaser.Input.Events.POINTER_DOWN,
      this.downHandler,
      this,
    );
    this.scene.input.addListener(
      Phaser.Input.Events.POINTER_UP,
      this.upHandler,
      this,
    );
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scene.input.removeListener(
        Phaser.Input.Events.POINTER_DOWN,
        this.downHandler,
        this,
      );
      this.scene.input.removeListener(
        Phaser.Input.Events.POINTER_MOVE,
        this.moveHandler,
        this,
      );
      this.scene.input.removeListener(
        Phaser.Input.Events.POINTER_UP,
        this.upHandler,
        this,
      );
    });
  }

  private downHandler(pointer: Phaser.Input.Pointer) {
    this.downPoint = pointer.position.clone();
    this.downTime = new Date().getTime();
    this.scene.input.addListener(
      Phaser.Input.Events.POINTER_MOVE,
      this.moveHandler,
      this,
    );
  }

  private moveHandler(pointer: Phaser.Input.Pointer) {
    if (this.lastPoint) {
      const { direction } = this.getMoveParams(
        this.lastPoint,
        pointer.position,
        0,
      );
      if (
        HORIZONTAL.includes(this.lastDirection) &&
        HORIZONTAL.includes(direction) &&
        this.lastDirection !== direction
      ) {
        this.upHandler(pointer);
        this.downHandler(pointer);
      }
      this.lastDirection = direction;
    }
    this.lastPoint = pointer.position.clone();
    const movePrams = this.getMoveParams(
      this.downPoint,
      pointer.position,
      this.downTime,
    );
    if (this.listeners?.onMove) {
      this.listeners.onMove(movePrams);
    }

    (this.scene as PlayGame).deb(pointer.position.x.toString());
  }

  private upHandler(pointer: Phaser.Input.Pointer) {
    this.scene.input.removeListener(
      Phaser.Input.Events.POINTER_MOVE,
      this.moveHandler,
      this,
    );
    const movePrams = this.getMoveParams(
      this.downPoint,
      pointer.position,
      this.downTime,
    );
    if (this.listeners?.onUp) {
      this.listeners.onUp(movePrams);
    }
  }

  private getMoveParams(
    startPoint: Phaser.Math.Vector2,
    endPoint: Phaser.Math.Vector2,
    startTime: number,
  ): TMoveParams {
    let direction = Directions.None;
    const distance = startPoint.distance(endPoint);
    if (distance === 0) {
      direction = Directions.None;
    } else {
      const rad = Phaser.Math.Angle.BetweenPoints(endPoint, startPoint);
      const deg = Phaser.Math.RadToDeg(rad);
      const abs = Math.abs(deg);
      if (abs < 45) {
        direction = Directions.Left;
      } else if (abs > 135) {
        direction = Directions.Right;
      } else if (deg > 0) {
        direction = Directions.Up;
      } else {
        direction = Directions.Down;
      }
    }
    const time = new Date().getTime() - startTime;
    return { direction, distance, time };
  }
}

export default Swipe;
