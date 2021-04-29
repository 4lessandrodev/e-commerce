### Aggregate - Region

```json
{
  "id": "String",
  "description": "String",
  "freightPrice": {
    "currency": {
      "value": "Number",
      "locale": "Enum",
      "Symbol": "Enum"
    }
  },
  "city": {
    "id": "String",
    "stateId": "String",
    "stateInitial": "Enum",
    "name": "String",
    "geoCode": "String"
  },
  "isActive": "Boolean"
}
```

#### Value Objects

- FreightPrice
- Currency
- Description

#### Entities

- City

#### Aggregates

- State

#### Methods

- CreateRegion
- ChangeFreightPrice
- ActivateRegion
- DeactivateRegion
