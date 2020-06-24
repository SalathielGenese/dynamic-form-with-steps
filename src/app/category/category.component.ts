import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from './category';
import { StepAware } from '../step-aware';

@Component( {
  selector: 'app-category',
  templateUrl: './category.component.html',
} )
export class CategoryComponent implements StepAware
{
  @Output()
  public categoryChange = new EventEmitter<Category>();

  @Input()
  public category: Category;

  public Category = Category;

  public previousStep(): void
  {
  }
}
