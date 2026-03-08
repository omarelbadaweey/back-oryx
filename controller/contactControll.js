
const Contact = require('../models/contactModel'); // تأكد من المسار صح

const contactController = {
    // 1. إرسال بيانات (POST)
    createData: async (req, res) => {
        try {
            console.log("بيانات واصلة من الفرونت:", req.body);
            
            // استخراج البيانات (تأكد إن الأسامي دي هي اللي مبعوثة من الفرونت)
            const { fullName, email, phoneNumber, projectType, message } = req.body;

            const newData = new Contact({
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                projectType: projectType ,
                message: message
            });

            const savedData = await newData.save();

            res.status(201).json(savedData);
        } catch (error) {
            console.error("خطأ أثناء الحفظ:", error);
            res.status(500).json({ message: "فشل حفظ البيانات", error: error.message });
        }
    },

    // 2. جلب كل البيانات (GET)
    getAllData: async (req, res) => {
        try {
            const allData = await Contact.find().sort({ createdAt: -1 });
            res.status(200).json(allData);
        } catch (error) {
            res.status(500).json({ message: "خطأ في جلب البيانات", error: error.message });
        }
    },

    // 3. حذف بيان (DELETE)
    deletedData: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await Contact.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({ message: "العنصر غير موجود" });
            }
            res.status(200).json({ message: "تم الحذف بنجاح" });
        } catch (error) {
            res.status(500).json({ message: "خطأ في عملية الحذف", error: error.message });
        }
    },

    // 4. تحديث الحالة (PATCH/PUT)
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await Contact.findByIdAndUpdate(
                id,
                { isRead: true },
                { new: true }
            );
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).json({ message: "خطأ في التحديث", error: error.message });
        }
    }
};

module.exports = contactController;