import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ProductModel } from '../model/product.model';
import { Category } from "../model/Category";
import {CategoryService} from "../service/category-service"
import {ShoppingCartService} from "../service/shopping-cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  categories: Category[] = [];
  selectedCategories: number[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data; // Initially show all products
    });
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryChange(categoryId: number, isChecked: boolean): void {
    if (isChecked) {
      this.selectedCategories.push(categoryId);
    } else {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredProducts = this.selectedCategories.length > 0
      ? this.products.filter(product => this.selectedCategories.includes(product.category.id))
      : this.products;
  }

  addToCart(product: ProductModel): void {
    this.shoppingCartService.addToCart(product);
  }
}
