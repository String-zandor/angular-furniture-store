import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  
  photosCtrl: FormControl = new FormControl();
  productForm: FormGroup = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    category: ['', Validators.required],
    color: ['', Validators.required],
    description: this.fb.group({
      desc: [''],
      dimensions: [''],
      material: [''],
      weight: ['']
    }),
    price: [0, Validators.min(1)]
  });

  selectedProd?: Product;
  photosUrl: string[] = [];

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
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

  onFilesSelect(event: any): void {
    const photos: FileList = event.target.files;

    if (photos.length < 1) {
      this.photosUrl = [];
      return;
    } 

    // for implementation with Firebase Cloud
    for (let i = 0; i < photos.length; i++) {
      this.photosUrl.push(photos[i].name);
    }
  }

  cancel(): void {
    this.location.back();
  }

  resetPhotos(): void {
    this.photosCtrl.reset();
    this.photosUrl = [];
  }

  updateProduct(): Product {
    const product: Product = this.productForm.value;
    product.postingDate = new Date().toJSON();
    product.srcUrl = this.photosUrl;
    product.postingDate = new Date().toJSON();
    return product;
  }

  onSubmit(): void {
    const product: Product = this.updateProduct();

    if (this.selectedProd) {
      this.productService.editProduct(product).subscribe(product => {
        if (product) {
          this.router.navigate(['/admin/products']);
        }
      });
    } else {
      this.productService.addProduct(product).subscribe(product => {
        if (product) {
          this.router.navigate(['/admin/products']);
        }
      });
    }
  }
  
  get name(): FormControl {
    return this.productForm.get('name') as FormControl;
  }

  get category(): FormControl {
    return this.productForm.get('category') as FormControl;
  }

  get color(): FormControl {
    return this.productForm.get('color') as FormControl;
  }

  get price(): FormControl {
    return this.productForm.get('price') as FormControl;
  }

}
