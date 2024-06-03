// @ts-check
const { test, expect } = require('@playwright/test')

var token

test('should be able to update the booking details', async ({ request }) => {
	//Create a Token which will be used in PUT request

	const response = await request.post(
		`https://restful-booker.herokuapp.com/auth`,
		{
			data: {
				username: 'admin',
				password: 'password123'
			}
		}
	)
	console.log(await response.json())
	expect(response.ok()).toBeTruthy()
	expect(response.status()).toBe(200)
	const responseBody = await response.json()
	token = responseBody.token
	console.log('New Token is: ' + token)

	// PUT
	const updateRequest = await request.put(
		`https://restful-booker.herokuapp.com/booking/145`,
		{
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Cookie: `token=${token}`
			},
			data: {
				firstname: 'Jim',
				lastname: 'Carry',
				totalprice: 111,
				depositpaid: true,
				bookingdates: {
					checkin: '2023-06-01',
					checkout: '2023-06-15'
				},
				additionalneeds: 'Breakfast'
			}
		}
	)
	console.log(await updateRequest.json())
	expect(updateRequest.ok()).toBeTruthy()
	expect(updateRequest.status()).toBe(200)
	const updatedResponseBody = await updateRequest.json()
	expect(updatedResponseBody).toHaveProperty('firstname', 'Jim')
	expect(updatedResponseBody).toHaveProperty('lastname', 'Carry')
	expect(updatedResponseBody).toHaveProperty('totalprice', 111)
	expect(updatedResponseBody).toHaveProperty('depositpaid', true)
})
