import { Injectable } from '@angular/core';
import { Player } from './player';
import { PLAYERS } from './mock-players';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players = of(PLAYERS);
  newList?: Player[] = PLAYERS;
  constructor() { }

  getPlayers(): Observable<Player[]> {
    return this.players;
  }

}
