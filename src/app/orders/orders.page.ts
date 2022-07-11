import { WoocommerceService } from '../../services/woocommerce.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss']
})

export class OrdersPage implements OnInit
{
	items: any[];
	thumbs =  new Map();
	
	loaded:boolean;
	loading:boolean;
	
	page: number;
	
	constructor( public api: WoocommerceService , public navCtrl: NavController, private router: Router) {}
	
	getKeys( map )
	{
		return Array.from( map.keys() );
	}
	
	get_orders( ev: any )
	{
		this.api.getOrders( ev ).subscribe(data => 
		{
			this.items = data;
			
			let status = '';
						
			for (let res of data) 
			{
				if( res.status == 'processing' )
				{
					status = 'Processing';
				}
				if( res.status == 'completed' )
				{
					status = 'Completed';
				}
				
				if( ! this.thumbs.has( res.id ) )
				{
					this.thumbs.set( res.id, { id: res.id, date: res.date_created, firstname: res.billing.first_name, lastname: res.billing.last_name, content: status } );
				}        
			}
			
			this.loading = false;
			this.loaded = true;
		});
	}
	
	ngOnInit() 
	{
		this.get_orders( 'processing' );
		this.loading = false;
		this.page = 1;
	}
}
