import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../category/category';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepAware } from '../step-aware';

@Component( {
  selector: 'app-profile',
  templateUrl: './profile.component.html',
} )
export class ProfileComponent implements StepAware, OnInit
{
  @Input()
  public category: Category;

  public Category = Category;

  public constructor( private fb: FormBuilder, public controlContainer: ControlContainer )
  {
  }

  public ngOnInit(): any
  {
    const form = this.controlContainer.control as FormGroup;

    switch ( this.category ) {
      case Category.PERSON:
        form.addControl( 'birthDate', this.fb.control( null, Validators.required ) );
        form.addControl( 'firstName', this.fb.control( null, Validators.required ) );
        form.addControl( 'lastName', this.fb.control( null, Validators.required ) );
        break;
      case Category.ORGANIZATION:
        form.addControl( 'registrationNumber', this.fb.control( null, Validators.required ) );
        form.addControl( 'name', this.fb.control( null, Validators.required ) );
        break;
    }
  }

  public previousStep(): void
  {
    const form = this.controlContainer.control as FormGroup;

    switch ( this.category ) {
      case Category.PERSON:
        form.removeControl( 'birthDate' );
        form.removeControl( 'firstName' );
        form.removeControl( 'lastName' );
        break;
      case Category.ORGANIZATION:
        form.removeControl( 'registrationNumber' );
        form.removeControl( 'name' );
        break;
    }
  }
}
