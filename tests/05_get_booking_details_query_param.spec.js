// @ts-check
const { test, expect } = require('@playwright/test')
const bookingDetails = require('../testd-data/booking-details.json')
test('should be able to get subset of booking details using query parameters', async ({
	request
}) => {
	const response = await request.get(
		`https://restful-booker.herokuapp.com/booking`,
		{
			params: {
				checkin: bookingDetails.bookingdates.checkin
				//checkout: bookingDetails.bookingdates.checkout
			}
		}
	)
	console.log(await response.json())
	expect(response.ok()).toBeTruthy()
	expect(response.status()).toBe(200)
})
