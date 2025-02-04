const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretyKey = process.env.KEY;

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 11
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    carts: {
        type: Array,
        default: []
    },
    favouriates: {
        type: Array,
        default: []
    },
});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({ _id: this._id.toString() }, secretyKey);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
        throw new Error('Error generating auth token');
    }
};

userSchema.methods.addcartdata = async function(cart) {
    try {
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts;
    } catch (error) {
        console.log(error);
        throw new Error('Error adding to cart');
    }
};

userSchema.methods.addfavdata = async function(fav) {
    try {
        this.favouriates = this.favouriates.concat(fav);
        await this.save();
        return this.favouriates;
    } catch (error) {
        console.log(error);
        throw new Error('Error adding to favourites');
    }
};

const userModel = mongoose.model("USER", userSchema);

module.exports = userModel;
