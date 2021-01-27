function readyOrders(allOrders, stockProducts) {
	const result = { orders: [], products: [] }
	for (const order of allOrders) {
		try {
			var BreakException = {}
			var orderCount = 0
			var orderItems = order.items.length
			order.items.forEach(item => {
				const productExist = stockProducts.some(
					product =>
						product.code === item.productCode &&
						product.stockCount >= item.quantity,
				)
				if (!productExist) throw BreakException
				orderCount++
				stockProducts = stockProducts.map(product =>
					product.code == item.productCode
						? {
								...product,
								stockCount: product.stockCount - item.quantity,
						  }
						: { ...product },
				)
				if (orderCount >= orderItems) result.orders.push(order)
			})
		} catch (e) {
			if (e !== BreakException) console.log('e', e)
		}
	}
	result.products.push(stockProducts)
	return result
}

let products = [
	{ code: '101', price: 1000, stockCount: 7 },
	{ code: '102', price: 1000, stockCount: 2 },
]
let orders = [
	{ code: '1001', bill: 1000, items: [{ productCode: '101', quantity: 3 }] },
	{
		code: '1002',
		bill: 3000,
		items: [
			{ productCode: '101', quantity: 3 },
			{ productCode: '102', quantity: 1 },
		],
	},
]
console.log(JSON.stringify(readyOrders(orders, products), null, '\t'))
