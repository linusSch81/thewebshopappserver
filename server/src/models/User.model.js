/** mongoose - Schema https://mongoosejs.com/docs/guide.html */
import mongoose from "mongoose" // ODM
const {Schema} = mongoose

const userSchema = Schema({
	//username: String
	username: {
		type: String,
		unique: true,
		allowNull: false,
		required: true,
		//lowercase: true,

	},
	age: {
		type: Number,
		min: [18, "Sorry, you need to be at least 18 years old"],
		max: [90, "Sorry"],
		// required: false
	},
	password: {
		type: String,
		required: true
	}
},{timestamps: true})

/** {timestamps: true} Vi vill ha koll på allt, typ om och när användaren byter namn address osv */


const userModel = mongoose.model("user", userSchema)
export default userModel