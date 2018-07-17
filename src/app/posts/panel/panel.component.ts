import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostsService } from '../posts.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  disable : Boolean = false;
  showComment : Boolean = false;
  @Input() post : any = {};
  @Input() index : number;
  @Output() del_index : EventEmitter<number> = new EventEmitter();

  likes : number = 0;
  likes_user : any = [];

  constructor(private _postsService : PostsService, private _cookieService: CookieService) { }

  ngOnInit() {
    this._postsService.getPost(this.post._id).subscribe((data:any) => {
      if(data) {
        this.likes_user = data.likes;
        this.likes = this.likes_user.length;
        if(this.likes_user.includes(this._cookieService.get('username'))) {
          this.disable = true;
        }
      }
    });
    this._postsService.$editObservable.subscribe((data) => {
      this.post = data;
    })
  }

  like() {
    this._postsService.addLike(this.post._id, this.likes_user).subscribe((data:any) => {
      if(data.liked) {
        this.likes = this.likes + 1;
        this.likes_user.push(this._cookieService.get('username'));
        this.disable = true;
      }
    })
  }

  comment() {
    this.showComment = !this.showComment;
  }

  delete(id) {
    this._postsService.deletePost(id).subscribe((data:any) => {
      if(data.flg) {
        alert("Post Deleted!");
        this.del_index.emit(this.index);
      }
    });
  }
}
