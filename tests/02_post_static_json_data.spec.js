// @ts-check
const { test, expect } = require('@playwright/test')
const bookingDetails = require('../testd-data/booking-details.json')
// const dataSet = JSON.parse(
//     JSON.stringify(require("../testd-data/booking-details.json"))
//   );
//testcase 2
test('should be able to create a booking', async ({ request }) => {
	const response = await request.post(
		`https://restful-booker.herokuapp.com/booking`,
		{
			data: bookingDetails
		}
	)
	console.log(await response.json())
	expect(response.ok()).toBeTruthy()
	expect(response.status()).toBe(200)
	const responseBody = await response.json()
	expect(responseBody.booking).toHaveProperty(
		'firstname',
		bookingDetails.firstname
	)
	expect(responseBody.booking).toHaveProperty(
		'lastname',
		bookingDetails.lastname
	)
	expect(responseBody.booking).toHaveProperty(
		'totalprice',
		bookingDetails.totalprice
	)
	expect(responseBody.booking).toHaveProperty(
		'depositpaid',
		bookingDetails.depositpaid
	)
})
