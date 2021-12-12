In confork, you can use any kind of database or ORM. By default, when you create a confork project, you can enable `typeorm` and use it in your project.

# Base repository
Confork has a `BaseRepository` that you can resolve from dependency container and use it. This repository can handle following database operations:

```text
- findAll
- findOne
- create
- addAssociation
- removeAssociation
- update
- delete
- deleteMany
```

If you want to use another ORM instead of typeorm, You need to write a BaseRepository that implements `BaseRepositoryType` type.

!> If you want to use confork's use-cases, you should implement above methods in your custom BaseRepository, otherwise you need to overwrite use-cases that use them. 

!> You always need to implement a `findOne` method in your custom BaseRepository as it is used in several places of confork's core.


# Using typeorm
If you want to keep using typeorm and confork's BaseRepository, then you should use typeorm [custom repository](https://typeorm.io/#/custom-repository). You can define your models and repositories in `src/infrastructure/database` directory.
