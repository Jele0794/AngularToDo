import { Component, OnInit, ViewChildren, QueryList, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../models/task.model';
import { ConsumerService } from '../services/consumer.service';
import * as moment from 'moment';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material';
import { take } from '../../../node_modules/rxjs/operators';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

    public tasks: Task[] = [];
    public completedTasks: Task[] = [];
    public dueDates: moment.Moment[]  = [moment('07/20/18'), moment('07/21/18')];
    public newTaskControl: FormControl;

    @ViewChild('tasksOptions')
    private tasksOptions: MatSelectionList;

    @ViewChild('completedTasksOptions')
    private completedTasksOptions: MatSelectionList;
    
    constructor(private formBuilder: FormBuilder,
                private consumerService: ConsumerService) {
        this.newTaskControl = this.formBuilder.control('', [Validators.required]);
    }

    ngOnInit() {
        this.consumerService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks
            });
            

        // change completed tasks to its own list.
        this.tasksOptions.selectedOptions.onChange
            .subscribe(changed => {
                let changedTasks: Task[] = [];
                changed.added.forEach(selectedOption => {
                    let task = this.tasks.find(task => {
                        let label = selectedOption.getLabel().substring(0, selectedOption.getLabel().trim().lastIndexOf(' '));
                        return task.description === label;
                    });

                    task.isCompleted = true;
                    this.tasks.splice(this.tasks.indexOf(task), 1); // delete the task from tasks array.
                    this.tasksOptions._removeOptionFromList(selectedOption);
                    this.completedTasks.unshift(task);
                    changedTasks.push(task);
                });
                // TODO: update task on the back-end.
                // this.consumerService.updateTask(changedTasks)
                // .subscribe(
                //     () => {}
                // )
                // .unsubscribe();
            });
        // change deselected task to the main tasks list.
        this.completedTasksOptions.selectedOptions.onChange
            .subscribe(changed => {
                let changedTasks: Task[] = [];
                changed.removed.forEach(deselectedOption => {
                    let deselectedTask = this.completedTasks.find(task => task.description === deselectedOption.getLabel());
                    deselectedTask.isCompleted = false;
                    this.completedTasks.splice(this.completedTasks.indexOf(deselectedTask), 1) // delete the task from completed task array.
                    this.completedTasksOptions._removeOptionFromList(deselectedOption);
                    this.tasks.unshift(deselectedTask);
                    changedTasks.push(deselectedTask);
                });
                // TODO: update task on the back-end.
                // this.consumerService.updateTask(changedTasks)
                // .subscribe(
                //     () => {}
                // )
                // .unsubscribe();
            });
    }

    public createNewTask() {
        let newTask = new Task();
        newTask.id = -1 // represents that is a new task.
        newTask.description = this.newTaskControl.value;
        this.tasks.unshift(newTask);
        this.newTaskControl.setValue('') // clean the input.
        this.newTaskControl.markAsUntouched(); // prevents the input red line.
        // this.consumerService.createTask(newTask)
        //     .subscribe(tasks => this.tasks[0].id = newTask.id); // update the created task id.
    }

    public editTask(event: Event) {
        console.log(event);
    }
    
}
