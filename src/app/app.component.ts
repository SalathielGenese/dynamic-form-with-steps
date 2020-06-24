import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Step, StepAware, StepEntry } from './step-aware';
import { Category } from './category/category';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { ProfileComponent } from './profile/profile.component';
import { ProofOfIdentityComponent } from './proof-of-identity/proof-of-identity.component';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
} )
export class AppComponent implements OnInit, StepAware, AfterViewInit
{
  @ViewChild( 'stepAnchor', { read: ViewContainerRef } )
  public stepAnchor: ViewContainerRef;

  public steps: StepEntry[] = [];

  public instance: StepAware;

  public canNextStep = false;

  public category: Category;

  public step: StepEntry;

  public form: FormGroup;

  // The template needs this
  public Step = Step;

  public constructor(
    private fb: FormBuilder,
    private cfr: ComponentFactoryResolver )
  {
  }

  public ngOnInit(): void
  {
    this.form = this.fb.group( {} );
    this.form.valueChanges.subscribe( () =>
      setTimeout( () => this.computeCanNextStep() ) );
    this.steps.push(
      { step: Step.CATEGORY, title: 'Category', component: CategoryComponent },
      { step: Step.PROFILE, title: 'Profile', component: ProfileComponent },
      { step: Step.PROOF, title: 'Proof', component: ProofOfIdentityComponent },
    );
    this.step = this.steps[ 0 ];
  }

  public ngAfterViewInit(): void
  {
    setTimeout( () => this.renderStep() );
  }

  public previousStep = () =>
  {
    this.step = this.steps[ this.steps.indexOf( this.step ) - 1 ];
    this.instance?.previousStep();
    this.renderStep();
  };

  public nextStep = () =>
  {
    if ( this.step.step === Step.PROOF ) {
      return this.submit();
    }

    this.step = this.steps[ this.steps.indexOf( this.step ) + 1 ];
    this.renderStep();
  };

  private submit()
  {
    const url = this.category === Category.PERSON ? '/person' : '/organization';
    alert( `POST ${ url }\n\n${ JSON.stringify( this.form.value, null, 4 ) }` );
  }

  private renderStep(): void
  {
    this.stepAnchor.clear();

    const factory = this.cfr.resolveComponentFactory( this.step.component );
    const component = this.stepAnchor.createComponent( factory );
    const { instance } = component;

    instance.categoryChange?.subscribe( value =>
    {
      this.category = value;
      this.computeCanNextStep();
    } );
    instance.category = this.category;
    this.instance = instance;
  }

  private computeCanNextStep()
  {
    this.canNextStep = this.form.valid && !!this.category;
  }
}
