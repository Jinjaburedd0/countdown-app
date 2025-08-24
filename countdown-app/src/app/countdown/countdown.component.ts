import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {
  targetDate: Date = new Date('2025-09-27T00:00:00');
  remainingTime: any;
  subscription!: Subscription;

  ngOnInit() {
    this.calculateRemainingTime();
    this.subscription = interval(1000).subscribe(() => {
      this.calculateRemainingTime();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  calculateRemainingTime() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    this.remainingTime = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  }
}