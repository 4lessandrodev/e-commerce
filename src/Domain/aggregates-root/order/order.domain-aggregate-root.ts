import { AggregateRoot, Result } from 'types-ddd';
import { OrderProps } from './order.domain-aggregate.interface';

export class Order extends AggregateRoot<OrderProps> {
  private constructor(props: OrderProps) {
    super(props);
  }

  public static create(props: OrderProps): Result<Order> {
    return Result.ok<Order>(new Order(props));
  }
}
