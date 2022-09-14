## Prerequisites
- Docker
- npm

## Getting Started
  Install dependencies, `npm install`. \
  Run the server, `docker compse up`. \
  Run migrations, `npm run migrate up`. \
  Seed data (the blueprint screener), run `npm run seed`.

#### Reasoning behind your technical choices

- I chose Node/Express for its maturity and stability as well as its popularity among the general dev community.
- `node-pg-migrate` was picked for its variety of features and support (seemed to be the best migration tool for node projects).
- Docker because of its ease of use and convenience

#### Describe how you would deploy this as a true production app on the platform of your choice:

- I'd have a CI pipeline (I've most recently been using Circle CI) in place to ensure tests/linting steps pass before any deployment.
- Deploying this to AWS Lambda via serverless would be my preference due to its simplicity, ease of maintenance, and scalability.
- I'd use AWS RDS for the postgres db.
- I'd consider something like Terraform (I have some experience with) or AWS CDK (I have no exprience with) for managing devops.

#### Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project

- Lack of test coverage
  - Ideally, I'd have unit tests for each of the models, scripts, and services.
  - E2E tests

- Typescript and linting
  - This was my first Node/Express project, and I was more worried about getting somethign up and running vs implementing Typescript. \
    With more time, I'd make the investment of implementing Typescript.

- Security
  - I'd need to reconsider node/express best practices for security.
    - I've implemented helmet but I'm sure there is more to tidy up.
  - If I had lots of money, I'd look at implementing somethign like Anchore to identify vulnerabilities in code, dependencies, build steps, deploy.

- ORM
  - I wanted to see how far I could get without using an ORM, but introducing one could clean the code up a bit.

- Observability
  - I'd consider open telemetry for metrics, logging, and tracing.
    - Vendor agnostic

- API docs
  - I'd add swagger or something similar

- Schema documentation
  - SchemaSpy

- Mono repo?

#### Link to other code you're particularly proud of

- Feel free to look at any of my repos at github.com/ktwhitehead though they are mostly half baked projects. \
- I'm semi proud of a project I still maintain, but I won't share repo because it was created years ago and it's embarrasing how bad the code is:
  - pullpokes.com
- I've worked on/maintain other projects with a friend:
  - https://chrome.google.com/webstore/detail/smrzr/ebichgemfmpphjcdiebfmpbfflocnjoa?hl=en-US
  - smrzr.io
  - tennesseeled.com

#### Link to your resume or public profile

- I'm still working on updating this, will email it here shortly.

