import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable} from 'rxjs';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


@Injectable()
export class ServerService {

  // https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4

  constructor(private _http: Http) {
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Accept' : 'q=0.8;application/json;q=0.9'
    });

    this.options = new RequestOptions({ headers: this.headers });
  }

  options: RequestOptions;
  headers: Headers;

  getServers(): Observable<Server[]> {
    return this._http.get(environment.api + 'server')
    .map(res => res.json())
    .catch(this.handleError);
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  handleServerMessage(msg: ServerMessage): Observable<Response> {
    const url = environment.api + 'server/' + msg.id;
    return this._http.put(url, msg, this.options).map(res => res.json());
  }

}
