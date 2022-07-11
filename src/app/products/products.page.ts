import { WoocommerceService } from '../../services/woocommerce.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: 'products.page.html',
  styleUrls: ['products.page.scss']
})
export class ProductsPage implements OnInit
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
	
	get_products()
	{
		let status = '';
		let variations = '';
		
		this.api.getProducts().subscribe(data => 
		{
			console.log(data);
			this.items = data;
						
			for (let res of data) 
			{
				if( res.stock_status == 'instock' )
				{
					status = 'In Stock';
				}
				else
				{
					status = 'Not In Stock';
				}
				
				if( res.variations.length > 0 )
				{
					variations = ' . ' + res.variations.length + ' Variations';
				}
				else
				{
					variations = '';
				}
				
				if( ! this.thumbs.has( res.id ) )
				{
					this.thumbs.set( res.id, { id: res.id, name: res.name, stock: status, type: res.type, variations: variations } );
				}        
			}
			
			this.loading = false;
			this.loaded = true;
		});
	}
	
	ngOnInit() 
	{
		this.get_products();
	}
}
