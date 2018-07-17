import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  postForm : FormGroup;

  constructor(private _fb : FormBuilder, private _postsService : PostsService) { }

  ngOnInit() {
    this.postForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
    })
  }

  create() {
    console.log(this.postForm.value);
    this._postsService.create(this.postForm.value);
  }

}
