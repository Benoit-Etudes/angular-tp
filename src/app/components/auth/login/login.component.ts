import { AuthService } from '@/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  isSubmitted: WritableSignal<boolean> = signal(false);

  private toastr: ToastrService = inject(ToastrService);

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: [
        "",
        Validators.required
      ],
      password: [
        "",
        Validators.required
      ]
    });
  }

  onSubmit(): void{
    this.isSubmitted.set(true);

    if(!this.loginForm.valid){
      this.loginForm.markAllAsTouched();
      console.log("Formulaire invalide, soumission bloquée !");
      return;
    }

    const {username, password} = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      {
        next: (res) => {
          this.toastr.success('Connexion réussie !', 'Succès');
        },
        error: (err) => {
          console.error("Login error :",err);
          this.toastr.error('Une erreur est survenue lors de la connexion.', 'Erreur de connexion');
        }
      }
    );
  }
}
