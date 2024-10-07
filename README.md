# Datarock Public API Client

An unofficial library for integrating with [Datarocks's](https://datarock.com.au/) [Public API](https://api-docs.prod.datarock.com.au/index.html)

## Getting started

### Installation

`npm install datarock-client`

### Usage

Read [Datarock's Public API documentation](https://api-docs.prod.datarock.com.au/index.html) to understand the API interface and return values.

```
import { DatarockClient, ListProjectsCommand /* or any other command you want to use */ } from "datarock-client"

const email = "foo@email.com" // the email associated with your Datarock account
const privateKey = "your key here" // the privateKey associated with the public key uploaded to the Datarock platform

// create a Datarock client
const client = new DatarockClient({ email, privateKey })

// send the client the commmany. See "Commands" below.
const response = await client.send(new ListProjectsCommand())

if (response.ok) {
  // see Datarock's Public API docs for return value of a given command
  const body = await response.json()

  // do something with the result

} else {
  // handle the unsuccesful response
}

```

## Available Commands

See [Datarock's Public API documentation](https://api-docs.prod.datarock.com.au/index.html) to understand the API interface and return values.

### Projects

**ListProjectsCommand\<void\>: Promise\<Response\>**
List projects asssociated with your account

`new ListProjectsCommand()`

### Holes

**ListHolesCommand\<{projectUuid}\>: Promise\<Response\>**
List holes asssociated with a project

```
const projectUuid = "some-uuid" // project uuids can be deduced from the ListProjectsCommand
new ListProjectsCommand({projectUuid})
```
