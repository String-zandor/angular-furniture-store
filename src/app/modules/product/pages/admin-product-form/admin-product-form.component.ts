import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { distinct, from, map, Observable, Subscription, switchMap, toArray } from 'rxjs';
import { ImageService } from 'src/app/core/services/image.service';
import { DialogData } from 'src/app/shared/models/dialog-data';
import { DialogService } from 'src/app/shared/services/dialog.service';
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
    room: ['', Validators.required],
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
  allProducts$?: Observable<Product[]>;
  roomOptions$?: Observable<string[]>;
  categOptions$?: Observable<string[]>;

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
    private imgSvc: ImageService,
    public dialogSvc: DialogService,
    private snackBar: MatSnackBar) {

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
    this.allProducts$ = this.productSvc.getProducts();
    this.getRooms();
    this.getCategories();
  }

  getCategories(): void {
    this.categOptions$ = this.allProducts$?.pipe(
      map(products => products.map(product => product.category)),
      switchMap(categories => from(categories)),
      distinct(),
      toArray()
    );
  }

  getRooms(): void {
    this.roomOptions$ = this.allProducts$?.pipe(
      map(products => products.map(product => product.room)),
      switchMap(rooms => from(rooms)),
      distinct(),
      toArray()
    );
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
      const fileRef: string = `images/${photos[i].name}`;
      this.imgSvc.uploadPhoto(fileRef, photos[i]).then(() => {
        this.subscriptions.push(
          this.imgSvc.getPhotoURL(fileRef).subscribe(url => this.photosUrl.push(url))
        );
      });

    }
  }

  cancel(): void {
    const data: DialogData = {
      title: 'Confirm',
      content: 'Are you sure you want to exit the page without saving your changes?',
      confirm: 'Confirm',
      cancel: 'Cancel'
    }
    if (this.productForm.dirty) {
      this.dialogSvc.confirm(data).subscribe(confirmed => {
        if (confirmed) {
          this.location.back();
        }
      })
    } else {
      this.location.back();
    }
  }

  resetPhotos(): void {
    this.photosCtrl.reset();
    this.photosUrl = [];
  }

  updateProduct(): Product {
    const product: Product = this.productForm.value;
    product.postingDate = new Date().toJSON();
    if (this.photosUrl.length > 0) {
      product.srcUrl = this.photosUrl;
    }
    return product;
  }

  onSubmit(): void {
    const data: DialogData = {
      title: 'Confirm',
      content: (this.selectedProd)
        ? 'Would you like to save the changes to this product?'
        : 'Would you like to add this product?',
      confirm: 'Confirm',
      cancel: 'Cancel'
    };
    this.dialogSvc.confirm(data).subscribe(confirmed => {
      if (confirmed) {
        this.saveProduct();
        
      }
    });
  }

  saveProduct(): void {
    const product: Product = this.updateProduct();
    if (this.selectedProd) {
      this.productSvc.editProduct(product).subscribe(product => {
        if (product) {
          this.router.navigate(['/admin/products']);
          this.snackBar.open('Product updated.', '', { duration: 1000,
          });
        }
      });
    } else {
      this.productSvc.addProduct(product).subscribe(product => {
        if (product) {
          this.router.navigate(['/admin/products']);
          this.snackBar.open('Product added.', '', { duration: 1000,
          });
        }
      });
    }
  }

  get name(): FormControl {
    return this.productForm.get('name') as FormControl;
  }

  get room(): FormControl {
    return this.productForm.get('room') as FormControl;
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
