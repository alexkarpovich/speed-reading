import './schulte-table.less'
import 'lodash'
import {Component, ViewChild} from 'angular2/core'
import {SchulteTableControl} from './schulte-table-control'

declare var Snap:any;
declare var _:any;
declare var mina:any;

@Component({
	selector: 'schulte-table',
	template: `
		<schulte-table-control (configChange)="configChange($event)"></schulte-table-control>
		<svg #schulteTable class="schulte-table-container"></svg>
	`,
	directives: [SchulteTableControl]
})
export class SchulteTable {
	@ViewChild('schulteTable') schulteTable:any;
	@ViewChild('controls') controls:any;
	private surface:any;
	private tableGroup:any;
	private fieldSize:number = 5;
	private size:number = 40;
	private offset:number = 5;
	private showAnswered:boolean = true;
	private index:number;

	ngAfterViewInit() {
		this.surface = new Snap(this.schulteTable.nativeElement);
		this.initField();
	}

	initField() {
		this.index = 1;
		this.tableGroup && this.tableGroup.remove();
		this.tableGroup = this.surface.group();

		let x = 0, y = 0;

		this.getFieldSet().forEach(item => {
			this.initBox(item, x, y);

			x += 1;
			if (x >= this.fieldSize) {
				x = 0;
				y += 1;
			}
		});

		let bbox = this.tableGroup.getBBox();
		let shadow = this.surface.filter(Snap.filter.shadow(0, 0, 1));
		let circle = this.surface.circle(100, 100, 50);
		circle.attr({filter:shadow, fill: '#000'});

		this.surface.attr({viewBox: `-100 -100 ${bbox.width+200} ${bbox.height+200}`})
	}

	initBox(item, x, y) {
		let boxGroup = this.tableGroup.group();
		let coords = {x: x*(this.size + this.offset), y: y*(this.size + this.offset)};
		let box = this.surface.rect(coords.x, coords.y, this.size, this.size);
		let text = this.surface.text(coords.x + this.size / 2, coords.y + 25, item);

		box.attr({fill: '#D8B863'});
		text.attr({textAnchor: 'middle'});

		boxGroup.append(box);
		boxGroup.append(text);
		boxGroup.attr({class:'box-group'});

		boxGroup.click(() => this.handleBoxClick(box, item));
	}

	handleBoxClick(box, item) {
		if (this.index == item) {
			box.animate({fill: '#6FE218', transform: 's0.5,0.5'}, 400, mina.elastic, () => {
				this.showAnswered && box.animate({fill: '#D8B863', transform: 's1,1'}, 400, mina.bounce);
			});
			this.increaseIndex();
		} else if (this.index < item) {
			box.animate({fill: '#FF0000', transform: 's0.7,0.7'}, 400, mina.elastic, () => {
				box.animate({fill: '#D8B863', transform: 's1,1'}, 400, mina.bounce);
			});
		}

	}

	getFieldSet() {
		return _.shuffle(_.range(this.fieldSize * this.fieldSize).map(i => i + 1))
	}

	getTableGroupCenter() {
		return (this.fieldSize * this.size + (this.fieldSize - 1) * this.offset) / 2;
	}

	increaseIndex() {
		this.index += 1;

		if (this.index > this.fieldSize * this.fieldSize) {
			console.log('WIN');
		}
	}

	configChange(event) {
		this.fieldSize = event.fieldSize;
		this.showAnswered = event.showAnswered;

		this.initField();
	}
}
