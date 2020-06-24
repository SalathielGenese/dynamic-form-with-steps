import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category/category';
import { StepAware } from '../step-aware';

@Component( {
  selector: 'app-proof-of-identity',
  templateUrl: './proof-of-identity.component.html',
} )
export class ProofOfIdentityComponent implements StepAware, OnInit
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
        form.addControl( 'nationalIdentityCard', this.fb.control( null, Validators.required ) );
        break;
      case Category.ORGANIZATION:
        form.addControl( 'registrationCertificate', this.fb.control( null, Validators.required ) );
        break;
    }
  }

  public previousStep(): any
  {
    const form = this.controlContainer.control as FormGroup;

    switch ( this.category ) {
      case Category.PERSON:
        form.removeControl( 'nationalIdentityCard' );
        break;
      case Category.ORGANIZATION:
        form.removeControl( 'registrationCertificate' );
        break;
    }
  }
}
