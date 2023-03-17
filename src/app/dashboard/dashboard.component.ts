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
  sortedPlayers: Player[] = [];
  pos: Number = 0;
  index: number = 0;
  max: Number = 0;
  min: Number = 999;
  bestPlayer?: Player;

  constructor(private playerService: PlayerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(players => this.players = players);
    this.filterBestScores();
  }

  filterBestScores() {
    this.players.forEach(p => {
      this.max = 0;
      this.findMax(this.players);
    });
    this.sortedPlayers = this.sortedPlayers.slice(0, 5);
    setTimeout(() => this.messageService.set("Let's play !"), 3000);
    this.messageService.set("Bestplayer is : " + this.sortedPlayers[0].nickname + " bestscore of " + this.sortedPlayers[0].bestscore);
  }

  findMax(p: Player[]) {
    p.forEach(p => {
      if (p.bestscore > this.max) {
        if (this.sortedPlayers.find(sp => sp.id === p.id)) {
          //pass
        } else {
          this.bestPlayer = p;
          this.max = p.bestscore;
        }
      }
    });
    this.sortedPlayers.push(this.bestPlayer!);
  }
}
