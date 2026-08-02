# Classroom

6 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.classroom.getAnAssignment`

Closing down - Get an assignment — [API reference](https://docs.github.com/rest/classroom/classroom#closing-down---get-an-assignment)

```ts
github.classroom.getAnAssignment(input: {
  /** The unique identifier of the classroom assignment. */
  assignment_id: number;
}): Promise<ClassroomAssignment>
```

<sub>`GET /assignments/{assignment_id}` · `classroom/get-an-assignment`</sub>

## `github.classroom.listAcceptedAssignmentsForAnAssignment`

Closing down - List accepted assignments for an assignment — [API reference](https://docs.github.com/rest/classroom/classroom#closing-down---list-accepted-assignments-for-an-assignment)

```ts
github.classroom.listAcceptedAssignmentsForAnAssignment(input: {
  /** The unique identifier of the classroom assignment. */
  assignment_id: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(ClassroomAcceptedAssignment)[]>
```

<sub>`GET /assignments/{assignment_id}/accepted_assignments` · `classroom/list-accepted-assignments-for-an-assignment`</sub>

## `github.classroom.getAssignmentGrades`

Closing down - Get assignment grades — [API reference](https://docs.github.com/rest/classroom/classroom#closing-down---get-assignment-grades)

```ts
github.classroom.getAssignmentGrades(input: {
  /** The unique identifier of the classroom assignment. */
  assignment_id: number;
}): Promise<(ClassroomAssignmentGrade)[]>
```

<sub>`GET /assignments/{assignment_id}/grades` · `classroom/get-assignment-grades`</sub>

## `github.classroom.listClassrooms`

Closing down - List classrooms — [API reference](https://docs.github.com/rest/classroom/classroom#closing-down---list-classrooms)

```ts
github.classroom.listClassrooms(input: {
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(SimpleClassroom)[]>
```

<sub>`GET /classrooms` · `classroom/list-classrooms`</sub>

## `github.classroom.getAClassroom`

Closing down - Get a classroom — [API reference](https://docs.github.com/rest/classroom/classroom#closing-down---get-a-classroom)

```ts
github.classroom.getAClassroom(input: {
  /** The unique identifier of the classroom. */
  classroom_id: number;
}): Promise<Classroom>
```

<sub>`GET /classrooms/{classroom_id}` · `classroom/get-a-classroom`</sub>

## `github.classroom.listAssignmentsForAClassroom`

Closing down - List assignments for a classroom — [API reference](https://docs.github.com/rest/classroom/classroom#closing-down---list-assignments-for-a-classroom)

```ts
github.classroom.listAssignmentsForAClassroom(input: {
  /** The unique identifier of the classroom. */
  classroom_id: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(SimpleClassroomAssignment)[]>
```

<sub>`GET /classrooms/{classroom_id}/assignments` · `classroom/list-assignments-for-a-classroom`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
