import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { environment } from '../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
 
@Injectable({
  providedIn: 'root'
})

export class WoocommerceService 
{		
	constructor( private http: HttpClient, private storage: Storage, private plt: Platform ) 
	{
	}
  
	public get_store_name(): any
	{	
		let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
	
		return this.http.get(`${environment.wordpressUrl}` , { headers: headers } );		
	}
	
	public get_store_info( date ): any
	{
		if( date == 'today' )
		{
			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0');
			let yyyy = today.getFullYear();
			
			let d = yyyy + '-' + mm + '-' + dd;
						
			return this.http.get(`${environment.woocommerceUrl}/reports/sales?date_min=${d}&date_max=${d}&consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
		}
		else if( date == 'week' )
		{
			return this.http.get(`${environment.woocommerceUrl}/reports/sales?period=week&consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
		}
		else if( date == 'month' )
		{
			return this.http.get(`${environment.woocommerceUrl}/reports/sales?period=month&consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
		}
		else
		{
			return this.http.get(`${environment.woocommerceUrl}/reports/sales?period=year&consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
		}
	}
	
	public store_token( token )
	{
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );
		
		let usermeta =  
		{
			'id': 1,
			'meta': {
				'device_token': token
			}
		};
	 
		return this.http.post(`${environment.wordpressUrl}}/users/1` , usermeta );
	}
	
	public get_top_sellers(): any
	{
		return this.http.get(`${environment.woocommerceUrl}/reports/top_sellers?period=year&consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
	}
	
	public getOrders( type ): any
	{
		if( type == 'processing' )
		{
			return this.http.get(`${environment.woocommerceUrl}/orders?status=processing&consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
		}
		else
		{
			return this.http.get(`${environment.woocommerceUrl}/orders?consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
		}
	}
	
	public getOrder(id): any
	{
		return this.http.get(`${environment.woocommerceUrl}/orders/${id}?consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
	}
	
	public acceptOrder(id): any
	{
		return this.http.post(`${environment.woocommerceUrl}/orders/${id}?status=completed&consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}` , null);
	}
	
	public declineOrder(id): any
	{
		return this.http.post(`${environment.woocommerceUrl}/orders/${id}/refund?consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}` , null );
	}
	
	public getNotes(id): any
	{
		return this.http.get(`${environment.woocommerceUrl}/orders/${id}/notes?consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
	}
	
	public getProducts(): any
	{		
		return this.http.get(`${environment.woocommerceUrl}/products?consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
	}
	
	public getProduct(id): any
	{
		return this.http.get(`${environment.woocommerceUrl}/products/${id}?consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
	}
	
	public getReviews(): any
	{
		return this.http.get(`${environment.woocommerceUrl}/products/reviews?consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);	
	}
	
	public viewReview(id): any
	{
		return this.http.get(`${environment.woocommerceUrl}/products/reviews/${id}?consumer_key=${environment.consumer_key}&consumer_secret=${environment.consumer_secret}`);
	}
}