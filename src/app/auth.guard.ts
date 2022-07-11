import { WordpressService } from '../services/wordpress.service';
import { Injectable } from "@angular/core";

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class AuthGuard implements CanActivate 
{
	constructor(private authService: WordpressService, private router: Router) {}
	
	canActivate(): boolean 
	{
		if ( ! this.authService.getCurrentUser() ) 
		{
			this.router.navigateByUrl( "/login" );
			return false;
		}
		
		return true;
	}
}
