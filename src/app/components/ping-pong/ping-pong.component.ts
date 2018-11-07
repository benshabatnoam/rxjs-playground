import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, concatAll, concatMap, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-ping-pong',
  templateUrl: './ping-pong.component.html',
  styleUrls: ['./ping-pong.component.css']
})
export class PingPongComponent implements OnInit {
  @ViewChild('playerOne', { read: ElementRef}) playerOne: ElementRef;

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
            return mouseMoveEvent.movementX;
          })
        );
      })
    ).subscribe((movementX: number) => {
      let left = 0;
      if (this.playerOne.nativeElement.style.left) {
        left = +/\d/g.exec(this.playerOne.nativeElement.style.left)[0];
      }
      console.log(left);
      this.playerOne.nativeElement.style.left = left + movementX + 'px';
    });
  }

}
