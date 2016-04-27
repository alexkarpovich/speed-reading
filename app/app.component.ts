import {Component} from 'angular2/core'
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router'
import {SchulteTable} from './schulte-table/components/schulte-table'

@Component({
    selector: 'app',
    template: `
    	<header>
    		<nav>
    			<a [routerLink]="['SchulteTable']">Schulte Table</a>
    		</nav>
    	</header>
    	<div class="main">
    		<router-outlet></router-outlet>
    	</div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/schulte-table', name: 'SchulteTable', component: SchulteTable}
])
export class AppComponent {}
