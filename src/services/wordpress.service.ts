import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { environment } from '../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
 
const JWT_KEY = 'StilesMuncheez1!';
 
@Injectable({
  providedIn: 'root'
})

export class WordpressService 
{
	private user = new BehaviorSubject(null);
 
	constructor(private http: HttpClient, private storage: Storage, private plt: Platform) 
	{
		this.plt.ready().then(() => {
		  this.storage.get(JWT_KEY).then(data => {
			if (data) {
			  this.user.next(data);
			}
		  })
		})
	}
 
	signIn(username, password) 
	{
		let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
	
		return this.http.post(`${environment.wordpressUrl}/jwt-auth/v1/token`, { username, password } , { headers: headers } ).pipe(
		  switchMap(data => 
		  {
				console.log( 'data: ' + data );
				return from(this.storage.set(JWT_KEY, data));
		  }),
		  tap(data => {
			this.user.next(data);
		  })
		);
	}
 
	resetPassword(usernameOrEmail) 
	{
		return this.http.post(`${environment.wordpressUrl}/wp/v2/users/lostpassword`, { user_login: usernameOrEmail });
	}
 
	getCurrentUser() 
	{
		return this.user.asObservable();
	}
 
	getUserValue() 
	{
		return this.user.getValue();
	}
 
	logout() 
	{
		this.storage.remove(JWT_KEY).then(() => {
		  this.user.next(null);
		});
	}
}
