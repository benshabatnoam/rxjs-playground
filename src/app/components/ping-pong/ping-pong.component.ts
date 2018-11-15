import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, concatAll, concatMap, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-ping-pong',
  templateUrl: './ping-pong.component.html',
  styleUrls: ['./ping-pong.component.css']
})
export class PingPongComponent implements OnInit {
  leftBorder = 0;
  rightBorder = 1110;
  playerWidth = 100;
  @ViewChild('playerOne', { read: ElementRef}) playerOne: ElementRef;
  @ViewChild('game', { read: ElementRef}) game: ElementRef;

  constructor() { }

  ngOnInit() {
    const playerOneMouseDown = fromEvent(this.playerOne.nativeElement, 'mousedown');
    const documentMouseMove = fromEvent(document, 'mousemove');
    const documentMouseUp = fromEvent(document, 'mouseup');
    playerOneMouseDown.pipe(
      concatMap((mouseDownEvent: MouseEvent) => {
        return documentMouseMove.pipe(
          takeUntil(documentMouseUp),
          map((mouseMoveEvent: MouseEvent) => {
            console.log(mouseMoveEvent);
            return mouseMoveEvent.pageX - mouseDownEvent.layerX - this.game.nativeElement.offsetLeft;
          })
        );
      })
    ).subscribe((left: number) => {
      if (left > this.rightBorder - this.playerWidth) {
        left = this.rightBorder - this.playerWidth;
      } else if (left < this.leftBorder) {
        left = this.leftBorder;
      }
      this.playerOne.nativeElement.style.left = left + 'px';
    });
  }

}
