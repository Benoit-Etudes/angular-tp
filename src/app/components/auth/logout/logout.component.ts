import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '@/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.logout();
  }
}
