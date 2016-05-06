import './menu.less'
import {Component, ViewChild} from 'angular2/core'
import {ROUTER_DIRECTIVES, Router} from 'angular2/router'

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
		{key: 'schulte-table', title: 'Schulte Table', routeName: 'SchulteTable'},
		{key: 'spinning-number', title: 'Spinning numbers', routeName: 'SpinningNumbers'},
		{key: 'running-text', title: 'Running Text', routeName: 'RunningText'},
		{key: 'deconcentration', title: 'Deconcentration', routeName: 'Deconcentration'},
		{key: 'first', title: 'Schulte Table', routeName: 'First'},
		{key: 'second', title: 'Schulte Table', routeName: 'Second'},
	];
	private boxSize = 100;
	private spaceSize = 10;

	constructor(private router: Router) {}

	ngAfterViewInit() {	
		let topNavSnap = new Snap(this.topNav.nativeElement);
		let group = topNavSnap.group();
		let x = 0;
		let y = 0;
		let shadow = topNavSnap.filter(Snap.filter.shadow(0, 0, 2));

		this.items.forEach(item => {
			this.initRect(topNavSnap, group, item, x, y, shadow);

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

	initRect(topNavSnap, group, item, x, y, shadow) {
		let boxGroup = group.group();
		let box = Snap().rect(
			x*(this.boxSize+this.spaceSize), 
			y*(this.boxSize+this.spaceSize), 
			this.boxSize, 
			this.boxSize
		);
		let title = Snap().text(x*(this.boxSize+this.spaceSize), y*(this.boxSize+this.spaceSize) + 100, item.title);

		boxGroup.append(box);
		boxGroup.append(title);
		box.attr({
			id: item.key,
			class: 'menu-item',
			fill: '#197700',
			filter: shadow
		});
		title.attr({
			opacity: '0'
		});

		box.hover(() => {
			group.append(boxGroup);			
			boxGroup.animate({transform: 's1.5,1.5'}, 500, mina.elastic);
			title.attr({
				opacity: '1'
			});
		}, () => {
			boxGroup.animate({transform: 's1,1'}, 500, mina.elastic);
			title.attr({
				opacity: '0'
			});
		});

		box.click(() => {
			boxGroup.animate({transform: 's1.3,1.3'}, 500, mina.elastic);
			this.router.navigate([item.routeName]);
		});
	}
}