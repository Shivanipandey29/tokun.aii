const { requireAuth } = require("../utils/auth");
const { ensureDailyQuota, spendTokens } = require("../utils/quota");
const express = require("express");

const router = express.Router();

// GET /api/auth/quota -> check today's remaining tokens
router.get("/", requireAuth, async (req, res) => {
  try {
    
    return res.json({
      user:req.user,
      success: true,
      
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: "server_error" });
  }
});
 

module.exports = router;
