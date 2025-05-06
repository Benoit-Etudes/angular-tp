import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import {NasaApodService} from '@/services/nasa-apod.service';
import {NasaApiResponseI} from '@/interfaces/api/nasa.interface';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-nasa-apod',
  imports: [
    DatePipe
  ],
  templateUrl: './nasa-apod.component.html',
  styleUrl: './nasa-apod.component.css'
})
export class NasaApodComponent implements OnInit {
  private nasaApodService = inject(NasaApodService);
  private router = inject(Router);

  apod: WritableSignal<NasaApiResponseI | null> = this.nasaApodService.apod;

  ngOnInit(): void {
    this.apod.set(this.nasaApodService.getApod());
  }
}
