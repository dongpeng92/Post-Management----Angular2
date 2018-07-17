import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments : any = [];
  @Input() id : any;
  add_comment : string;

  constructor(private _postsService : PostsService) { }

  ngOnInit() {
    this._postsService.getPost(this.id).subscribe((data:any) => {
      console.log(data.comments);
      if(data) {
        this.comments = data.comments;
      }
    })
  }

  saveComment() {
    console.log(this.add_comment);
    this.comments.push(this.add_comment);
    console.log(this.comments);
    this._postsService.saveComment(this.id, this.comments).subscribe((data:any) => {
      if(data.flg) {
        alert("Comment Saved!");
      }
    })
  }

}
