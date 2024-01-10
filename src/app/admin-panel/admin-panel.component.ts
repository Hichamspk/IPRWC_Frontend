import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ProductModel } from '../model/product.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  products: ProductModel[] = [];
  selectedProduct: ProductModel | null = null;
  productForm!: FormGroup;
  editing = false;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.initializeForm();
  }

  initializeForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      imageUrl: [''],
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => this.products = data,
      (error) => console.error(error)
    );
  }

  selectProduct(product: ProductModel): void {
    this.editing = true;
    this.productForm.patchValue(product);
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }
    const productData = this.productForm.value;
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

  updateProduct(product: ProductModel): void {
    const productId = this.selectedProduct?.id;
    if (!productId) {
      return;
    }
    this.productService.updateProduct(productId, product).subscribe(
      () => {
        this.loadProducts();
        this.productForm.reset();
        this.editing = false;
      },
      (error) => console.error(error)
    );
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => this.loadProducts(),
      (error) => console.error(error)
    );
  }
}
