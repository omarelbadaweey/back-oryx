const express = require('express');
const router = express.Router();
const DeviceToken = require('../models/deviceTokenModel');

router.post('/register-token', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token مطلوب" });

    // احفظ التوكين لو مش موجود بالفعل
    const existing = await DeviceToken.findOne({ token });
    if (!existing) {
      await DeviceToken.create({ token });
    }

    res.status(200).json({ message: 'Token registered' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "فشل تسجيل التوكين", error: err.message });
  }
});

module.exports = router;