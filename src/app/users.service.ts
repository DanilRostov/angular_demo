import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(private http: Http) {}

  getUsers() {
    const url = 'https://randomuser.me/api?inc=gener,name,picture,location&results=8&nat=gb';
    return this.http.get(url)
      .pipe(map(res => res.json()))
      .pipe(map(res => res.results))
      .pipe(map(users => users.map(user => {
        return {
          name: `${user.name.first} ${user.name.last}`,
          image: user.picture.large,
          geo: `${user.location.city} ${user.location.street}`
        }
      })))
  }
}