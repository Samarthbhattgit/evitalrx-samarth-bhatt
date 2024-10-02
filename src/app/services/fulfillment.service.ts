import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FulfillmentService {

  /* common url -- **for url we also make use of environment file in our project** */
  baseUrl: string = "https://dev-api.evitalrx.in/v1/fulfillment";

  constructor(private http: HttpClient) { }

  /* get medicine list data */
  getMedicineList(bodyPayload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/medicines/search`, bodyPayload).pipe(
      tap((res)=> {
        if(!!res?.status_code) {
        } else {
          throw res?.status_message;
        }
      })
    ) as Observable<any>;
  }

  /* get details about selected medicine data */
  getMedicineDetails(bodyPayload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/medicines/view`, bodyPayload).pipe(
      tap((res)=> {
        if(!!res?.status_code) {
        } else {
          throw res?.status_message;
        }
      })
    ) as Observable<any>;
  }
}
