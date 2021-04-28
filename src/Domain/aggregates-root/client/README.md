### Aggregate - Client

```json
{
  "id": "UserId",
  "name": "String",
  "avatar": "String",
  "hasEcobag": "Boolean",
  "addresses": [
    {
      "id": "String",
      "zipCode": "String",
      "street": "String",
      "complement": "String",
      "number": "String",
      "geoCode": "Number",
      "isMainAddress": "Boolean",
      "zone": {
        "id": "String",
        "description": "String",
        "freight": {
          "currency": {
            "value": "Number",
            "symbol": "Enum",
            "locale": "Enum"
          }
        }
      },
      "city": {
        "id": "String",
        "name": "String",
        "stateId": "id",
        "state": "Enum"
      }
    }
  ]
}
```

---

#### Aggregates

- Id

#### Entities

- City
- State
- Address

#### Value Objects

- Avatar

#### Methods

- AddNewAddress
- RemoveAddress
- DefineMainAddress
- ChangeAddress
- ChangeName
- ChangeAvatar
