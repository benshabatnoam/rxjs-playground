import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs';
import { takeUntil, concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.css']
})
export class DragNDropComponent implements OnInit {
  dragNDropSubscription: ISubscription;
  logo: HTMLElement;
  @ViewChild('logo', { read: ElementRef }) logoRef: ElementRef;

  constructor() { }

  ngOnInit() {
    this.logo = this.logoRef.nativeElement;
    const mouseDowns = fromEvent(this.logo, 'mousedown');
    const mouseMoves = fromEvent(document, 'mousemove');
    const mouseUps = fromEvent(this.logo, 'mouseup');
    const mouseDrags = mouseDowns.pipe(
      concatMap((contactPoint: MouseEvent) => {
        return mouseMoves.pipe(
          takeUntil(mouseUps),
          map((movePoint: MouseEvent) => {
            return {
              pageX: movePoint.pageX - contactPoint.layerX,
              pageY: movePoint.pageY - contactPoint.layerY
            };
          })
        );
      })
    );
    this.dragNDropSubscription = mouseDrags.subscribe(
      (point: { pageX: number, pageY: number }) => {
        this.logo.style.top = point.pageY  + 'px';
        this.logo.style.left = point.pageX + 'px';
      }
    );
  }

}
