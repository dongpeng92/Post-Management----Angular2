import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  post : any = {};

  constructor(private _activatedRoute : ActivatedRoute, private _postsService : PostsService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data) => {
      console.log(data.id);
      this._postsService.getPost(data.id).subscribe((data) => {
        console.log(data);
        this.post = data;
      })
    })
  }

  save() {
    this._postsService.editPost(this.post._id, this.post);
  }

}
