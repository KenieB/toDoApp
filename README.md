
# ToDo List App
> This app is a local-use, cloud-storage-based multiple-user to-do list.
> There is not a publicly deployed version of this app at this time.
> 
> Functionality includes:
> - User access and management
> - Save user list(s) across sessions
> - Sort user list by title or due-date
> - Add (optional) tags to individual to-do list items
> - Add / Delete individual to-do list items
>
>>## Built with:
>>- React
>>- Bootstrap
>>- jQuery
>>- PostgreSQL
>>- Knex
>>- Express
>>- JWT
>>- BCrypt

## Installation
>  1. Fork and clone this repository
>  
>  2. `$ cd to-do-backend/` 
>  
>  3. Copy `.env.sample` within backend root directory and rename `.env`. 
>  
>>  At minimum, you must provide values for 
>>  `DEVELOPMENT_DATABASE_URL`: This should be the URL for a PostgreSQL database.
>>  and
>>  `SECRET_KEY`: This should be a string of random characters for encryption use.
>>  ***Optional envirnoment variable(s):** `PRODUCTION_DATABASE_URL` and `LOG_LEVEL`*
>>  *`LOG_LEVEL` can be any of: [`trace`, `debug`, `info`, `warn`, `error`, `fatal`]*
>>  *`LOG_LEVEL` defaults to `info`*
>  
>  4. From root directory run `$ npm install`
>  
>  5. To start app: `$ npm run start` or `$ npm run start:dev` *(for logs with prettyPrint)*
>  
>  6. **(Optional):** *Start-up scripts will run migrations automatically. To use mock data you may run `$ npx knex seed:run` from backend directory*



## App Demo
> View app demo at: [ToDo List App Demo](https://drive.google.com/file/d/1rqmO5SDo1EKWP5KpjgBxIVe1aDRzX2_O/view?usp=sharing)
##
> Written with [StackEdit](https://stackedit.io/).
