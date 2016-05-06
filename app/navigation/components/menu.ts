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
	private surface:any;
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
		this.surface = new Snap(this.topNav.nativeElement);
		let group = this.surface.group();		
		let shadow = this.surface.filter(Snap.filter.shadow(0, 0, 1));
		let x = 0, y = 0;

		this.items.forEach(item => {
			this.initRect(group, item, x, y, shadow);

			x += 1;

			if (x >= 3) {
				x = 0;
				y += 1;
			}
		});

		this.surface.attr({
			viewBox: '-100 -100 520 410'
		});
	}

	initRect(group, item, x, y, shadow) {
		let boxGroup = group.group();
		let coords = {
			x: x*(this.boxSize+this.spaceSize),
			y: y*(this.boxSize+this.spaceSize)
		};
		let box = this.surface.rect(coords.x, coords.y, this.boxSize, this.boxSize);
		let title = this.surface.text(coords.x + 50, coords.y + 90, item.title);

		boxGroup.append(box);
		boxGroup.append(title);
		boxGroup.attr({class: 'menu-item'});
		box.attr({id: item.key, fill: '#197700', filter: shadow});
		title.attr({textAnchor: 'middle', opacity: '0'});

		boxGroup.hover(
			() => this.handleBoxHoverIn(group, boxGroup, title), 
			() => this.handleBoxHoverOut(boxGroup, title)
		);
		boxGroup.click(() => this.handleBoxClick(boxGroup, item));
	}

	handleBoxHoverIn(group, boxGroup, title) {
		group.append(boxGroup);			
		boxGroup.animate({transform: 's1.5,1.5'}, 500, mina.elastic);
		title.attr({opacity: '1'});
	}

	handleBoxHoverOut(boxGroup, title) {
		boxGroup.animate({transform: 's1,1'}, 500, mina.elastic);
		title.attr({opacity: '0'});
	}

	handleBoxClick(boxGroup, item) {
		boxGroup.animate({transform: 's1.3,1.3'}, 500, mina.elastic);
		this.router.navigate([item.routeName]);	
	}
}