import './schulte-table-control.less'
import 'lodash'
import {Component, ViewChild, Output, EventEmitter} from 'angular2/core'
import {NgFor, NgIf, NgClass, NgModel} from 'angular2/common'

declare var _:any;

@Component({
    selector: 'schulte-table-control',
    template: `
        <div [ngClass]="{open: isOpen, close: !isOpen, 'schulte-table-control': true}">
            <div *ngIf="!isOpen">
                <div class="control-menu" (click)="switchMode()">+</div>
            </div>
            <div *ngIf="isOpen">
                <div class="title">Schulte table config</div>
                <div>
                    <label for="fieldSize">Field size</label>
                    <select id="fieldSize" [(ngModel)]="fieldSize">
                        <option *ngFor="let size of fieldSizeSet" [value]="size">{{size}}</option>
                    </select>
                </div>
                <div>
                    <label for="showAnswered">Show correct answers</label>
                    <input type="checkbox" id="showAnswered" [(ngModel)]="showAnswered" />
                </div>

                <hr />

                <button class="apply" (click)="applyChanges()">OK</button>
                <button class="cancel" (click)="switchMode()">Cancel</button>
            </div>
        </div>
    `,
    directives: [NgFor, NgIf, NgClass, NgModel],
    outputs: ['configChange']
})
export class SchulteTableControl {
    public configChange:EventEmitter = new EventEmitter();
    private fieldSize:number = 5;
    private fieldSizeSet:any;
    private showAnswered:boolean = true;
    private isOpen:boolean = false;

    constructor() {
        this.fieldSizeSet = _.range(15).filter(i => i > 2)
    }

    switchMode() {
        this.isOpen = !this.isOpen;
    }

    applyChanges() {
        this.switchMode();
        this.configChange.next({
            showAnswered: this.showAnswered,
            fieldSize: this.fieldSize
        });
    }
}
