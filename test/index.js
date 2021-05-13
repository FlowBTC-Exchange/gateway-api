const Rest = require('../src/index')

const fun = async () => {
	const Flow = new Rest(true)

	const Login = await Flow.login('anderson.juhasc@gmail.com', '123456')

	if (Login.success) {
		const newAddress = await Flow.newSimpleAddress('eth')
		console.log(newAddress)

		const explore = await Flow.explore('eth', newAddress.address)
		console.log(explore)
	}
}

fun()
