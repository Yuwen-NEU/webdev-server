import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  const findEnrollmentsForUser = (userId) =>
    db.enrollments.filter((enrollment) => enrollment.user === userId);
  const enrollUserInCourse = (userId, courseId) => {
    const exists = db.enrollments.some(
      (e) => e.user === userId && e.course === courseId,
    );
    if (exists) return;
    db.enrollments = [
      ...db.enrollments,
      { _id: uuidv4(), user: userId, course: courseId },
    ];
  };
  const unenrollUserFromCourse = (userId, courseId) => {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId),
    );
  };
  const findUsersForCourse = (courseId) =>
    db.users.filter((user) =>
      db.enrollments.some((e) => e.user === user._id && e.course === courseId),
    );
  return {
    findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
    findUsersForCourse,
  };
}
