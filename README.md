# TODO App

## Project commands

`yarn start` - to launch your project  

Now you can run project by calling `yarn start`


If you keep experiencing something like: **tslint: command not found**
please do the following:

```

yarn global add tslint typescript

```

link: https://stackoverflow.com/questions/36910592/enabling-eslint-on-typescript-files/64175035#64175035

## Features

1. **Todo list - CRUD operations on backend**;

- _Each `PUT` `POST` rout  has validation of `req.body` and throw `400` error in case of failed validation_
- _Created GENERIC validator, isExist (for put, delet and get by id), tryCatch middlewares _

2. **Todo list - Connected CRUD operations with frontend**;

- _For Edit/Add used forms written with [Formik](https://formik.org/docs/overview);_
- _For data fetching used [React Query](https://react-query.tanstack.com/)
- _Todo list have different behaviors on different devices. Desktop - displayed as a table, Tablet - slider, Mobile - list._
- _Used styled components_
- _Design tablet and mobile adaptive_ 

3. **Authorization (login/signup) backend;**

- _Used jwt [authorization](https://nodejsdev.ru/doc/jwt/) and [Passport](http://www.passportjs.org/) for that_
- _Changed password endpoint_

4. **Authorization (login/signup) frontend;**

- _Used Formik for handling validation and submit func_
- _Integrated logout and edit user information UI_

5. **Filters for todo list by title and statuses (private and completed);**

- _Filter pass params through `req.params`(`localhost:3000/todo?search=test&status=completed`)_
- _Connected backend filtration with UI components_

6. **Button pagination;**

- _All pagination handled by backend_
- _Pagination differently on different devices. Desktop - button pagination, Tablet - horizontal scroll pagination, Mobile - vertical scroll pagination_


