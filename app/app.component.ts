import './style.less'
import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'
import {Menu} from './navigation/components/menu'
import {SchulteTable} from './schulte-table/components/schulte-table'

@Component({
    selector: 'app',
    template: `
		<div class="main">
		 	<router-outlet></router-outlet>
		</div>
    `,
    directives: [ROUTER_DIRECTIVES, Menu]
})
@RouteConfig([
	{path: '/schulte-table', name: 'SchulteTable', component: SchulteTable},
	{path: '/', name: 'Menu', component: Menu}
])
export class AppComponent {}
