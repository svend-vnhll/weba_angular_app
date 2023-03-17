import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { };

  code: number[] = [1, 2, 3, 4];

  ngOnInit(): void {
    this.readCode();
  }

  async readCode() {
    for (const pos of this.code) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (pos == 1) {
        this.ybtn();
      } else if (pos == 2) {
        this.bbtn();
      } else if (pos == 3) {
        this.rbtn();
      } else {
        this.gbtn();
      }
    }
  }

  ybtn() {
    const div_ybtn = document.getElementById('yellow_btn')!;
    const ybtn_color = window.getComputedStyle(div_ybtn).getPropertyValue('background-color');
    setTimeout(function () { div_ybtn.style.backgroundColor = ybtn_color }, 300);
    div_ybtn.style.backgroundColor = "yellow";
  }

  bbtn() {
    const div_bbtn = document.getElementById('blue_btn')!;
    const bbtn_color = window.getComputedStyle(div_bbtn).getPropertyValue('background-color');
    setTimeout(function () { div_bbtn.style.backgroundColor = bbtn_color }, 300);
    div_bbtn.style.backgroundColor = "blue";
  }

  rbtn() {
    const div_rbtn = document.getElementById('red_btn')!;
    const rbtn_color = window.getComputedStyle(div_rbtn).getPropertyValue('background-color');
    setTimeout(function () { div_rbtn.style.backgroundColor = rbtn_color }, 300);
    div_rbtn.style.backgroundColor = "red";
  }

  gbtn() {
    const div_gbtn = document.getElementById('green_btn')!;
    const gbtn_color = window.getComputedStyle(div_gbtn).getPropertyValue('background-color');
    setTimeout(function () { div_gbtn.style.backgroundColor = gbtn_color }, 300);
    div_gbtn.style.backgroundColor = "greenyellow";
  }

  backHome() {
    this.router.navigate(['/start']);
  }
}
