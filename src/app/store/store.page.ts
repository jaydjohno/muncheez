import { WoocommerceService } from '../../services/woocommerce.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import {Router} from '@angular/router';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-store',
  templateUrl: 'store.page.html',
  styleUrls: ['store.page.scss']
})

export class StorePage implements OnInit
{
	items: any[];
	info: any[];
	top: any[];
	thumbs =  new Map();
	
	start;
	date;
	token;
	
	loaded:boolean;
	loading:boolean;
	
	remoteToken: string;
	
	session: any;
	
	notifications: PushNotification[] = [];
  
	constructor( private api: WoocommerceService, private platform: Platform, private router: Router ) {}
	
	getKeys( map )
	{
		return Array.from( map.keys() );
	}
	
	get_store_name()
	{
		this.api.get_store_name().subscribe(data => 
		{			
			this.items = data;
		});
	}
	
	get_store_info( ev: any )
	{	
		console.log('Segment button clicked', ev);
		
		this.api.get_store_info( ev ).subscribe(data => 
		{			
			this.info = data;
		});
	}
	
	get_top_sellers()
	{
		this.api.get_top_sellers().subscribe(data => 
		{			
			this.top = data;
		});
	}
	
	segmentChanged(e)
	{
		let segmentValue = e.detail.value;
		
		this.get_store_info( segmentValue );
	}
	
	ngOnInit() 
	{
		this.start = 'today';
		
		this.get_store_name();
		this.get_store_info( 'today' );
		this.get_top_sellers();
		
		console.log('Initializing HomePage');

		// Request permission to use push notifications
		// iOS will prompt user and return if they granted permission or not
		// Android will just grant without prompting
		PushNotifications.requestPermission().then( result => {
			if (result.granted) 
			{
				// Register with Apple / Google to receive push via APNS/FCM
				PushNotifications.register();
			} else {
				// Show some error
			}
		});

		// On success, we should be able to receive notifications
		PushNotifications.addListener('registration',
			(token: PushNotificationToken) => 
			{
				alert('Push registration success, token: ' + token.value);
				console.log('Push registration success, token: ' + token.value);
				
				this.api.store_token( token.value ).subscribe(data => 
				{			
					console.log(data);
				});
			}
		);

		// Some issue with our setup and push will not work
		PushNotifications.addListener('registrationError',
			(error: any) => {
				console.log('Error on registration: ' + JSON.stringify(error));
			}
		);

		// Show us the notification payload if the app is open on our device
		PushNotifications.addListener('pushNotificationReceived',
			(notification: PushNotification) => 
			{
				console.log('Push received: ' + JSON.stringify(notification));
			}
		);

		// Method called when tapping on a notification
		PushNotifications.addListener('pushNotificationActionPerformed',
			(notification: PushNotificationActionPerformed) => {
				console.log('Push action performed: ' + JSON.stringify(notification));
				
				const data = notification.notification.data;
				
				if (data.dproduct_id) 
				{
				  this.router.navigateByUrl(`/orderdetails/${data.detailsId}`);
				}
			}
		)
	} 
}