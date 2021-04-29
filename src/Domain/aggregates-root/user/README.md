### Aggregate - User

```json
{
  "id": "String",
  "email": "String",
  "password": "String",
  "role": "Enum",
  "isActive": "Boolean",
  "isTheEmailConfirmed": "Boolean",
  "acceptedTerms": [
    {
      "ip": "String",
      "date": "Date",
      "os": "String",
      "browser": "String",
      "termVersion": "String"
    }
  ]
}
```

---

#### Value Objects

- Email
- Password

#### Entities

#### Aggregates

#### Methods

- SignIn
- AcceptTerms
- SignUp
- ConfirmEmail
- RequestNewPassword
- ResetPassword
- RequestData
- DeleteAccount

---

- Activate
- Deactivate
- MakeClient
- MakeAdmin
- MakeDeliveryMan
