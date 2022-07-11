import { WoocommerceService } from '../../services/woocommerce.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: 'orderdetails.page.html',
  styleUrls: ['orderdetails.page.scss']
})

export class OrderDetailsPage implements OnInit
{
	item: any[];
	notes: any[];
	thumbs = new Map();
	orderId;
	loaded: boolean;
	searching: boolean;
	
	constructor(public api: WoocommerceService, private route: ActivatedRoute) 
	{
	}
	
	getKeys(map) 
	{
		return Array.from(map.keys());
	}
	
	load_order()
	{		
		this.api.getOrder( this.orderId ).subscribe(data => 
		{
			this.item = data;
			
			console.log( this.item );
			
			this.searching = false;
			this.loaded = true;
        });
		
		this.api.getNotes( this.orderId ).subscribe(data => 
		{
			this.notes = data;
			
			console.log( this.notes );
			
			this.searching = false;
			this.loaded = true;
        });
	}
	
	accept_order()
	{
		this.show_time();
		
		this.api.acceptOrder( this.orderId ).subscribe(data => 
		{
			console.log( data );
        });
		
		this.print_order();
	}
	
	decline_order()
	{
		this.api.declineOrder( this.orderId ).subscribe(data => 
		{
			console.log( data );
        });
	}
	
	show_time()
	{
		
	}
	
	print_order()
	{
		
	}
	
	ngOnInit() 
	{
		this.orderId = this.route.snapshot.paramMap.get('id');
		
		this.searching = false;
		this.load_order();
	}
}
