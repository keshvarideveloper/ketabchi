function kasri(orders, stockProducts) {
	let tempProducts = stockProducts
	for (const order of orders) {
		order.items.forEach(item => {
			tempProducts = tempProducts.map(product =>
				product.code === item.productCode
					? {
							...product,
							stockCount: product.stockCount - item.quantity,
					  }
					: { ...product },
			)
		})
	}
	return tempProducts
		.filter(prd => prd.stockCount < 0)
		.map(prd => ({ ...prd, stockCount: Math.abs(prd.stockCount) }))
}

let products = [
	{ code: '101', price: 1000, stockCount: 1 },
	{ code: '102', price: 1000, stockCount: 2 },
]
let orders = [
	{ code: '1001', bill: 1000, items: [{ productCode: '101', quantity: 1 }] },
	{
		code: '1002',
		bill: 3000,
		items: [
			{ productCode: '101', quantity: 2 },
			{ productCode: '102', quantity: 1 },
		],
	},
]
console.log(kasri(orders, products))
