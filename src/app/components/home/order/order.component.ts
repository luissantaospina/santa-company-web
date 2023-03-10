import { Component, OnInit } from '@angular/core';
import { OrderService } from "./order.service";
import { Order } from "./order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  constructor(
    private orderService: OrderService
  ) { }

  orders: Array<Order> = []
  deleteModalActive: boolean = false
  createModalActive: boolean = false
  updateModalActive: boolean = false
  toastModalActive: boolean = false
  selectedOrder: any

  confirmDeletion(value: boolean) {
    if (value) this.deleteOrder(this.selectedOrder)
    this.deleteModalActive = false
  }

  confirmCreation() {
    this.getOrdersList()
    this.createModalActive = false
  }

  confirmUpdate() {
    this.getOrdersList()
    this.updateModalActive = false
  }

  deleteOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.getOrdersList()
      this.toastModalActive = true
    })
  }

  getOrdersList(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders
    })
  }

  ngOnInit(): void {
    this.getOrdersList()
  }
}
