import { WoocommerceService } from '../../services/woocommerce.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  templateUrl: 'productdetails.page.html',
  styleUrls: ['productdetails.page.scss']
})

export class ProductDetailsPage implements OnInit
{
	item: any[];
	thumbs = new Map();
	productId;
	loaded: boolean;
	searching: boolean;
	
	constructor(public api: WoocommerceService, private route: ActivatedRoute) 
	{
	}
	
	getKeys(map) 
	{
		return Array.from(map.keys());
	}
	
	load_product()
	{		
		this.api.getProduct( this.productId ).subscribe(data => 
		{
			this.item = data;
			
			console.log( this.item );
			
			this.searching = false;
			this.loaded = true;
        });
	}
	
	ngOnInit() 
	{
		this.productId = this.route.snapshot.paramMap.get('id');
		
		this.searching = false;
		this.load_product();
	}
}
