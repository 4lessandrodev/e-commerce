### Aggregate - Order

```json
{
  "id": "String",
  "orderNumber": "String",
  "clientName": "string",
  "clientId": "string",
  "deliveryAddress": {
    "zipCode": "String",
    "street": "String",
    "number": "String",
    "complement": "String",
    "region": "String",
    "city": "String",
    "state": "Enum"
  },
  "separateProducts": [
    {
      "id": "productId",
      "image": "String",
      "description": "String",
      "unitOfMeasurement": "Enum",
      "category": "String",
      "isSpecial": "Boolean",
      "price": {
        "value": "Number",
        "locale": "Enum",
        "Symbol": "Enum"
      },
      "quantity": "Number"
    }
  ],
  "customBaskets": [
    {
      "id": "String",
      "basketId": "String",
      "image": "String",
      "description": "String",
      "category": "String",
      "items": [
        {
          "exchangeFactor": "Number",
          "productId": "String",
          "quantity": "Number",
          "description": "String",
          "unitOfMeasurement": "Enum",
          "image": "String"
        }
      ],
      "itemsAdded": [
        {
          "exchangeFactor": "Number",
          "productId": "String",
          "quantity": "Number",
          "description": "String",
          "unitOfMeasurement": "Enum",
          "image": "String"
        }
      ],
      "itemsRemoved": [
        {
          "exchangeFactor": "Number",
          "productId": "String",
          "quantity": "Number",
          "description": "String",
          "unitOfMeasurement": "Enum",
          "image": "String"
        }
      ],
      "changesLimitAvailable": "Number",
      "exchangesFactorAvailable": "Number",
      "price": {
        "value": "Number",
        "locale": "Enum",
        "Symbol": "Enum"
      },
      "quantity": "Number"
    }
  ],
  "basketPacks": [
    {
      "id": "String",
      "basketId": "String",
      "image": "String",
      "packId": "String",
      "description": "String",
      "quantityOfBaskets": "Number",
      "startsAt": "Date",
      "deliveryFrequency": "String",
      "price": {
        "value": "Number",
        "locale": "Enum",
        "Symbol": "Enum"
      }
    }
  ],
  "status": "Enum",
  "CostOfFreight": {
    "value": "Number",
    "locale": "Enum",
    "Symbol": "Enum"
  },
  "includesEcobag": "boolean",
  "amount": {
    "value": "Number",
    "locale": "Enum",
    "Symbol": "Enum"
  },
  "ecobagFee": {
    "value": "Number",
    "locale": "Enum",
    "Symbol": "Enum"
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Value Objects

- OrderStatus
- deliveryFrequency
- orderNumber
- deliveryAddress

### Entities

- customBasketsItem
- customBaskets
- basketPacks
- separateProducts

### Aggregates

- Order
