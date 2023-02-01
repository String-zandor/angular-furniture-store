import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns: string[] = ['item','quantity', 'price'];
  dataSource: CartItem[] = []
  orderId: any
  deliveryFee: any
  subtotal: any
  orderTotal?: any
  orderStatus?: any
  deliveryInfo: any


  @Input() orderNo: any
  @Input() orders?: Order[]
  orders$?: Observable<Order[]>


  constructor(private route:ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    // this.orderService.getOrders(this.userId).subscribe(order => {
    //   order.filter(order => order.id === this.orderNo).forEach(item => {
    //     this.dataSource = item.cart
    //     this.orderTotal = item.total
    //     this.orderStatus = item.status
    //     this.subtotal = item.subtotal
    //     this.deliveryFee = item.deliveryfee
    //   })
    // })
 this.displayOrders()
  }

  displayOrders(){
    of(this.orders).subscribe(order => {
      order!.filter(order => order.id === this.orderNo).forEach(item => {
        this.dataSource = item.cart
        this.orderTotal = item.total
        this.orderStatus = item.status
        this.subtotal = item.subtotal
        this.deliveryFee = item.deliveryfee
        this.deliveryInfo = item.shipping
      })
    })
  }
  viewDeliveryInfo(name: string, phone: string, address: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Shipping Details',
      content: `Name:  ${name} \n Phone: ${phone} <br/> Address: ${address}`,
      confirm: 'Close',
      cancel: ''
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig)
  }
}
