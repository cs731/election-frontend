import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CastVoteComponent } from './components/cast-vote/cast-vote.component';

const routes: Routes = [
  {path: '', component: CastVoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
