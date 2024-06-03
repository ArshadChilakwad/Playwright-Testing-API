// @ts-check
const { test, expect } = require('@playwright/test')

//test case 1
test('should be able to create a booking', async ({ request }) => {
	const response = await request.post(
		`https://restful-booker.herokuapp.com/booking `,
		{
			data: {
				firstname: 'John',
				lastname: 'Wick',
				totalprice: 213,
				depositpaid: true,
				bookingdates: {
					checkin: '2024-05-01',
					checkout: '2024-05-15'
				},
				additionalneeds: 'Breakfast'
			}
		}
	)
	console.log(await response.json())
	expect(response.ok()).toBeTruthy()
	expect(response.status()).toBe(200)
	const responseBody = await response.json()
	expect(responseBody.booking).toHaveProperty('firstname', 'John')
	expect(responseBody.booking).toHaveProperty('lastname', 'Wick')
	expect(responseBody.booking).toHaveProperty('totalprice', 213)
	expect(responseBody.booking).toHaveProperty('depositpaid', true)
})
