import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ProductModel } from '../model/product.model';
import {Category} from "../model/Category";
import {CategoryService} from "../service/category-service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  categoryForm!: FormGroup;
  products: ProductModel[] = [];
  categories: Category[] = [];
  selectedProduct: ProductModel | null = null;
  productForm!: FormGroup;
  editing = false;
  selectedCategory: Category | null = null;
  categoryEditing = false;


  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,

) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.InitializeProductForm();
    this.initializeCategoryForm();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => this.categories = data,
      (error) => console.error(error)
    );
  }

  unselectProduct(): void {
    this.editing = false;
    this.productForm.reset();
    this.selectedProduct = null;
  }


  InitializeProductForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      imageUrl: [''],
      categoryId: [null, Validators.required]
    });
  }

  initializeCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => this.products = data,
      (error) => console.error(error)
    );
  }

  selectProduct(product: ProductModel): void {
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    this.editing = true;
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }
    const formData = this.productForm.value;
    const productData: ProductModel = {
      ...formData,
      category: { id: formData.categoryId }
    };
    if (this.editing) {
      this.updateProduct(productData);
    } else {
      this.addProduct(productData);
    }
  }



  addProduct(product: ProductModel): void {
    this.productService.addProduct(product).subscribe(
      () => {
        this.loadProducts();
        this.productForm.reset();
      },
      (error) => console.error(error)
    );
  }

  updateProduct(productData: ProductModel): void {
    if (this.selectedProduct && this.selectedProduct.id) {
      this.productService.updateProduct(this.selectedProduct.id, productData).subscribe(
          () => {
            this.loadProducts();
            this.productForm.reset();
            this.selectedProduct = null;
            this.editing = false;
          },
          error => console.error(error)
      );
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => this.loadProducts(),
      (error) => console.error(error)
    );
  }

  onAddCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }
    const newCategory: Category = this.categoryForm.value;
    this.categoryService.addCategory(newCategory).subscribe(
        (category) => {
          this.loadCategories(); // Refresh the category list
          this.categoryForm.reset();
        },
        (error) => {
          console.error('Error adding category:', error);
        }
    );
  }

  selectCategoryForEdit(category: Category): void {
    this.selectedCategory = category;
    this.categoryForm.patchValue(category);
    this.categoryEditing = true;
  }

  saveCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }
    const categoryData = this.categoryForm.value;
    if (this.selectedCategory && this.selectedCategory.id) {
      this.categoryService.updateCategory(this.selectedCategory.id, categoryData).subscribe(
          () => {
            this.loadCategories(); // Refresh the category list
            this.categoryForm.reset();
            this.selectedCategory = null;
            this.categoryEditing = false;
          },
          (error) => {
            console.error(error);
          }
      );
    } else {
    }
  }

}
