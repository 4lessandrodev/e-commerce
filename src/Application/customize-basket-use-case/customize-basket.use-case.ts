// Segregate add and remove item on different use cases

// Check if user has an opened order
// Get order or create a new one
// Check if Basket exists
// Check if already has customizing basket for order ( and basket id)
// Check if all products on basket products is active (iterate the vector basket items)
// Check available products stocks for all item on basket (iterate the vector basket items)
// Check if user is adding or removing item (info from dto method delete or put)
// Check if product to remove exists on basket (iterate the vector basket items)
// Check available exchangeFactor is enough to add new item
// Incremente or decrement on exchangesFactor
// Check available changesLimit to add or remove item
// Incremente on changesLimit (if changes limit on customization is equal the limit block changes and there is no more exchange factor)
// Save or update custom basket
// Call domain event to update stock for product added or removed
// Ensure call event to update available stock item on basket
