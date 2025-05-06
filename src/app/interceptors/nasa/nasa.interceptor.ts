import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import {NasaService} from '@/services/api/nasa/nasa.service';


export const NasaInterceptor: HttpInterceptorFn = (req, next) => {
  const nasaService = inject(NasaService);
  const authToken = nasaService.getToken();

  console.log("APOD Interceptor :", req.url);

  if (!req.url.includes("api.nasa.gov")) return next(req);

  if(authToken) {
    const authReq = req.clone({
      url: req.url + `&api_key=${authToken}`
    });
    console.log("APOD Interceptor with token :", authReq.url);
    return next(authReq);
  }

  return next(req);
};
