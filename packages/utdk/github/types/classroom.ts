import type { Classroom, ClassroomAcceptedAssignment, ClassroomAssignment, ClassroomAssignmentGrade, SimpleClassroom, SimpleClassroomAssignment } from "./schemas.js";

export type ClassroomOperations = {
  /**
   * Closing down - Get an assignment
   * @see https://docs.github.com/rest/classroom/classroom#closing-down---get-an-assignment
   */
  getAnAssignment: (input: {
    /** The unique identifier of the classroom assignment. */
    assignment_id: number;
  }) => Promise<ClassroomAssignment>;

  /**
   * Closing down - List accepted assignments for an assignment
   * @see https://docs.github.com/rest/classroom/classroom#closing-down---list-accepted-assignments-for-an-assignment
   */
  listAcceptedAssignmentsForAnAssignment: (input: {
    /** The unique identifier of the classroom assignment. */
    assignment_id: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(ClassroomAcceptedAssignment)[]>;

  /**
   * Closing down - Get assignment grades
   * @see https://docs.github.com/rest/classroom/classroom#closing-down---get-assignment-grades
   */
  getAssignmentGrades: (input: {
    /** The unique identifier of the classroom assignment. */
    assignment_id: number;
  }) => Promise<(ClassroomAssignmentGrade)[]>;

  /**
   * Closing down - List classrooms
   * @see https://docs.github.com/rest/classroom/classroom#closing-down---list-classrooms
   */
  listClassrooms: (input: {
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(SimpleClassroom)[]>;

  /**
   * Closing down - Get a classroom
   * @see https://docs.github.com/rest/classroom/classroom#closing-down---get-a-classroom
   */
  getAClassroom: (input: {
    /** The unique identifier of the classroom. */
    classroom_id: number;
  }) => Promise<Classroom>;

  /**
   * Closing down - List assignments for a classroom
   * @see https://docs.github.com/rest/classroom/classroom#closing-down---list-assignments-for-a-classroom
   */
  listAssignmentsForAClassroom: (input: {
    /** The unique identifier of the classroom. */
    classroom_id: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(SimpleClassroomAssignment)[]>;
};
