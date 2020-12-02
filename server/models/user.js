const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { model, Schema } = require("mongoose");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength:[6, "Password cannot be shorter than 6 characters"]
    },
    authTokens: [{
        authToken: {
            type: String
        }
    }]
}, {
    timestamps: true
});

userSchema.pre("save", async function() {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password, 10);
    }
});

userSchema.statics.signInWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Please provide a valid email and password");
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Please provide a valid email and password");
    }

    return user;
};

// Returns only selected properties
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    const newUserObject = {
        id: userObject.id,
        name: userObject.name,
        username: userObject.username,
        email: userObject.email
    };

    return newUserObject;
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const authToken = jwt.sign({ userID: user._id.toString() }, JWT_SECRET_KEY, { expiresIn: "2m" });

    user.authTokens.push({ authToken });
    await user.save();
    return authToken;
};

const User = model("User", userSchema);

module.exports = User;
