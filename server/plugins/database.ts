import mongoose from "mongoose"

async function connectToDatabase() {
	const config = useRuntimeConfig()

	try {
		await mongoose.connect(config.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log("\x1b[32m", "[database-connection] MongoDB Connected", "\x1b[0m")
	} catch (error) {
		console.error("Unable to connect to the database:", error)
	}
}

// Example usage within a Nitro plugin
export default defineNitroPlugin(async (nitroApp) => {
	await connectToDatabase()

	// You can attach the mongoose connection to the nitro context if needed
	nitroApp.hooks.hook("request", async () => {
		nitroApp.context.db = mongoose
	})
})
