
// Coffee: {{bot.coffeeAmount}}/{{bot.maxCoffee}} cups of {{bot.coffeeFlavor}}

// Do setup
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el: "#app",
		template: `<div id="app">
			<chat-widget :messages="messages" />

			Shopping Cart: $ {{bot.cartAmount}} |  {{bot.cartItems}} items.

			<div id="controls">
				<div>
					What are you looking for?
					<input ref="input" v-model="currentInput" @keyup="sayKey" @keyup.enter="enterInput">
					<button @click="enterInput">↩️</button>
				</div>
				<div>
					<button @click="handleInput('I am just walking.')">take a walk</button>
					<button @click="handleInput('I am hungry.')">buy some seafood</button>
					<button @click="handleInput('I want a car.')">buy a car</button>
					<button @click="handleInput('I am thirsty.')">buy a drink</button>
				</div>
				<div>
					<button @click="handleInput('show cart')">show cart</button>
					<button @click="handleInput('clear cart')">clear cart</button>
				</div>
				<div>
					<button @click="handleInput('checkout')">$checkout$</button>
					<button @click="handleInput('leave without paying')">leave without paying</button>
				</div>
				<div>
				</div>


			</div>

		</div>`,

		watch: {
			// currentInput() {
			// 	console.log('Input is now', this.currentInput)
			// },

			messages() {
				// console.log("messages", this.messages)
			}
		},

		methods: {
			sayKey() {
				console.log("KEY")
			},

			postToChat(text, owner, isSelf) {
				this.messages.push({
					text: text,
					isSelf: isSelf,
					owner: owner,
				})
			},

			enterInput() {
				let text = this.currentInput
				this.currentInput = ""


				this.handleInput(text)

			},

			handleInput(text) {
				// Does bot things
				this.postToChat(text, "😐", true)

				// Add to the messages in chat

				// Bot does something
				let output = this.bot.respondTo(text)

				setTimeout(() => {
					this.postToChat(output, "☕️")

				}, Math.random()*100 + 400)

			}
		},

		mounted() {

			console.log("Vue app is all set up....")
			setInterval(() => {
				// this.currentInput = randomMessage()

			}, 1000)

			this.bot.post = (text) =>  {
				// this is now the vue object
				this.postToChat(text, "☕️")
			}

		},


		data() {
			return {
				// Store the bot
				bot: new CoffeeBot(),

				// And the message
				messages: [],

				// And the current thing in the input
				currentInput: ""
			}
		}
	})
})
