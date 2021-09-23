import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GithubRoutingModule } from './github-routing.module';
import { GithubUserComponent } from './github-user/github-user.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    GithubUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GithubRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatBadgeModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule, 
  ]
})
export class GithubModule { }
