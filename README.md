# Conference Room Booking

Aplicație Angular pentru rezervarea sălilor de conferință.
!!!Cont admin: email: admin@gmail.com parola: admin
## Funcționalități principale

- Autentificare cu email și parolă, token JWT pentru securitate  
- Roluri: USER (rezervă săli), ADMIN (administrează sălile)  
- Admin poate crea/edita/șterge săli cu locație (Google Maps), capacitate și facilități  
- Prevenire suprapunere rezervări și validare capacitate săli  
- Calendar și tabel pentru vizualizare disponibilitate săli  
- Filtrare după capacitate, facilități și dată  
- Export rezervări personale în CSV  

## Tehnologii

- Angular + Angular Material  
- JWT + HTTP Interceptor pentru autentificare  
- Google Maps API pentru locații
- FullCalendar pentru calendar și vizualizare programări
