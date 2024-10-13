# Datarock Public API Client

An unofficial library for integrating with [Datarocks's](https://datarock.com.au/) [Public API](https://api-docs.prod.datarock.com.au/index.html)

## Getting started

### Installation

`npm install datarock-client`

### Usage

Read [Datarock's Public API documentation](https://api-docs.prod.datarock.com.au/index.html) to understand the API interface and return values.

#### example

```
import { DatarockClient, ListProjectsCommand /* or any other command you want to use */ } from "datarock-client"

const email = "foo@email.com" // the email associated with your Datarock account
const privateKey = "your key here" // the privateKey associated with the public key uploaded to the Datarock platform

// create a Datarock client
const client = new DatarockClient({ email, privateKey })

// send the client the command. See "Commands" below.
const response = await client.send(new ListProjectsCommand())

if (response.ok) {
  // see Datarock's Public API docs for return value of a given command
  const body = await response.json()

  // do something with the result

} else {
  // handle the unsuccessful response
}

```

## Available Commands

See [Datarock's Public API documentation](https://api-docs.prod.datarock.com.au/index.html) to understand the API interface and return values.

### Projects
---

**ListProjectsCommand\(void\): Promise\<Response\>**

List projects asssociated with your account

`new ListProjectsCommand()`

### Holes
---

**ListHolesCommand\({projectUuid: string})\: Promise\<Response\>**

List holes asssociated with a project

```
const projectUuid = "some-uuid" // project uuids can be deduced from the ListProjectsCommand
new ListHolesCommand({projectUuid})
```

### Exports
---

**CreateExportCommand\(Input\):
  Promise\<Response\>**

  _interface Input {
                        projectUuid: string;
                        holeIds: string[];
                        artefactType: string;
                        lastUpdatedSince?: number;
                        lastUpdatedBefore?: number;
                    }_

Request an export for a set of holes, for a given resource.

```
const projectUuid = "some-uuid" // project uuids can be deduced from the ListProjectsCommand
const artefactType = "depth_registration" // see Datarock API documentation for list of resources
const holeIds = ["foo", "bar"] // can be deduced from the ListHolesCommand
const lastUpdatedBefore = Date.now() // optional
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000
// yesterday (not accounting for day light savings, etc)
const lastUpdatedSince = Date.now() - DAY_IN_MILLISECONDS // optional

new CreateExportCommand({
    projectUuid,
    holeIds,
    artefactType,
    lastUpdatedSince,
    lastUpdatedBefore,
})
```

**ListExportsCommand\(Input\):
  Promise\<Response\>**

  _interface Input {
                        limit?: number;
                        offset?: number;
                    }_

List all existing exports.

```
const limit = 500 // Optional. See Datarock's docs for defaults
const offset = 0 // Optional. See Datarock's docs for defaults

new ListExportsCommand({
    limit,
    offset
})
```
