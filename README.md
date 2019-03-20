# Building an API using a Node.js and Express

In this challenge, you will **design** and build an API that satisfies the requirements listed under the `Minimum Viable Product` section.

## Instructions

**Read these instructions carefully. Understand exactly what is expected before starting.**

You are allowed, and **encouraged**, to collaborate with other peers. Please follow the twenty-minute rule, before seeking support from your PM and Instructor.

## Project Set Up

- [x] Create a forked copy of this project.
- [x] Add your project manager as collaborator on Github.
- [x] Clone your OWN version of the repository.
- [x] Create a new branch: git checkout -b `<firstName-lastName>`.
- [x] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
- [x] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project.

- [x] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's Repository). **Please don't merge your own pull request**
- [ ] Add your project manager as a reviewer on the pull-request
- [ ] Your project manager will count the project as complete by merging the branch back into master.
- [ ] Do your magic!

## Minimum Viable Product

1. [x] Build an API to let clients perform CRUD operations on `users` and `posts`.
1. [x] Add an endpoint to retrieve the list of `posts` for a `user`.
1. [x] Write custom `middleware` to ensure that the user's `name` is upper-cased before the request reaches the `POST` or `PUT` _route handlers_.
1. Use `Express Routers` to organize the endpoints. You can optionally move and rename `postDb.js` and `userDb.js` to place it next to the corresponding router.

### Database Persistence Helpers

The `/data/helpers` folder includes helper files that you can use to manage the persistence of _users_ and _posts_ data. These files are `userDb.js` and `postDb.js`. Both files publish the following api:

- `get()`: calling find returns a promise that resolves to an array of all the `resources` contained in the database.
- `getById()`: takes an `id` as the argument and returns a promise that resolves to the `resource` with that id if found.
- `insert()`: calling insert passing it a `resource` object will add it to the database and return the new `resource`.
- `update()`: accepts two arguments, the first is the `id` of the `resource` to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the `resource` from the database, returns the number of records deleted.

The `userDb.js` helper includes an extra method called `getUserPosts()` that when passed a user's `id`, returns a list of all the `posts` for the `user`.

**All helper methods return a promise.**

#### Database Schemas

The _Database Schemas_ for the `users` and `posts` resources are:

##### Users

| field | data type        | metadata                                            |
| ----- | ---------------- | --------------------------------------------------- |
| id    | unsigned integer | primary key, auto-increments, generated by database |
| name  | string           | required, unique                                    |

##### Posts

| field   | data type        | metadata                                            |
| ------- | ---------------- | --------------------------------------------------- |
| id      | unsigned integer | primary key, auto-increments, generated by database |
| text    | text             | required                                            |
| user_id | unsigned integer | must be the `id` of an existing `user`              |

We have provided test data for the resources.

## Stretch Goal

- Use `create-react-app` to create an application inside the root folder, name it `client`.
- From the React application connect to the `/api/users` endpoint in the API and show the list of users.
- Add functionality to show the details of a user, including their posts, when clicking a user name in the list. Use React Router to navigate to a `/users/:id` route to show the user details.
- Add styling!
