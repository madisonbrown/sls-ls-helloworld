# Serverless / LocalStack Hello World
Serverless "hello world" function running on LocalStack

# Use
Ensure that the following global dependencies are installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Serverless](https://www.serverless.com/framework/docs/getting-started/)

Linux users:
- Add `export DOCKER_GATEWAY_HOST=172.17.0.1` to your `.bashrc` file.

Then, run:
- `yarn install`, to install local dependencies.
- `yarn start`, to start the LocalStack Docker daemon (Mac users may need to set `TMPDIR=/private$TMPDIR`).
- `yarn deploy`, to deploy the Serverless service to the local AWS environment (noting the returned HTTP endpoint).
- `yarn invoke`, to invoke the `hello` lambda function via the CLI.
- `GET ${ENDPOINT}/hello`, to invoke via HTTP.

# Notes
- `./docker-compose.yml` is the default configuration for running Dockerized Localstack, taken from the [GitHub repository](https://github.com/localstack/localstack).
- `./myService` is a default Serverless service created by running `sls create --template aws-nodejs --path myService`. See [here](https://www.serverless.com/framework/docs/providers/aws/examples/hello-world/node/).
- The `serverless-localstack` plugin is used to bridge these two applications. A section has been added to the default Serverless YAML file, taken from the [documentation](https://github.com/localstack/serverless-localstack), in order to configure this plugin (see `./myService/serverless.yml:23`).
- The handler has been updated to interact with Localstack S3 as a proof of concept.

# Issues
- No persistence after stopping LocalStack daemon
- Severless won't overwrite previous deployments
