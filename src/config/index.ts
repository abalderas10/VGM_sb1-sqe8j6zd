export const SERVER_CONFIG = {
  IP: 'localhost',
  PORT: 3000,
  get BASE_URL() {
    return `http://${this.IP}:${this.PORT}`;
  }
};

export const APP_CONFIG = {
  SITE_NAME: 'VillaGaleon',
  SITE_DESCRIPTION: 'Luxury Caribbean Villa & Yacht Experience',
  CONTACT_EMAIL: 'info@villagaleon.com',
  CONTACT_PHONE: '+52 (998) 123-4567'
};