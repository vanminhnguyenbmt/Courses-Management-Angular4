import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from '../../models/course.model';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

    public subscription: Subscription;
    public courses: Course[] = [];

    constructor(public courseService: CourseService) { }

    ngOnInit() {
        this.courseService.getAllCourses().subscribe(data => {
            this.courses = data;
        });
    }

    ngOndestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
