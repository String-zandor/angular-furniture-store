import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, flatMap, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { ImageService } from 'src/app/core/services/image.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit, OnDestroy {

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
  photos?: FileList;
  photosUrl: string[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private productSvc: ProductService,
    private imgSvc: ImageService) {

  }

  ngOnInit(): void {
    const selectedId: number = Number(this.route.snapshot.paramMap.get('id'));
    if (selectedId) {
      this.productSvc.getProduct(selectedId).subscribe(product => {
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
    const photos = event.target.files;

    if (photos.length < 1) {
      this.photosUrl = [];
    }

    for (let i = 0; i < photos.length; i++) {
      const fileRef: string = `images/${photos[i]}`;
      this.imgSvc.uploadPhoto(fileRef, photos[i]).then(() => {
        this.subscriptions.push(
          this.imgSvc.getPhotoURL(fileRef).subscribe(url => this.photosUrl.push(url))
        );
      });

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
    return product;
  }

  onSubmit(): void {
    const product: Product = this.updateProduct();
    if (this.selectedProd) {
      this.productSvc.editProduct(product).subscribe(product => {
        if (product) {
          this.router.navigate(['/admin/products']);
        }
      });
    } else {
      this.productSvc.addProduct(product).subscribe(product => {
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

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}
