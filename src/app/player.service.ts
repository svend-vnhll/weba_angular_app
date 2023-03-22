import { Injectable } from '@angular/core';
import { Player } from './player';
import { PLAYERS } from './mock-players';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players = PLAYERS;
  newList?: Player[] = PLAYERS;
  orderedList?: Player[] = [];
  logged?: Player;
  constructor() { }

  getPlayers(): Player[] {
    this.orderedList = this.newList?.sort((a, b) => b.bestscore - a.bestscore);
    return this.orderedList!;
  }

  addPlayer(newPlayer: Player) {
    let player: Player = this.changeIfExisting(newPlayer);
    this.logged = player;
  }

  changeIfExisting(player: Player): Player {
    let matchPlayer: Player = player;
    for (const p of this.newList!) {
      if (p.nickname == player.nickname) {
        return p;
      }
    }
    matchPlayer.id = +this.newList?.length! + 1;
    this.newList?.push(matchPlayer);
    return matchPlayer;
  }

  getLogged() {
    return this.logged;
  }
}
