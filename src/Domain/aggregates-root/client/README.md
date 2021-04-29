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
      "number": "String",
      "complement": "String",
      "isMainAddress": "Boolean",
      "region": "RegionId"
    }
  ]
}
```

---

#### Aggregates

- Id
- Region

#### Entities

- Address

#### Value Objects

- Avatar
- ZipCode

#### Methods

- AddNewAddress
- RemoveOneAddress
- DefineAsMainAddress
- ChangeName
- ChangeZipCode
- ChangeStreetName
- ChangeNumber
- ChangeComplement
