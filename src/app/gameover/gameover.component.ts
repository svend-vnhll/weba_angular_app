import { Component } from '@angular/core';
import { PlayerService } from '../player.service';
import { GameService } from '../game.service';
import { Player } from '../player';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent {

  constructor(private playerService: PlayerService, private gameService: GameService) { };

  player?: Player = this.playerService.logged;
  score?: number = this.gameService.score;


}
