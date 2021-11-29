import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseType } from './models/responseType';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  constructor(private http: HttpClient) {}
  public url: string = 'http://localhost:3000';

  autoCompleteItemName(keyword: any) {
    return new Promise((response, reject) => {
      this.http
        .get(`${this.url}/item/autocomplete_name?keyword=${keyword}&limit=5`)
        .subscribe((responseData: any) => {
          response(responseData.message);
          // let isError = this.checkForErr(
          //   responseData.status,
          //   responseData.message
          // );
          // if (isError) {
          //   reject('http request failed' + responseData.message);
          // } else {
          //   response(responseData.message);
          // }
        });
    });
  }

  addNewItem(itemName: String) {
    return new Promise((response, reject) => {
      this.http
        .post(`${this.url}/item/add_new`, { itemName: itemName })
        .subscribe((responseData: any) => {
          response(responseData.message);
          // let isError = this.checkForErr(
          //   responseData.status,
          //   responseData.message
          // );
          // if (isError) {
          //   reject('http request failed' + responseData.message);
          // } else {
          //   response(responseData.message);
          // }
        });
    });
  }
}
