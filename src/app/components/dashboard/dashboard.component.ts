import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private router = inject(Router);

  viewCharacters(): void{
    this.router.navigateByUrl("characters");
  }

  viewEpisodes(): void{
    this.router.navigateByUrl("episodes");
  }


}
