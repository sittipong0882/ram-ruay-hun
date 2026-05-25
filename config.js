// =============================================
// CONFIGURATION - Auto-generated from .env
// =============================================
// This file is generated automatically and should not be edited directly.
// Modify .env file instead.

const APP_CONFIG = {
  ADMIN_USERNAME: "Adminket",
  ADMIN_PASSWORD: "admin1234",
  ADMIN_NAME: "Adminket",
};

// Helper function to get config value
function getConfig(key, defaultValue = null) {
  return APP_CONFIG[key] !== undefined ? APP_CONFIG[key] : defaultValue;
}
