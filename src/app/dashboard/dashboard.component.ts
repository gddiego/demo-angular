import {Component} from '@angular/core';
import {DataService} from '../data/data.service';
import {Post} from '../Post';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(public dialog: MatDialog, private dataService: DataService) {}

  displayedColumns = ['date_posted', 'title', 'body', 'category', 'delete'];
  dataSource = new PostDataSource(this.dataService);
  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Adiconar Registro',
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      console.log(result);
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }
  deletePost(id: number) {
    this.dataService.deletePost(id);
    this.dataSource = new PostDataSource(this.dataService);
  }
  viewPost(id: number) {
    this.dataService.viewPost(id);
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }
  
}
