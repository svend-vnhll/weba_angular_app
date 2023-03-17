import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  game: number[] = [];
  num?: number;
  codeLength?: number = 0;

  newRound() {
    this.num = Math.floor(Math.random() * 4) + 1;
    this.game.push(this.num);
    this.codeLength = this.game.length;
  }

  clear() {
    this.game = [];
  }
}
