import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit{
  
  allProducts: string[] = ['id', 'srcUrl', 'name', 'category', 'color'];
  static getProduct: any;
  product: any;
  productSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() output?: Product;
  @Output() onAction = new EventEmitter<Product>();
  
 
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getProduct();
  }
  
  editProduct(){
       
  }
  

  removeProduct(){


  }

  addProduct(){

  }

  getProduct(){
    this.product.getProduct().subscribe({
      next: (data: any[]) => {
        this.productSource = new MatTableDataSource(data);
        this.productSource.sort = this.sort;
        this.productSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  
 
}

