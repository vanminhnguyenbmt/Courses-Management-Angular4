import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../models/course.model';
import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-course-add',
    templateUrl: './course-add.component.html',
    styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

    public course: Course;
    public subscription: Subscription;

    constructor(public courseService: CourseService, public routerService: Router) { }

    ngOnInit() {
        this.course = new Course();
    }

    ngOndestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onAddCourse() {
        this.subscription = this.courseService.addCourse(this.course).subscribe(data => {
            if (data && data.id) {
                this.routerService.navigate(['courses']);
            }
        });
    }
}
