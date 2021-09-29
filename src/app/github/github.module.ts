import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GithubRoutingModule } from './github-routing.module';
import { GithubUserComponent } from './github-user/github-user.component';
import { NgMaterialModule } from '../shared/ng-material.module';


@NgModule({
  declarations: [
    GithubUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GithubRoutingModule,
    NgMaterialModule
  ]
})
export class GithubModule { }
