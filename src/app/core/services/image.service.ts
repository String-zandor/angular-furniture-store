import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private storage: AngularFireStorage) { }

  uploadPhoto(filePath: string, photo: File): AngularFireUploadTask {
    return this.storage.upload(filePath, photo);
  }

  getPhotoURL(filePath: string): Observable<string> {
    return this.storage.ref(filePath).getDownloadURL() as Observable<string>;
  }

}
