import * as moment from 'moment';

export class Task {
    id: number;
    description: string;
    dueDate?: moment.Moment;
    isCompleted: boolean;
}
