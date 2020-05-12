import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FirestoreProvider {

  constructor(public http: HttpClient) {
    console.log('Service Provider Firestore');
  }

}
