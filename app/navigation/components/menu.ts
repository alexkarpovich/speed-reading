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
	@ViewChild('topNav') topNav:any

	ngAfterViewInit() {		
		let topNavSnap = new Snap(this.topNav.nativeElement)
		topNavSnap.rect('50%','50%',100, 100)
			.animate({scale: 200}, 1000, mina.elastic);
	}
}