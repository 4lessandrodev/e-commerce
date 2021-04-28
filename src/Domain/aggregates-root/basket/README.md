### Aggregate - Basket

```json
{
  "id": "String",
  "description": "String",
  "category": {
    "id": "String",
    "description": "String",
    "changesLimit": "Number"
  },
  "price": {
    "currency": {
      "value": "Number",
      "symbol": "Enum",
      "locale": "Enum"
    }
  },
  "isActive": "Boolean",
  "images": ["String"],
  "numberOfRatings": "Number",
  "ratingAverage": "Number",
  "products": ["String"],
  "comments": [
    {
      "id": "String",
      "text": "String",
      "reportedCommentQuantity": "Number",
      "likes": "Number"
    }
  ],
  "info": "String",
  "tags": [
    {
      "id": "String",
      "description": "String"
    }
  ]
}
```

---

#### Value Objects

- Image
- Price
- Currency

#### Entities

- Tag
- Comment
- Category

#### Aggregates

- Product

#### Methods

- rateTheBasket
- changePrice
- addImage
- removeImage
- deactivate
- activate
- addComment
- removeComment
- addTag
- removeTag
- addProduct
- removeProduct
