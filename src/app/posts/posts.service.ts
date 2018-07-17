import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  $editObservable : Subject<any> = new Subject();

  constructor(private _http : HttpClient, private _router : Router) { }

  create(post_details : any) {
    this._http.post('http://localhost:3000/create', post_details).subscribe((data:any) => {
      if(data.flg) {
        alert("Create post successfully!");
        this._router.navigate(['/posts'])
      }
    })
  }

  getposts() {
    return this._http.get('http://localhost:3000/getposts');
  }

  getPost(id:any) {
    return this._http.get(`http://localhost:3000/getpost?id=${id}`)
  }

  saveComment(id:any, comments:Array<string>) {
    return this._http.post(`http://localhost:3000/savecomments?id=${id}`, comments);
  }

  addLike(id:any, likes:Array<string>) {
    return this._http.post(`http://localhost:3000/addlike?id=${id}`, likes)
  }

  editPost(id:any, post:any) {
    this._http.post(`http://localhost:3000/editpost?id=${id}`, post).subscribe((data:any) => {
      if(data.flg) {
        alert("Post edited!!");
        // this.$editObservable.next(data,);
        this._http.get(`http://localhost:3000/getpost?id=${id}`).subscribe((data) => {
          this.$editObservable.next(data);
        })
      }
    })
  }

  deletePost(id:any) {
    return this._http.get(`http://localhost:3000/deletepost?id=${id}`)
  }
}
