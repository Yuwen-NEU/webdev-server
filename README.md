# webdev-server

Node.js / Express HTTP server for the Kambaz application (CS5610, Chapter 5).
Data lives in process memory (seeded from `Kambaz/Database/*.json`), so changes
last while the server runs and reset on restart.

## Run locally

```bash
npm install
npm run dev     # nodemon --exec tsx index.ts, restarts on save
# or
npm start       # tsx index.ts
```

The server listens on `PORT` or 4000. Create a `.env` file (not committed):

```
SERVER_ENV=development
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:4000
SESSION_SECRET=<any phrase>
```

## Routes

- `/`, `/hello` — greetings
- `/lab5/...` — Lab 5 exercises (path/query parameters, remote objects and arrays)
- `/api/users/...` — sign in, sign up, sign out, profile (session based)
- `/api/courses`, `/api/users/:userId/courses` — courses and enrollments
- `/api/courses/:courseId/modules`, `/api/modules/:moduleId` — modules
- `/api/courses/:courseId/assignments`, `/api/assignments/:assignmentId` — assignments
- `/api/courses/:courseId/users` — people enrolled in a course
