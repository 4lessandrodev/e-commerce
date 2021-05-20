/**
 * Enum:
 * PENDING
 * Customer started the checkout process but did not complete it. Incomplete orders are assigned a "Pending" status and can be found under the More tab in the View Orders screen.
 *
 * AWAITING_PAYMENT
 * Customer has completed the checkout process, but payment has yet to be confirmed. Authorize only transactions that are not yet captured have this status.
 *
 * AWAITING_FULFILLMENT
 * Customer has completed the checkout process and payment has been confirmed.
 *
 * AWAITING_SHIPMENT
 * Order has been pulled and packaged and is awaiting collection from a shipping provider.
 *
 * AWAITING_PICKUP
 * Order has been packaged and is awaiting customer pickup from a seller-specified location.
 *
 * PARTIALLY_SHIPPED
 * Only some items in the order have been shipped.
 *
 * COMPLETED
 * Order has been shipped/picked up, and receipt is confirmed; client has paid for their digital product, and their file(s) are available for download.
 *
 * SHIPPED
 * Order has been shipped, but receipt has not been confirmed; seller has used the Ship Items action. A listing of all orders with a "Shipped" status can be found under the More tab of the View Orders screen.
 *
 * CANCELLED
 * Seller has cancelled an order, due to a stock inconsistency or other reasons. Stock levels will automatically update depending on your Inventory Settings. Cancelling an order will not refund the order. This status is triggered automatically when
 *
 * DECLINED
 * Seller has marked the order as declined.
 *
 * REFUNDED
 * Seller has used the Refund action to refund the whole order. A listing of all orders with a "Refunded" status can be found under the More tab of the View Orders screen.
 *
 * DISPUTED
 * Customer has initiated a dispute resolution process for the PayPal transaction that paid for the order or the seller has marked the order as a fraudulent order.
 *
 * MANUAL_VERIFICATION_REQUIRED
 * Order on hold while some aspect, such as tax-exempt documentation, is manually confirmed. Orders with this status must be updated manually. Capturing funds or other order actions will not automatically update the status of an order marked Manual Verification Required.
 *
 * PARTIALLY_REFUNDED
 * Seller has partially refunded the order.
 */
