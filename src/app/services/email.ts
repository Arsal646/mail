import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { concat, of, timer, Observable } from 'rxjs';
import { delay, map, mergeMap, scan, startWith, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  domain = '@tempmails.online';
  apiUrl = 'https://mailboxhub.fun/api'

  constructor(private http: HttpClient) { }

  generateEmail(username?: string): string {
    const prefix = username || Math.random().toString(36).substring(2, 10);
    return `${prefix}${this.domain}`;
  }

  // Simple API call that returns observable
  // fetchEmails(emailAddress: string) {
  //  // return this.http.get(`http://127.0.0.1:8000/api/fakeemails/?email=${emailAddress}`);
  //    return this.http.get(`https://mailboxhub.fun/api/fakeemails/?email=${emailAddress}`);
  // }

  fetchEmails(emailAddress: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}/fakeemails/?email=${emailAddress}`
    ).pipe(
      map(emails => emails.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
    );
  }

  // fetchEmails(): Observable<any[]> {
  //   const realEmails$ = this.http.get<any[]>('http://127.0.0.1:8000/api/fakeemails');

  //   // Emits every 5 seconds, 5 times
  //   const newEmails$ = timer(5000, 5000).pipe(
  //     take(5),
  //     map((i) => [
  //       {
  //         from: `sender${i + 1}@example.com`,
  //         subject: `Automated Email #${i + 1}`,
  //         date: new Date().toISOString(),
  //         read: false,
  //       },
  //     ])
  //   );

  //   // Combine real emails first, then stream new emails every 5s
  //   return concat(realEmails$, newEmails$);
  // }




  // src/app/services/email.ts - Add these methods


  
  saveEmailToBackend(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-email`, { email });
  }

  getSavedEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/saved/${token}`);
  }

  checkIfSaved(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/check-saved`, { email });
  }

}