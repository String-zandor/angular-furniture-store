import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  allProducts$?: Observable<Product[]>;

  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {
    this.allProducts$ = this.productSvc.allProducts$;
    this.productSvc.getProducts().subscribe();
  }

}
