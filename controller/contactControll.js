
// const Contact = require('../models/contactModel'); // تأكد من المسار صح

// const contactController = {
//     // 1. إرسال بيانات (POST)
//     createData: async (req, res) => {
//         try {
//             console.log("بيانات واصلة من الفرونت:", req.body);
            
//             // استخراج البيانات (تأكد إن الأسامي دي هي اللي مبعوثة من الفرونت)
//             const { fullName, email, phoneNumber, projectType, message } = req.body;

//             const newData = new Contact({
//                 fullName: fullName,
//                 email: email,
//                 phoneNumber: phoneNumber,
//                 projectType: projectType ,
//                 message: message
//             });

//             const savedData = await newData.save();

//             res.status(201).json(savedData);
//         } catch (error) {
//             console.error("خطأ أثناء الحفظ:", error);
//             res.status(500).json({ message: "فشل حفظ البيانات", error: error.message });
//         }
//     },

//     // 2. جلب كل البيانات (GET)
//     getAllData: async (req, res) => {
//         try {
//             const allData = await Contact.find().sort({ createdAt: -1 });
//             res.status(200).json(allData);
//         } catch (error) {
//             res.status(500).json({ message: "خطأ في جلب البيانات", error: error.message });
//         }
//     },

//     // 3. حذف بيان (DELETE)
//     deletedData: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const deleted = await Contact.findByIdAndDelete(id);
//             if (!deleted) {
//                 return res.status(404).json({ message: "العنصر غير موجود" });
//             }
//             res.status(200).json({ message: "تم الحذف بنجاح" });
//         } catch (error) {
//             res.status(500).json({ message: "خطأ في عملية الحذف", error: error.message });
//         }
//     },

//     // 4. تحديث الحالة (PATCH/PUT)
//     updateStatus: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const updated = await Contact.findByIdAndUpdate(
//                 id,
//                 { isRead: true },
//                 { new: true }
//             );
//             res.status(200).json(updated);
//         } catch (error) {
//             res.status(500).json({ message: "خطأ في التحديث", error: error.message });
//         }
//     }
// };

// module.exports = contactController;



// const Contact = require('../models/contactModel'); // تأكد من المسار صح
// const DeviceToken = require('../models/deviceTokenModel'); // DB لتخزين Tokens
// const fetch = require("node-fetch"); // لإرسال الإشعارات

// // دالة لإرسال Notification لكل Device Token
// async function sendPushNotification(expoPushToken, title, body) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: title,
//     body: body,
//     data: { type: 'new_order' }, // ممكن تضيف أي بيانات إضافية
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: { 
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(message),
//   });
// }

// const contactController = {
//     // 1. إرسال بيانات (POST) + Push Notification
//     createData: async (req, res) => {
//         try {
//             console.log("بيانات واصلة من الفرونت:", req.body);
            
//             // استخراج البيانات
//             const { fullName, email, phoneNumber, projectType, message } = req.body;

//             // حفظ البيانات في MongoDB
//             const newData = new Contact({
//                 fullName,
//                 email,
//                 phoneNumber,
//                 projectType,
//                 message
//             });

//             const savedData = await newData.save();

//             // -----------------------------
//             // إرسال Push Notification لكل الأجهزة المسجلة
//             // -----------------------------
//             const allTokens = await DeviceToken.find().select('token -_id');

//             for (const t of allTokens) {
//               try {
//                 await sendPushNotification(
//                   t.token,
//                   "طلب جديد",
//                   `جاء طلب جديد من ${fullName} - نوع المشروع: ${projectType}`
//                 );
//               } catch (err) {
//                 console.log("خطأ في إرسال Notification:", err);
//               }
//             }

//             res.status(201).json(savedData);

//         } catch (error) {
//             console.error("خطأ أثناء الحفظ:", error);
//             res.status(500).json({ message: "فشل حفظ البيانات أو الإشعار", error: error.message });
//         }
//     },

//     // 2. جلب كل البيانات (GET)
//     getAllData: async (req, res) => {
//         try {
//             const allData = await Contact.find().sort({ createdAt: -1 });
//             res.status(200).json(allData);
//         } catch (error) {
//             res.status(500).json({ message: "خطأ في جلب البيانات", error: error.message });
//         }
//     },

//     // 3. حذف بيان (DELETE)
//     deletedData: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const deleted = await Contact.findByIdAndDelete(id);
//             if (!deleted) {
//                 return res.status(404).json({ message: "العنصر غير موجود" });
//             }
//             res.status(200).json({ message: "تم الحذف بنجاح" });
//         } catch (error) {
//             res.status(500).json({ message: "خطأ في عملية الحذف", error: error.message });
//         }
//     },

//     // 4. تحديث الحالة (PATCH/PUT)
//     updateStatus: async (req, res) => {
//         try {
//             const { id } = req.params;
//             const updated = await Contact.findByIdAndUpdate(
//                 id,
//                 { isRead: true },
//                 { new: true }
//             );
//             res.status(200).json(updated);
//         } catch (error) {
//             res.status(500).json({ message: "خطأ في التحديث", error: error.message });
//         }
//     }
// };

// module.exports = contactController;




const Contact = require('../models/contactModel');
const DeviceToken = require('../models/deviceTokenModel');
const fetch = require("node-fetch");

async function sendPushNotification(expoPushToken, title, body) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { type: 'new_order' },
  };

  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.log("Error sending notification:", err);
  }
}

const contactController = {
    createData: async (req, res) => {
        try {
            const { fullName, email, phoneNumber, projectType, message } = req.body;

            const newData = new Contact({
                fullName,
                email,
                phoneNumber,
                projectType,
                message
            });

            const savedData = await newData.save();

            // إرسال Push Notification لكل الأجهزة المسجلة
            const allTokens = await DeviceToken.find().select('token -_id');
            for (const t of allTokens) {
              await sendPushNotification(
                t.token,
                "طلب جديد",
                `جاء طلب جديد من ${fullName} - نوع المشروع: ${projectType}`
              );
            }

            res.status(201).json(savedData);
        } catch (error) {
            console.error("خطأ أثناء الحفظ أو الإشعار:", error);
            res.status(500).json({ message: "فشل الحفظ أو الإشعار", error: error.message });
        }
    },

    getAllData: async (req, res) => {
        try {
            const allData = await Contact.find().sort({ createdAt: -1 });
            res.status(200).json(allData);
        } catch (error) {
            res.status(500).json({ message: "خطأ في جلب البيانات", error: error.message });
        }
    },

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