import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CastVoteComponent } from './components/cast-vote/cast-vote.component';
import { SuccessfulVoteComponent } from './components/successful-vote/successful-vote.component';
import { FailedVoteComponent } from './components/failed-vote/failed-vote.component';

const routes: Routes = [
  {path: '', component: CastVoteComponent},
  {path: 'success', component: SuccessfulVoteComponent},
  {path: 'fail', component: FailedVoteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
