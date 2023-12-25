import mongoose, {
    Schema
} from "mongoose";

const infoSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    identificationNumber: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    dateOfIssue: {
        type: String,
    },
    dateOfExpiry: {
        type: String,
    },
});

export default mongoose.model("Info", infoSchema);