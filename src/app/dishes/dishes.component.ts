import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: any[];

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private modalService: NgbModal
    ) {
    const headers = { 'Authorization': `Token ${this.authService.tokenSubjectValue}` };
    this.http.get<any[]>('/api/dishes/', { headers }).subscribe(
      resp => { this.dishes = resp; },
      err => { console.log(err); }
    );
  }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;
  }
}
