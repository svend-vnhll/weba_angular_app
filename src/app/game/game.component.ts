import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { MessageService } from '../message.service';
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  yellow_btn: string = "";
  red_btn: string = "";
  blue_btn: string = "";
  green_btn: string = "";
  inGame: boolean = false;
  gameOver: boolean = false;
  score: number = 0;
  step?: number;
  player!: Player | undefined;

  constructor(private router: Router,
    private gameService: GameService,
    private messageService: MessageService,
    private playerService: PlayerService) { };

  code: number[] = [];

  ngOnInit(): void {
    this.player = this.playerService.logged;
    if (this.player === undefined) {
      this.router.navigate(['/start']);
    } else {
      this.gameService.game = [];
      this.code = [];
      this.step = 1;
      this.score = 0;
      this.newRound();
      this.gameOver = false;
    }
    this.playerService
  }

  async readCode() {
    for (const pos of this.code) {
      await new Promise(resolve => setTimeout(resolve, 700));
      if (pos == 1) {
        this.ybtn(true);
      } else if (pos == 2) {
        this.bbtn(true);
      } else if (pos == 3) {
        this.rbtn(true);
      } else {
        this.gbtn(true);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.inGame = true;
    this.messageService.set("Your turn, " + this.player?.nickname + " !");
  }

  newRound() {
    this.inGame = false;
    this.gameService.newRound();
    this.code = this.gameService.game;
    this.readCode();
    this.step = 1;
    this.messageService.set("Watch the colors !");
  }

  async ybtn(computer?: boolean) {
    if (this.inGame || computer) {
      const div_ybtn = document.getElementById('yellow_btn')!;
      //const ybtn_color = window.getComputedStyle(div_ybtn).getPropertyValue('background-color');
      setTimeout(function () { div_ybtn.style.backgroundColor = "rgb(189, 183, 107)" }, 300);
      div_ybtn.style.backgroundColor = "yellow";
      if (this.inGame) {
        if (this.checkIfOK(1, this.step!)) {
          if (this.checkIfEndRound(this.step!)) {
            this.messageService.set("Good !");
            this.score = this.score + 1;
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.newRound();
          }
        } else {
          this.endGame();
        }
      }
    }
  }

  async bbtn(computer?: boolean) {
    if (this.inGame || computer) {
      const div_bbtn = document.getElementById('blue_btn')!;
      setTimeout(function () { div_bbtn.style.backgroundColor = "rgb(0, 0, 139)" }, 300);
      div_bbtn.style.backgroundColor = "blue";
      if (this.inGame) {
        if (this.checkIfOK(2, this.step!)) {
          if (this.checkIfEndRound(this.step!)) {
            this.messageService.set("Great !");
            this.score = this.score + 1;
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.newRound();
          }
        } else {
          this.endGame();
        }
      }
    }
  }

  async rbtn(computer?: boolean) {
    if (this.inGame || computer) {
      const div_rbtn = document.getElementById('red_btn')!;
      setTimeout(function () { div_rbtn.style.backgroundColor = "rgb(139, 0, 0)" }, 300);
      div_rbtn.style.backgroundColor = "red";
      if (this.inGame) {
        if (this.checkIfOK(3, this.step!)) {
          if (this.checkIfEndRound(this.step!)) {
            this.messageService.set("You got it !");
            this.score = this.score + 1;
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.newRound();
          }
        } else {
          this.endGame();
        }
      }
    }
  }

  async gbtn(computer?: boolean) {
    if (this.inGame || computer) {
      const div_gbtn = document.getElementById('green_btn')!;
      setTimeout(function () { div_gbtn.style.backgroundColor = "rgb(143, 188, 143)" }, 300);
      div_gbtn.style.backgroundColor = "greenyellow";
      if (this.inGame) {
        if (this.checkIfOK(4, this.step!)) {
          if (this.checkIfEndRound(this.step!)) {
            this.messageService.set("Amazing !");
            this.score = this.score + 1;
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.newRound();
          }
        } else {
          this.endGame();
        }
      }
    }
  }

  checkIfOK(btn: number, step: number): boolean {
    if (btn == this.code.slice(step - 1, step)[0]) {
      this.step = +this.step! + 1;
      return true;
    } else {
      return false;
    }
  }

  checkIfEndRound(step: number): boolean {
    if (step - 1 == this.code.length) {
      return true;
    } else {
      return false;
    }
  }

  endGame() {
    this.messageService.set("GAME OVER !");
    if (this.player!.bestscore < this.score) {
      this.player!.bestscore = this.score;
    }
    this.player!.count_games = +this.player!.count_games + 1;
    this.inGame = false;
    this.gameOver = true;
    this.gameService.score = this.score;
  }

  restart() {
    if (this.score >= 1) {
      this.player!.count_games = +this.player!.count_games + 1;
    }
    this.ngOnInit();
    this.messageService.set("Game restarted !");
  }

  backHome() {
    this.router.navigate(['/start']);
  }
}
