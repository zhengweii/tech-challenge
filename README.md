This back-end application allows users to view their albums and its associated
photographs. Users are able to:
* Sign up
* Sign in
* Log out
* Log out from all sessions
* View all users
* View their associated albums
* View their associated photos
* View a specific album that is associated with them
* View a specific photo that is associated with them

## Quick Start
1. Ensure that you have `Node` and `NPM` installed on your platform.
1. Clone the repo using `git clone`.
1. Change the directory to the `server` directory inside the cloned repo.
1. Run `npm i` to install the required dependencies.
1. Create a **.env** file and place it in the root of the project to set up the 
local environment variables.
1. Run `npm run dev` to start the program.
1. Open http://localhost:8080/ to view it in the browser.

## Testing
1. Run `npm test` to run the test cases.

## Additional Information
* Certain routes such as viewing associated albums require authentication. For such
routes, do consider using Postman to send GET or POST requests. Ensure that these requests
have authorization header in the form of a bearer token.