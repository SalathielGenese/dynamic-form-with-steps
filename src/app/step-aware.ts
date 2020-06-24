import { EventEmitter, Type } from '@angular/core';
import { Category } from './category/category';

export interface StepAware
{
  categoryChange?: EventEmitter<Category>;

  previousStep(): void;

  category: Category;
}

export interface StepEntry
{
  component: Type<StepAware>;

  title: string;

  step: Step;
}

export enum Step
{
  CATEGORY,
  PROFILE,
  PROOF,
}
