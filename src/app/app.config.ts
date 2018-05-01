
import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig {

    private config: Object = null;
   

    constructor(private http: Http) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

   
    /**
     * This method:
     *    Loads "config.json" to get all env's variables 
     */
    public load() {
        return new Promise((resolve, reject) => {
              
                let request:any = null;
                request = this.http.get('assets/config.json');

                if (request) {
                    request
                        .map( res => res.json() )
                        .catch((error: any) => {
                            console.error('Error reading  configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } 
                else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
           

        });
    }
}