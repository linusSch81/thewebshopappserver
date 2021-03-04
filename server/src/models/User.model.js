/** mongoose - Schema https://mongoosejs.com/docs/guide.html */
/** {timestamps: true} We want to be able to track everything e.g when user changes username etc */
import mongoose from "mongoose"; // ODM
const { Schema } = mongoose;

const userSchema = Schema(
	{
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
			required: true,
		},
	},
	{ timestamps: true }
);
const userModel = mongoose.model("user", userSchema);
export default userModel;
