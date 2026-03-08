
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "الاسم مطلوب"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "البريد الإلكتروني مطلوب"],
        match: [/.+\@.+\..+/, "يرجى إدخال بريد إلكتروني صحيح"],
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: [true, "رقم الهاتف مطلوب"],
        minlength: [11, "رقم الهاتف يجب أن يكون 11 رقم"],
        maxlength: [11, "رقم الهاتف لا يمكن أن يتجاوز 11 رقم"],
        match: [/^[0-9]+$/, "يرجى إدخال أرقام فقط"]
    },
    projectType: { // اللي هو الـ select في السكيمة القديمة
        type: String,
        required: [true, "نوع المشروع مطلوب"]
    },
    message: {
        type: String,
        required: [true, "تفاصيل المشروع مطلوبة"],
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // أضفت لك التوقيت عشان تعرف الرسالة جات ميتى

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;