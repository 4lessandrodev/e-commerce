import { Result, ValueObject } from 'types-ddd';

interface OrderIdProps {
  value: string;
}

export class OrderIdValueObject extends ValueObject<OrderIdProps> {
  private constructor(props: OrderIdProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static generate(): string {
    const currentDate = new Date();
    const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    const startsYear = 1900;
    let sum = 0;

    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

    const partOne =
      currentDate.getDate() +
      (currentDate.getFullYear() - startsYear) +
      currentDate.getMonth() +
      currentDate.getDay() +
      currentDate.getHours() +
      currentDate.getMinutes();

    const secondPart =
      currentDate.getMilliseconds() +
      currentDate.getMinutes() +
      Math.floor(Math.random() * 100) +
      '0000';

    const partTwo = secondPart.slice(0, 4);
    const order = partOne + partTwo;

    for (let digit = 0; digit < order.length; digit++) {
      var value = order.slice(digit, digit + 1);
      sum += parseInt(value);
    }

    return `${randomLetter}${partOne}${sum}-${partTwo}`;
  }

  public static create(id?: string): Result<OrderIdValueObject> {
    const value = id ?? OrderIdValueObject.generate();

    return Result.ok<OrderIdValueObject>(new OrderIdValueObject({ value }));
  }
}
