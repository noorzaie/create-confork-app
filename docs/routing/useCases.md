# Use-case
A use-case is a class that handles `logic` of your API. For example you may need a use-case that creates a resource in database or fetches data from an external entity.

Confork has some default use-cases that you can use them as route action handler.

!> All default use-cases need a `repository` input that is repository name of related database entity.

### CreateUseCase
This use-case creates a resource in database from data that passed in request body. You should set `data` inputs in action config.

### GetUseCase
This use-case fetches a resource by its id from database. You should set `entity` fiels in route config. You can also determine related resource in `relations` field.

### ListUseCase
This use-case fetches a list of resources from database. This use case also uses [Aqs](https://github.com/noorzaie/aqs) and [Aqs-typeorm](https://github.com/noorzaie/aqs-typeorm) packages and you can allow clients to search data by passing query strings. You can set `aqs` config in `aqsOptions` field of route and pass `aqs-typeorm` configs in `aqsTypeOrmConfig` input of use-case.

### UpdateUseCase
This use-case updates a resource in database by its id. You should set `data` and `entity` inputs in action config.

### DeleteUseCase
This use-case deletes a resource from database by its id. You should set `entity` inputs in action config. You can also pass `soft` input to tell the use-case to soft-delete the resource.

### DeleteManyUseCase
This use-case deletes a group of resources from database using query string filters. You should set `criteria` inputs in actoin config. You can also pass `soft` input to tell the use-case to use soft-delete.

### AddAssociationUseCase
With this use-case you can add a related resource to another resource. Below is parameters of this use-case:

| Parameter  | Description |
| ------------- | ------------- |
| repository | Repository of resource |
| entity | Id of resource or resource itself |
| relationKey | Field of resource that keeps id of related resource (foreign key) |
| relationData | Id or data of related resource (It could be a list) |
| relationRepository | Repository of related resource |
| keepOld | Keep previous relation or replace it |

### RemoveAssociationUseCase
This repository is for removing a relation from a resource. Below is parameters of this use-case:

| Parameter  | Description |
| ------------- | ------------- |
| repository | Repository of resource |
| entity | Id of resource or resource itself |
| relationKey | Field of resource that keeps id of related resource (foreign key) |
| relationId | Id of related resource (It could be a list) |


!> By default, `entity` field of use-cases is id of a resource, but if you fetch the resource and register it in container in another part of code, then UpdateUseCase will reuse that and doesn't fetch it again. 


# Create custom use-case
You can create your own use-case and use it in route action config. Your use-case should be a `class` that have an `execute` method. For this purpose, you can implement `BaseUseCase`.
