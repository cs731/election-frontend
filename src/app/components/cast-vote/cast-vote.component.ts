import { Component, OnInit } from '@angular/core';
import { StatusService} from '../../services/status.service';
import { HttpClient } from '@angular/common/http';
import * as sha256 from 'sha256';
import * as iziToast from 'izitoast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.scss']
})
export class CastVoteComponent implements OnInit {
  userid: string;
  password: string;
  step = 0;
  opt1;
  opt2;
  constructor(private status: StatusService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  takeUandP() {
    this.status.userid = this.userid;
    this.status.password = this.password;
    this.step++;
  }
  castVote() {
    const salt = this.makesalt(64);
    this.http.post('/api/cast-vote', {
      userid: this.userid,
      password: this.password,
      rhash: sha256(this.userid + this.password + salt),
      option: this.opt1 + this.opt2
    }, {})
    .toPromise()
    .then((res: any) => {
      return this.downloadFile(
        JSON.stringify({
          username: this.userid,
          password: this.password,
          options: this.opt1 + this.opt2,
          salt,
          signature: res.signature
        }, null, '\t')
      );
    }).then(blob => {
      iziToast.default.success({
        title: 'Success',
        message: 'You vote was cast successfully. Collect the receipt. Expect to see your vote on blockchain within 30 minutes',
        overlay: true,
        position: 'center'
      });
      const a = document.createElement('a') ;
      const blobURL = URL.createObjectURL(blob);
      a.download = `vote-receipt.json`;
      a.href = blobURL;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.router.navigate(['success']);
    });
  }

  makesalt(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'text/csv',  });
    return Promise.resolve(blob);
  }
}
