# ITI-EVENT-SYSTEM-TASK

## Task for event system with following specifications

You will build small event System that manages events on ITI with speakers and students, the
system will have administrator, Speakers (added by admin) and Student should register first
on the system.
Users Roles: administrator , Speaker and Student
Authentication Router
a-/login  Login route for all Users
b-/registerStudent  Student register
Speaker Router
a- /speakers  to get all speakers. (All users)
b- /speakers/id  to get speaker by Id (All users)
c- /speakers  to add new Speaker. (Only Admins)
d-/speakers  to update speaker user Data (Only Admins or speaker itself)
e- /speakers  to delete specified speaker (Only Admins)
Student Router
a- /students  to get all students. (All users)
b- /students/id  to get student by Id (All users)
c- /students  to add new student. (any one through registration)
d-/students  to update student user Data (Admins or user itself)
e- /students  to delete specified student. (Only Admins)
Event Router
a- /events  to get all events. (All Users can Access)
b-/event/id  to get event by Id. (All Users can Access)
c- /events  to add new event Data (Only Admins)
d-/events  to update event user (Only Admins)
e- /events  to delete specified event. (Only Admins)
