import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  
  productForm: FormGroup = this.fb.group({
    id: [0],
    name: [''],
    category: [''],
    color: [''],
    description: this.fb.group({
      desc: [''],
      dimensions: [''],
      material: [''],
      weight: ['']
    }),
    price: [0]
  });

  selectedProd?: Product;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { 

  }
  
  ngOnInit(): void {
    const selectedId: number = Number(this.route.snapshot.paramMap.get('id'));
    if (selectedId) {
      this.productService.getProduct(selectedId).subscribe(product => {
        if (product) {
          this.selectedProd = product;
          this.updateForm(product);
        }
      });
    }
  }

  updateForm(product: Product) {
    this.productForm.patchValue(product);
  }

  onSubmit(): void {
    const product: Product = this.productForm.value;
    product.postingDate = JSON.stringify(new Date());
    console.log(product);

    if (this.selectedProd) {
      this.productService.editProduct(product).subscribe(product => {
        if (product) {
          // TEST
          console.log('successful edited product');
          this.router.navigate(['/admin/products']);
        }
      });
    } else {
      this.productService.addProduct(product).subscribe(product => {
        if (product) {
          // TEST
          console.log('successful add product');
          this.router.navigate(['/admin/products']);
        }
      });
    }

  }
  


}
