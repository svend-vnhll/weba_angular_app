import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { PlayerService } from '../player.service';
import { Player } from '../player';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  @ViewChild('text_input') text_input!: ElementRef;
  userInput: string = "";

  dashboard_shown?: boolean;

  constructor(private messageService: MessageService, private router: Router, private playerService: PlayerService) { };

  start_game() {
    if (this.userInput == "") {
      setTimeout(() => this.messageService.set("Let's play !"), 1000);
      this.messageService.set("Enter your player name !");
    } else {

      this.addPlayer(this.userInput);
      this.userInput = "";
      this.router.navigate(['/game']);
    }
  }

  addPlayer(nickname: string) {
    const newPlayer: Player = {
      id: 0,
      nickname: nickname,
      bestscore: 0,
      count_games: 0
    };
    this.playerService.addPlayer(newPlayer);
  }

  openDashboard() {
    if (this.dashboard_shown) {
      this.dashboard_shown = false;
    } else {
      this.dashboard_shown = true;
    }
  }

}
