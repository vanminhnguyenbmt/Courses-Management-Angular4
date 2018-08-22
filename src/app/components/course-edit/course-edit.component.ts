import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../models/course.model';
import { Subscription } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-course-edit',
    templateUrl: './course-edit.component.html',
    styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

    public course: Course;
    public subscription: Subscription;
    public subscriptionParams: Subscription;

    constructor(public courseService: CourseService,
        public routerService: Router,
        public activatedRouteService: ActivatedRoute
    ) { }
    ngOnInit() {
        this.course = new Course();
        this.loadData();
    }

    ngOndestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscriptionParams) {
            this.subscriptionParams.unsubscribe();
        }
    }

    onEditCourse() {
        this.subscription = this.courseService.updateCourse(this.course).subscribe((data: Course) => {
            this.routerService.navigateByUrl('courses');
        });
    }

    loadData() {
        this.subscriptionParams = this.activatedRouteService.params.subscribe(data => {
            this.subscription = this.courseService.getCourse(data['id']).subscribe(course => {
                this.course = course;
            });
        });
    }
}
