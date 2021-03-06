import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert';
import { URL_SERVICES } from '../config/config';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {


  constructor(public http: HttpClient) { }

  getAll(skip: number, pageSize: number) {
    const url = URL_SERVICES + '/enrollment' +'?skip=' + skip + '&pageSize=' + pageSize;
    return this.http.get(url);
  }

  search(search: string) {
    const url = URL_SERVICES + '/enrollment/search/' + search ;
    return this.http.get(url);
  }

  obtain(id: string) {
    const url = URL_SERVICES + '/enrollment/' + id ;
    return this.http.get(url);
  }

  insert( enrollment: Enrollment, student: Student ) {

    const url = URL_SERVICES + '/enrollment' ;

    return this.http.post( url, enrollment )
      .pipe(map((resp: any) => {
        swal('Alumno matriculdo', 'El alumno ' +student.name + ' ' + student.lastName + ' se matriculó en el curso', 'success');
        return resp.enrollment;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));
  }

  update( enrollment: Enrollment ) {

    const url = URL_SERVICES + '/enrollment/' + enrollment._id ;

    return this.http.put( url, enrollment )
      .pipe(map((resp: any) => {
        swal('Alumno actualizado', enrollment.studentName + ' ' + enrollment.studentLastName, 'success');
        return resp.enrollment;
      }
      ))
      .pipe(catchError( (error) => {
        return throwError(error);
    }));

  }

  delete(id: string, unsubscribe: boolean ) {

    let text: string;
    if (unsubscribe) {
      text = 'Baja de Alumno';
    } else {
      text = 'Activación de Alumno';
    }

    const url = URL_SERVICES + '/enrollment/' + id + '/' + unsubscribe ;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal(text, 'Operación completada satisfactoriamente', 'success');
        return resp.enrollment;
      }
      ))
      .pipe(catchError( (error) => {
       return throwError(error);
   }));

  }


}
