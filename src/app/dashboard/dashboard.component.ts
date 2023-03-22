import { Component } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  players: Player[] = [];
  pos: Number = 0;
  index: number = 0;
  max: Number = 0;
  min: Number = 999;
  bestPlayer?: Player;
  output?: Player;

  constructor(private playerService: PlayerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.players = this.getPlayers().slice(0, 6);
  }

  getPlayers(): Player[] {
    return this.playerService.getPlayers();
  }
}
