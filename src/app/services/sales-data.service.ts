import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class SalesDataService {

  constructor(private _http: Http) { }

  getOrders(pageIndex: number, pageSize: number, order: string) {
    return this._http.get(environment.api + order + '/' + pageIndex + '/' + pageSize)
      .map(res => res.json());
  }

  getOrdersByCustomer(n: number, order: string) {
    return this._http.get(environment.api + order + '/bycustomer/' + n)
      .map(res => res.json());
  }

  getOrdersByState(order: string) {
    return this._http.get(environment.api + order + '/bystate/')
      .map(res => res.json());
  }
}
