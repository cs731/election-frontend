import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  userid: string;
  password: string;
  option: string;
  constructor() { }
}
