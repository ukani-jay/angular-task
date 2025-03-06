import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private mockUsers = [
    { email: 'test@test.com', password: 'password123' }
  ];

  private mockItems = [
    { id: 1, name: 'Jay Ukani', description: 'Patient 1' },
    { id: 2, name: 'John Diago', description: 'Patient 2' },
    { id: 3, name: 'Elon Musk', description: 'Patient 3' }
  ];

  login(email: string, password: string): Observable<any> {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      return of({
        token: 'mock-jwt-token',
        user: { email: user.email }
      }).pipe(delay(1000));
    }
    
    return new Observable(subscriber => {
      subscriber.error({ message: 'Invalid credentials' });
    });
  }

  getItems(): Observable<any[]> {
    return of(this.mockItems).pipe(delay(1000));
  }
} 