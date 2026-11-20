import EnrollmentsDao from "./dao";

// Resolves "current" to the signed-in user's id; null when nobody is signed in.
export const resolveUserId = (req, userId) => {
  if (userId !== "current") return userId;
  return req.session["currentUser"]?._id ?? null;
};

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const findEnrollmentsForUser = (req, res) => {
    const userId = resolveUserId(req, req.params.userId);
    if (!userId) {
      res.sendStatus(401);
      return;
    }
    res.json(dao.findEnrollmentsForUser(userId));
  };
  const enrollUserInCourse = (req, res) => {
    const userId = resolveUserId(req, req.params.userId);
    if (!userId) {
      res.sendStatus(401);
      return;
    }
    dao.enrollUserInCourse(userId, req.params.courseId);
    res.sendStatus(200);
  };
  const unenrollUserFromCourse = (req, res) => {
    const userId = resolveUserId(req, req.params.userId);
    if (!userId) {
      res.sendStatus(401);
      return;
    }
    dao.unenrollUserFromCourse(userId, req.params.courseId);
    res.sendStatus(200);
  };
  const findUsersForCourse = (req, res) => {
    res.json(dao.findUsersForCourse(req.params.courseId));
  };
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
}
