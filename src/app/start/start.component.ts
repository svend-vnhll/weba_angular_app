import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  @ViewChild('text_input') text_input!: ElementRef;
  userInput: string = "";

  dashboard_shown?: boolean;

  constructor(private messageService: MessageService, private router: Router) { };

  start_game() {
    if (this.userInput == "") {
      setTimeout(() => this.messageService.set("Let's play !"), 1000);
      this.messageService.set("Enter your player name !");
    } else {
      alert("The game starts, " + this.userInput + " !");
      this.userInput = "";
      this.router.navigate(['/game']);
    }
  }

  openDashboard() {
    if (this.dashboard_shown) {
      this.dashboard_shown = false;
    } else {
      this.dashboard_shown = true;
    }
  }

}
