# Projeto e-commerce

### Projeto com DDD, SOLID, TDD, CLEAN CODE e POO

#### Resumo

Uma aplicação para comercialização de produtos orgânicos.
O sistema deve permitir cadastro e gestão de produtos orgânigos,
os produtos devem ser categorizados.

Também deve ser possível cadastrar cestas com diversos produtos cadastrados.
As cestas também devem ser categorizadas.
Cada cesta cadastrada deve ter um limite de alterações permitidas, de acordo
com sua categoria.

O limite de alteração não é a única regra para personalização da cesta.
Cada produto possui um peso de alteração, e as substituições devem
seguir o peso para bloquear novas alterações, exemplo:
Se o usuário retira um produto com peso 3, e atinge o limite de alteração
da cesta em questão, o sistema deve permitir o usuário a adicionar mais 3
produtos com peso 1 ou adicionar mais 1 produto com peso 3 ou mais 1 produto
com peso 2 e outro com peso 1, até que o peso total seja atingido.

O usuário deve se cadastrar apenas com email e senha.
O usuário só pode personalizar uma cesta se estiver devidamente cadastrado na plataforma.
Além das cestas o usuário pode adicionar produtos avulsos ao carrinho, desde
que estes produtos sejam do tipo especial.

O usuário cadastrado pode acessar o seu painel de pedidos e a qualquer momento
cancelar um pedido que esteja com o status aberto.
Também pode realizar uma assinatura de acordo com os planos disponíveis.

O usuário pode rastrear os seus pedidos, bem como trocar mensagens em seus planos
de assinatura, tais mensagens ficam vinculadas à sua assinatura e é visualizada pelo admin.

O sistema deve limitar os pedidos para apenas clientes que moram nas regiões cadastradas.
Cada região pode possuir um frete diferenciado.

Ao concluir um novo pedido o sistema deve realizar a baixa de estoque.

Assinaturas devem agendar baixas de estoque. Assim que lançado estoque a baixa dos
produtos devem ocorrer automaticamente.

Os clientes assinantes podem a qualquer momento personalizar suas cestas da semana.

O admin pode aprovar ou reprovar qualquer pedido.

O sistema deve aceitar pagamentos em cartão de crédito ou boleto via PayPal.

Cada pedido é enviado com uma ecobag retornável, o sistema deve realizar o rastreamento
das mesmas e indicar se um cliente realizou a devolução ou não.

## Sobre DDD

---

## DDD (Domain Driven Design)

- [ 1. Ubiquitous language](#1-ubiquitous-language)
- [ 2. Rich domain model](#2-rich-domain-model)
- [ 3. Thin domain service working on rich domain models](#3-thin-domain-service-working-on-rich-domain-models)
- [ 4. Layers in a DDD application](#4-layers-in-a-ddd-application)
- [ 5. Entities](#5-entities)
- [ 6. Value objects](#6-value-objects)
- [ 7. Factories](#7-factories)
- [ 8. Aggregates](#8-aggregates)
- [ 9. Repositories](#9-repositories)
- [10. Shared kernel](#10-shared-kernel)
- [11. Domain events](#11-domain-events)
- [12. Anti-corruption layer](#12-anti-corruption-layer)

## 1. Ubiquitous language:

- Language and terms agreed upon by both business users and developers, within a bounded context
- Entities with the same name in a different context can have different behavior and data
- Bounded context helps in single responsibility for domain models

## 2. Rich domain model:

- Models (entities, value objects, aggregates) with rich behavior are preferred over anemic domain models (entities without behavior, which only keep data and represent the DB tables)
- Due to single responsibility principle (a class or method should have only one reason to change), non-cohesive behavior should be delegated to other classes (or even handled inside domain services) when necessary
- Model methods can also delegate the task to domain services by raising domain events

## 3. Thin domain service working on rich domain models:

- Domain services should not hold state (application services are not domain services, they are on the outer layer close to the UI layer, and can hold application/task state)
- Domain services have very little behavior and only which does not fit cohesively in any domain model
- Domain services sit in the core domain layer along with entities, value objects, aggregates and domain events, and expose domain models in their interfaces

## 4. Layers in a DDD application:

- Core domain layer (domain services, entities, value objects, aggregates and domain events)
- Core domain layer is surrounded by the UI/Application layer and Infrastructure layer
- UI/Application layer (UI and application service facade with messaging, JSON, XML capabilities, session, etc.)
- Infrastructure layer (persistence, file system, network, mail, logging, etc.)

## 5. Entities:

- Live longer than the application, should endure restarts, and are persisted and read from data sources (DB, file system, network, etc.)
- Have an id (preferably a GUID rather than a DB generated int because business transactions do not rely on persistence, can be persisted after other operations carried out in model's behavior)
- Have entity semantics (equality and `GetHashCode()` defined by class name + id)
- Behavior in an entity mostly orchestrates value objects for a use case
- Entity class should not have public property setters, setting a property should be a behavior method
- Entities should not have bidirectional relations (depending on the bounded context, either an egg can have a chicken or a chicken can have eggs, but not both)
- Entity relations should not reflect the complete set of DB foreign key relationships, should be bare down to the minimum for performing the behavior inside the bounded context
- Entity relations should not hold a reference to another entity class, it can only keep the id of another entity
- If a business transaction needs a reference to other entities in relation, aggregates should be used instead (aggregates can hold a reference to other aggregate roots, which are entity classes by definition)

## 6. Value objects:

- Are only identified by their values, not by their ids (for example money is a value object as long as we are not tracking individual banknotes, if we need to track individual banknotes then it should be a banknote entity)
- Can be used to measure or describe things (name, description, amount, height, date, time, range, address, etc.)
- You can combine other value types that usually go together into a new value object type, like address (city, street, country, postal code) or ...range, or ...type
- Prefer to put the behavior on value objects rather than on entities because value objects are immutable and do not have side effects (like changing their state or changing the state of any entity)
- Can be part of an entity
- Have value semantics (equality and `GetHashCode()` defined by property values)
- Should be immutable, behaviors should not change the state of a value object, but can rather create a new value object (should act similar to C# strings, structs, ints, and other value types)
- Can be persisted but only as part of an entity, not individually

## 7. Factories:

- Create, build aggregates and entities:
- Static Create...() factory method on a model class is used to guard against the construction of an invalid or incomplete model
- The model class should not have a public default constructor (however if it is to be persisted, for Entity Framework to work, it can have a protected or private default constructor)

## 8. Aggregates:

- Encapsulate and are composed of entity classes and value objects that change together in a business transaction
- Aggregates are a transactional graph of model objects
- Aggregate root should be an entity, an aggregate can even be a single entity
- Aggregate can keep a reference to other aggregate roots, but not to other entity classes which are not aggregate roots themselves
- Aggregate should not keep a reference to other aggregate root entity classes if those other entities do not change together with this aggregate root entity
- Aggregate can also keep the id of another entity, but keeping too many foreign key ids is a code smell (why?)
- If deleting an entity has a cascade effect on the other entities referenced by class in the object graph, these entities are part of the same aggregate, if not, they should not be inside this aggregate

## 9. Repositories:

- Persist and read aggregates to/from DB or file system
- Should have an interface close to a collection but should allow only the necessary operations needed for this aggregate (for example an aggregate might not need to be allowed to get updated or deleted)
- Should not be generic (should be specific for the aggregate type)
- Can have specific query methods if needed (like `FindByName()` etc.)
- Do not use lazy loading, instead use eager loading (use Include(...) in Entity Framework), else you can face "N+1 problem"s and excessive number of queries sent to DB
- Can have specific methods that only load some of the columns from a table
- Repository add/update/remove operation should commit to DB by itself (call Entity Framework ...Context.SaveChanges() at the end), because aggregate operations should be ACID transactions
- Repository interface sits inside Core domain layer, but implementations are inside Infrastructure layer
- Repositories are not used inside the domain models (entities, value objects, aggregates)

## 10. Shared kernel:

- Is where cross-cutting concerns or common types shared by all bounded contexts sit (like entity abstract base type, value object abstract base type, common value objects, authorization, etc.)

## 11. Domain events:

- Can be raised when a state change occurs in an entity
- Decouple models from each other
- Only used when an event needs to be handled inside a different model than the one raising this event, or handled inside a domain service or even an application service
- Are immutable classes, that represent past, named in the past tense, and cannot change (...Changed, ...Happened, etc.)
- Should include the time that this event was raised, as well as any other useful info for handling the event, as well as the id of the entity which raised the event
- Should not have behavior
- Domain events are subscribed to with a callback (lambda), or using pub sub interfaces, on a singleton or static event message bus
- Domain events implemented this way can be subscribed to and handled in the aggregate root of the entity which raised the event, or in domain services, or even in UI/Application layer
- Domain events are raised synchronously, if an asynchronous task needs to be carried out, it can be done inside the event handler (async-await pattern)
- Outside applications can also be triggered by using a message queue or an enterprise service bus (ESB) inside the domain event handler

## 12. Anti-corruption layer:

- Used to translate models from outside systems or legacy apps to models inside the bounded context and vice versa, and also to ease the communication with legacy services
- Can use service facades and model adapters

#### Modelagem do sistema

##### Arquitetura da aplicação

---

![](./readme/Api-Architecture.png)

##### Mapa de artefatos da aplicação

---

![](./readme/Artifacts.png)

##### Casos de uso

---

![](./readme/UseCase.png)

##### Diagrama de classe

---

![](./readme/ClassesDiagram.png)

##### Como usar esse projeto

---

- `$ git clone https://github.com/4lessandrodev/e-commerce.git`

- `$ cd e-commerce `

- `$ yarn `

- `$ yarn run start `
