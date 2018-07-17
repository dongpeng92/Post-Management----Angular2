import {Component, Input, OnInit} from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any = [];

  constructor(private _postsService : PostsService) { }

  ngOnInit() {
    this._postsService.getposts().subscribe((data:any) => {
      console.log(data);
      this.posts = data;
    });
  }

  delete(data) {
    console.log(data);
    this.posts.splice(data,1);
  }

  trackByFn(index, item) {
    return index;
  }

}
