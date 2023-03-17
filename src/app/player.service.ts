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
  logged?: Player;
  constructor() { }

  getPlayers(): Observable<Player[]> {
    return this.players;
  }

  addPlayer(newPlayer: Player) {
    let player: Player = this.changeIfExisting(newPlayer);
    player.id = +this.newList?.length! + 1;
    this.logged = player;
    this.newList?.push(player);
  }

  changeIfExisting(player: Player): Player {
    let matchPlayer: Player = player;
    this.newList!.forEach(p => {
      if (p.nickname == player.nickname) {
        matchPlayer = p;
      }
    });
    return matchPlayer;
  }

  getLogged() {
    return this.logged;
  }
}
