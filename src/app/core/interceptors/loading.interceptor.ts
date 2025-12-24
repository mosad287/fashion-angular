import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService = inject(NgxSpinnerService);

  if (!req.url.includes('signup') && !req.url.includes('signin')) {
    _NgxSpinnerService.show('loading');
  }

  return next(req).pipe(
    finalize(() => {
      _NgxSpinnerService.hide('loading');
    })
  );
};
