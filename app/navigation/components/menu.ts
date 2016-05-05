import './menu.less'
import {Component, ViewChild} from 'angular2/core'
import {ROUTER_DIRECTIVES} from 'angular2/router'

declare var Snap:any
declare var mina:any

@Component({
	selector: 'menu',
	template: `
		<svg #topNav class="menu-container"></svg>
	`,
	directives: [ROUTER_DIRECTIVES]
})
export class Menu {
	@ViewChild('topNav') topNav:any;
	private items = [
		{key: 'schulte-table', title: 'Schulte Table', link: '/schulte-table'},
		{key: 'spinning-number', title: 'Spinning numbers', link: '/spinning-numbers'},
		{key: 'running-text', title: 'Running Text', link: '/running-text'},
		{key: 'deconcentration', title: 'Deconcentration', link: '/deconcentration'},
		{key: 'first', title: 'Schulte Table', link: '/schulte-table'},
		{key: 'second', title: 'Schulte Table', link: '/schulte-table'},
	];
	private boxSize = 100;
	private spaceSize = 10;

	ngAfterViewInit() {	
		let topNavSnap = new Snap(this.topNav.nativeElement);
		let group = topNavSnap.group();
		let x = 0;
		let y = 0;

		this.items.forEach(item => {
			this.initRect(topNavSnap, group, item, x, y);

			x += 1;

			if (x >= 3) {
				x = 0;
				y += 1;
			}
		});

		topNavSnap.attr({
			viewBox: '-100 -100 520 410'
		});
	}

	initRect(topNavSnap, group, item, x, y) {
		let box = Snap().rect(
			x*(this.boxSize+this.spaceSize), 
			y*(this.boxSize+this.spaceSize), 
			this.boxSize, 
			this.boxSize
		);

		let shadow = topNavSnap.filter(Snap.filter.shadow(0, 2, 3));

		box.attr({
			id: item.key,
			fill: '#197700',
			filter: shadow
		});

		box.hover(() => {
			box.animate({transform: 's2,2'}, 500, mina.elastic);
		}, () => {
			box.animate({transform: 's1,1'}, 500, mina.elastic);
		});
		
		group.append(box);
	}
}