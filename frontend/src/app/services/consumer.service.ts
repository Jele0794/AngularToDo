import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Task } from '../models/task.model';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { isArray } from 'util';
// import 'rxjs/add/observable/throw';

@Injectable({
    providedIn: 'root'
})
export class ConsumerService {
    private baseUrl: string = 'http://localhost:4200/assets';
    constructor(private http: HttpClient) {}

    // get methods.

    /**
     * Validate that dueDate and labels exist to then add them to an http
     * parameter. Finally return the get method.
     *
     * @param dueDate Due date parameter to filter the results.
     * @param labels Labels parameter to filter the results.
     */
    public getTasks(dueDate?: moment.Moment, labels?: string | Array<string>): Observable<Task[]> {
        let uri = '/tasks.json';
        let params: HttpParams = new HttpParams()
        if (dueDate) {
            params.append('dueDate', dueDate.format('MM/DD/YYYY'));
        }
        if (labels) {
            labels = isArray(labels) ? 
                (labels.length > 1 ? (<Array<string>>labels).reduce((label, current) => current.concat(',', label)) : labels[0])
                : labels;

            params.append('labels', <string>labels);
        }
        
        return this.getMethod<Task>(uri, params);
    }

    // post methods.

    /**
     * Call the post method to create a new task.
     *
     * @param task New task.
     */
    public createTask(task: Task) {
        let uri = '/createTask';
        return this.postMethod<Task>(uri, task);
    }

    // put methods.
    
    /**
     * Call the put method to update the current task.
     * @param task Updated task.
     */
    public updateTask(task: Task | Task[]): Observable<Task[]> {
        let uri = '/updateTask';
        return this.putMethod<Task>(uri, task);
    }

    private getMethod<T>(uri: string, httpParams: HttpParams): Observable<T[]> {
        return this.http
            .get<T[]>(this.baseUrl + uri, {responseType: 'json', params: httpParams})
            .pipe(
                catchError(error => this.handleError(error))
            );
    }

    private postMethod<T>(uri: string, data: T[] | T): Observable<T[]> {
        data = !isArray(data) ? [(<T>data)] : data;
        return this.http
            .post<T[]>(this.baseUrl + uri, data, {responseType: 'json'})
            .pipe(
                catchError(error => this.handleError(error))
            );
    }

    private putMethod<T>(uri: string, data: T[] | T): Observable<T[]> {
        data = !isArray(data) ? [(<T>data)] : data;
        return this.http
            .put<T[]>(this.baseUrl + uri, data, {responseType: 'json'})
            .pipe(
                catchError(error => this.handleError(error))
            );
    }

    private deleteMethod<T>(uri: string, data: T[] | T): Observable<T[]> {
        return this.http
            .delete<T[]>(this.baseUrl = uri)
    }

    private handleError(errorResponse: HttpErrorResponse) {
        console.log(errorResponse);
        return throwError(errorResponse.error || 'Server error');
    }

}
