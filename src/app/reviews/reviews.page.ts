import { WoocommerceService } from '../../services/woocommerce.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reviews',
  templateUrl: 'reviews.page.html',
  styleUrls: ['reviews.page.scss']
})
export class ReviewsPage implements OnInit
{
	items: any[];
	thumbs =  new Map();
	
	loaded:boolean;
	loading:boolean;
	
	page: number;
	
	constructor( public api: WoocommerceService , public navCtrl: NavController,) {}
	
	getKeys( map )
	{
		return Array.from( map.keys() );
	}
	
	get_reviews()
	{
		this.api.getReviews().subscribe(data => 
		{
			console.log(data);
			this.items = data;
			
			console.log( 'Items: ' + this.items );
			
			if( data.length > 0 )
			{
				for (let res of data) 
				{	
					if( ! this.thumbs.has( res.id ) )
					{
						this.thumbs.set( res.id, { id: res.id } );
					}        
				}
			
				this.loading = false;
				this.loaded = true;
			}
			else
			{
				let message = 'No Reviews to Show';
				
				this.thumbs.set( 0, { message: message } );
			}
		});
	}
	
	ngOnInit() 
	{
		this.get_reviews();
	}
}
