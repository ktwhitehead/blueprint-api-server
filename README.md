## Prerequisites
- Docker
- npm

## Getting Started
  To run the server locally, simply run `docker compse up` in the root directory of the project. \
  To run migrations, run `node run migrate up`. \
  To seed data, run `node run seed`.


#### Link to to the hosted application (if there is one)
#### Instructions for running the code locally (if not hosted)
#### Description of the problem and solution
#### Reasoning behind your technical choices
#### Describe how you would deploy this as a true production app on the platform of your choice:
  - How would ensure the application is highly available and performs well?
  - How would you secure it?
      - Reverse proxy
      - Dependabot
  - What would you add to make it easier to troubleshoot problems while it is running live?
#### Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project
  - blueprint-api-server
    - CI
    - Typescript
    - Linting
    - API Docs - Swagger?
    - Logging
    - Observability - open telemetry?
    - DB/Schema docs
    - Validation around multi-choice answers/json
  - blueprint-frontend
    - Observability
    - CI
#### Link to other code you're particularly proud of
#### Link to your resume or public profile
