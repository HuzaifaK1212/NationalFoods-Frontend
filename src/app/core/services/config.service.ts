import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trademark, TrademarkComment } from './models/trademark.model';
import { BrandProtection } from './models/brand-protection.model';

@Injectable({
    providedIn: 'root',
})

export class ConfigService {
    endpoint = 'http://localhost:5001/api';
    constructor(private httpClient: HttpClient) { }
    httpHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    getTrademarks(): Observable<Trademark> {
        return this.httpClient
            .get<Trademark>(this.endpoint + '/trademark/all')
            .pipe(retry(1), catchError(this.processError));
    }

    getTrademarksViaId(id: number): Observable<Trademark> {
        return this.httpClient
            .get<Trademark>(this.endpoint + '/trademark/' + id)
            .pipe(retry(1), catchError(this.processError));
    }

    addTrademark(data: any): Observable<Trademark> {
        let body = {
            TitleOfArtwork: data.titleOfArtwork,
            RegistrationNo: data.registrationNo,
            DateOfApplication: data.dateOfApplication,
            NameOfApplicant: data.nameOfApplicant,
            DateOfExpiry: data.dateOfExpiry,
            NotifyDaysBeforeExpiry: data.notifyDaysBeforeExpiry
        };

        return this.httpClient
            .post<Trademark>(
                this.endpoint + '/trademark/add',
                body,
                this.httpHeader
            )
            .pipe(retry(1), catchError(this.processError));
    }

    updateTrademark(data: any): Observable<Trademark> {
        let body = {
            Id: data.id || 0,
            TitleOfArtwork: data.titleOfArtwork || null,
            RegistrationNo: data.registrationNo || null,
            DateOfApplication: data.dateOfApplication || null,
            NameOfApplicant: data.nameOfApplicant || null,
            DateOfExpiry: data.dateOfExpiry || null,
            NotifyDaysBeforeExpiry: data.notifyDaysBeforeExpiry || null
        }

        return this.httpClient
            .put<Trademark>(
                this.endpoint + '/trademark/update',
                body,
                this.httpHeader
            )
            .pipe(retry(1), catchError(this.processError));
    }

    deleteTrademark(id: number): Observable<number> {
        return this.httpClient
            .delete<number>(
                this.endpoint + '/trademark/delete/' + id,
                this.httpHeader
            )
            .pipe(retry(1), catchError(this.processError));
    }

    addTrademarkComment(data: any): Observable<TrademarkComment> {
        let body = {
            Text: data.text,
            UserName: data.userName,
            TrademarkId: data.trademarkId
        };

        return this.httpClient
            .post<TrademarkComment>(
                this.endpoint + '/trademark/comment/add',
                body,
                this.httpHeader
            )
            .pipe(retry(1), catchError(this.processError));
    }

    // brand protection 

    getBrandProtections(): Observable<BrandProtection> {
        return this.httpClient
            .get<BrandProtection>(this.endpoint + '/brand-protection/all')
            .pipe(retry(1), catchError(this.processError));
    }

    getBrandProtectionViaId(id: number): Observable<BrandProtection> {
        return this.httpClient
            .get<BrandProtection>(this.endpoint + '/brand-protection/' + id)
            .pipe(retry(1), catchError(this.processError));
    }

    addBrandProtection(data: any): Observable<BrandProtection> {
        let body = {
            Name: data.name || null,
            Year: data.year || null,
            City: data.city || null,
            Brief: data.brief || null
        };

        return this.httpClient
            .post<BrandProtection>(
                this.endpoint + '/brand-protection/add',
                body,
                this.httpHeader
            )
            .pipe(retry(1), catchError(this.processError));
    }

    updateBrandProtection(data: any): Observable<BrandProtection> {
        let body = {
            Id: data.id || 0,
            Name: data.name || null,
            Year: data.year || null,
            City: data.city || null,
            Brief: data.brief || null
        };

        return this.httpClient
            .put<BrandProtection>(
                this.endpoint + '/brand-protection/update',
                body,
                this.httpHeader
            )
            .pipe(retry(1), catchError(this.processError));
    }

    deleteBrandProtection(id: number): Observable<number> {
        return this.httpClient
            .delete<number>(
                this.endpoint + '/brand-protection/delete/' + id,
                this.httpHeader
            )
            .pipe(retry(1), catchError(this.processError));
    }

    addBrandProtectionProgress(data: any): Observable<BrandProtection> {
        let body = {
            Text: data.text,
            UserName: data.userName,
            BrandProtectionId: data.brandProtectionId
        };

        return this.httpClient
            .post<BrandProtection>(
                this.endpoint + '/brand-protection/progress/add',
                body,
                this.httpHeader
            )
            .pipe(retry(1), catchError(this.processError));
    }

    processError(err: any) {
        let message = '';
        if (err.error instanceof ErrorEvent) {
            message = err.error.message;
        } else {
            message = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        console.log(message);
        return throwError(() => {
            message;
        });
    }
}