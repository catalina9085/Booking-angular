import {AfterViewInit, Component, effect, signal, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AdminService} from '../services/admin.service';
import {Group} from '../../rooms/domain/group.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort,MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-group-form',
  imports: [
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  file=signal<File|null>(null);
  groups=signal<Group[]>([]);

  readonly columns = ['name','size'];
  readonly dataSource = new MatTableDataSource<Group>();

  constructor(private adminService:AdminService) {
    this.updateGroups();
    effect(() => {
      this.dataSource.data = this.groups();
    });
  }

  updateGroups(){
    this.adminService.getGroups().subscribe(groups => this.groups.set(groups));
  }

  onSubmit(groupForm: NgForm) {
    if(groupForm.valid && this.file()){
      let formData = new FormData();
      formData.append('file',this.file()!);
      this.adminService.addNewGroup(formData).subscribe(_=>{
        this.updateGroups();
        groupForm.resetForm();
        this.file.set(null);
      });
    }
  }

  fileChanged($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file.set(input.files[0]);
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
