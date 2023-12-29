## Description

Houzz Application.
$yarn install
#all the env configration have been added to index.html for now  so you dont have to  env
$yarn start

```

### Prerequisites

Before you begin you need to make sure you have everything needed to get the project up and running.

- Make sure you are on the version more than 14 [node](https://nodejs.org/en/)
- We are using [yarn](https://yarnpkg.com/lang/en/) as the package manager in the application for frontend.
- It will be best if you are on a MacOS machine, otherwise, there may be extra configurations needed on your end.
- Depending on your role on this project, reach out for specific permissions.

## Release Builds
```

Environment files exist to control environment values during local dev or during a build.

```bash
yarn build
yarn build:development
yarn build:production
yarn build:uat
```

Edit the relevant `.env.[environment name]` file to change values for each environment. An example file:

```env
REACT_APP_API_APPLICATION_NAME=houzzPortal
REACT_APP_API_DEMO_APPLICATION_NAME=houzzPortal
REACT_APP_API_URL=http://localhost:3000/api/v1
REACT_APP_GATEWAY_API_URL=https://api.punkapi.com/
REACT_APP_OKTA_ISSUER_PATH=/oauth2/default
REACT_APP_SESSION_TIMEOUT_IN_MINUTES=20
REACT_APP_SESSION_WARNING_IN_MINUTES=18
REACT_APP_STANDARD_PORTAL_APPLICATION_NAME=RiderApplication
REACT_APP_GOOGLE_MAP_API_KEY = AIzaSyDFxQfUvyvcwkVkYMGld_faQnmqVUktiqg
```
