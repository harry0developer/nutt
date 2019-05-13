import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserData } from '../../models/userData';
import { AuthProvider } from '../auth/auth';
import { COLLECTION } from '../../utils/consts';
import * as moment from 'moment'


@Injectable()
export class DataProvider {
  collectionName: any;
  dataCollection: AngularFirestoreCollection<User>;
  data$: Observable<User[]>;

  profile: User;
  KM: number = 1.60934;

  private userDataSubject = new BehaviorSubject<UserData>(null);
  userData$ = this.userDataSubject.asObservable();
  userData: UserData = new UserData();

  constructor(
    public afStore: AngularFirestore,
    public afAuth: AngularFirestore,
    private authProvider: AuthProvider) {
    this.profile = this.authProvider.getStoredUser();

    if (this.profile) {

      let type = '';

      this.getUsers().subscribe(users => {
        this.userData.setUsers(users);
        this.updateUserData(this.userData);
      });
    }
  }

  updateUserData(userData: UserData) {
    this.userData = new UserData(userData);
    this.userDataSubject.next(userData);
  }


  getMappedCandidates(users, toBeMappedUsers): User[] {
    const candidates: User[] = [];
    users.map(user => {
      toBeMappedUsers.map(mUser => {
        if (user.uid === mUser.uid) {
          candidates.push(user);
        }
      });
    });
    return candidates;
  }

  getMappedRecruiters(users, toBeMappedUsers): User[] {
    const recruiters: User[] = [];
    users.map(user => {
      toBeMappedUsers.map(mUser => {
        if (user.uid === mUser.rid) {
          recruiters.push(user);
        }
      });
    });
    return recruiters;
  }


  removeDuplicates(array, key: string) {
    return array.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
    });
  }

  getUsers(): Observable<User[]> {
    return this.getAllFromCollection(COLLECTION.users);
  }
  getUserById(id): Observable<User> {
    return this.getItemById(COLLECTION.users, id);
  }


  getAllFromCollection(collectionName: string): Observable<any> {
    return this.afStore.collection<User>(collectionName).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMyCollection(collectionName: string, uid: string): Observable<any> {
    return this.afStore.collection<any>(collectionName, !!uid ? ref => ref.where('uid', '==', uid) : null).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCollectionByKeyValuePair(collectionName: string, key: string, value: string): Observable<any> {
    return this.afStore.collection<any>(collectionName, ref => ref.where(key, '==', value)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getItemById(collectionName: string, id: string) {
    return this.afStore.collection(collectionName).doc<any>(id).valueChanges();
  }

  updateItem(collectionName: string, data: User, id: string) {
    return this.afStore.collection(collectionName).doc<any>(id).set(data, { merge: true });
  }

  addNewItem(collectionName: string, data: User) {
    return this.afStore.collection(collectionName).add(data);
  }

  removeItem(collectionName: string, id: string) {
    return this.afStore.collection(collectionName).doc<any>(id).delete();
  }

  findItemById(id: string) {
    return this.getItemById(COLLECTION.users, id);
  }


  getProfilePicture(profile): string {
    return `assets/imgs/users/${profile.gender}.svg`;
  }

  getSettings() {
    return {};
  }

  applyHaversine(jobs, lat, lng) {
    if (jobs && lat && lng) {
      let usersLocation = {
        lat: lat,
        lng: lng
      };
      jobs.map((job) => {
        let placeLocation = {
          lat: job.location.latitude,
          lng: job.location.longitude
        };
        job.distance = this.getDistanceBetweenPoints(
          usersLocation,
          placeLocation,
          'miles'
        ).toFixed(0);
      });
      return jobs;
    } else {
      return jobs;
    }
  }

  getDistanceBetweenPoints(start, end, units) {
    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d * this.KM; //convert miles to km
  }

  toRad(x) {
    return x * Math.PI / 180;
  }

  /*  DATE FUNCTIONS */

  getAgeFromDate(date: string): string {
    return moment(date, "YYYY/MM/DD").month(0).from(moment().month(0)).split(" ")[0];
  }

  getNowDate(): string {
    return moment().format("YYYY/MM/DD");
  }

  getLocationFromGeo(geo) {
    const myLocation = {
      lat: -25.850187,
      lng: 28.998042
    };
    return this.getDistanceBetweenPoints(myLocation, geo, 'miles').toFixed(0);;
  }

}
