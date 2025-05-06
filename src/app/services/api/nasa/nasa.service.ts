import { HttpClient } from "@angular/common/http";
import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import { Observable, tap } from "rxjs";
import {ToastrService} from 'ngx-toastr';
import {NasaApiResponseI} from '@/interfaces/api/nasa.interface';


@Injectable({
  providedIn: "root",
})
export class NasaService {
  private apiUrl: string = "https://api.nasa.gov";
  private authToken: string = "gtHgYnHxp7uUr9zxhzTcgANSbWI57CJRGGy75wA8"; // Replace with your actual NASA API key

  private http = inject(HttpClient);
  private toastr: ToastrService = inject(ToastrService);


  getToken(): string {
    return this.authToken;
  }

  getTodayImage(): Observable<NasaApiResponseI> {
    return this.http.get<NasaApiResponseI>(`${this.apiUrl}/planetary/apod?thumbs=true`).pipe(
      tap((response: NasaApiResponseI) => {
        if (response) {
          return response
        } else {
          this.toastr.error("Impossible de récupérer l'image du jour", "Erreur");
          throw new Error("Impossible de récupérer l'image du jour");
        }
      })
    );
  }
}
