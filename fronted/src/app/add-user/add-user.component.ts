import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  userId: any;

  


  // get id() {
  //   return this.userForm.get('id');
  // }


  alphaOnly(event: any): void {
    let patt = /^[a-zA-Z]+$/;
    if (!patt.test(event.key)) {
      event.preventDefault();
    }
  }

  numericOnly(event: any) {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }


  constructor(private formBuilder: FormBuilder, private router: Router, private apiserviceService: ApiserviceService,private httpClient: HttpClient,  private activatedroute:ActivatedRoute) {
    this.userForm = this.formBuilder.group({
      id: ['', [Validators.required,]],
      name: ['',[ Validators.required]],
      sal: ['', Validators.required],
      age: ['',  [Validators.required]],
      img: ['',  [Validators.required]],
     
    });
  }


  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.userId = params['userId'];
      if (this.userId) {
        this.getUserById(this.userId);
      }
    });
  }

  getUserById(userId: string): void {
    this.apiserviceService.getUserById(userId).subscribe((response: any) => {
      this.userForm.patchValue(response); 
    });
  }



  // submitForm(){
  //   if (this.userForm.invalid) {
  //     return;
  //   }
  //   const userData = this.userForm.value;
  //   console.log('Student Information:', userData);
  //   this.apiserviceService.postuser(userData).subscribe(
  //     (response: any) => {
  //       console.log()
  //       console.log('API Response:', response);
  //       alert("User Saved Successfully!!")
  //     },
  //     (error: any) => {
  //       console.error('API Error:', error);
  //     }
  //   );
  // }

  submitForm(): void {
    if (this.userForm.invalid) {
      return;
    }
  
    const userData = this.userForm.value;
    if (this.userId) {
      // Update existing user
      this.apiserviceService.updateUser(this.userId, userData).subscribe(
        () => {
          console.log('Employee updated successfully');
          alert('Employee updated successfully');
          this.router.navigate(['/viewUserList']); 
        },
        (error: any) => {
          console.error('Error updating user:', error);
          alert('Error updating user');
        }
      );
    } else {

      // Add new user
      this.apiserviceService.postuser(userData).subscribe(
        () => {

          console.log('Employee added successfully');
          alert('Employee added successfully');
         this.router.navigate(['/viewUserList']); 
        },
        (error: any) => {
          console.error('Error adding user:', error);
          alert('Error adding user');
          
        }
      );
    }
  }
  
  get id() { return this.userForm.get('id'); }
  get name() { return this.userForm.get('name'); }
  
}
