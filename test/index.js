const Rest = require('../src/index')

const fun = async () => {
	const Flow = new Rest('https://flowgateway-testnet.herokuapp.com/api/v1')

	const Login = await Flow.login('email@gmail.com', '123456')

	console.log(Login)
}

fun()
