import './menu.less'
import {Component} from 'angular2/core'
import {ROUTER_DIRECTIVES} from 'angular2/router'

@Component({
	selector: 'menu',
	template: `
		<nav>
		    <a [routerLink]="['SchulteTable']">Schulte Table</a>
		</nav>
	`,
	directives: [ROUTER_DIRECTIVES]
})
export class Menu {}