import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { Category } from "./Category";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  dropdownOpen: boolean = false;
  selectedCategories: number[] = []; // For tracking selected categories

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data; // Initially show all products
    });
    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryChange(categoryId: number, isChecked: boolean): void {
    if (isChecked) {
      // Add category to selected categories
      this.selectedCategories.push(categoryId);
    } else {
      // Remove category from selected categories
      const index = this.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedCategories.length > 0) {
      // Filter products based on selected categories
      this.filteredProducts = this.products.filter(product =>
        this.selectedCategories.includes(product.category.id));
    } else {
      // If no categories are selected, show all products
      this.filteredProducts = this.products;
    }
  }
}
