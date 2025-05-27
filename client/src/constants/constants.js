export const API_URL = import.meta.env.PROD
  ? "https://final-project-pgm-akdeniaz.onrender.com/api"
  : "http://localhost:1337/api";
export const API_TOKEN = import.meta.env.PROD
  ? "719d1074cd669b1c2f2e1b901f8505d6420bd47cd9c81beef19ffd2a2ac2b1ea7cc2e5369a49404ca3328a8851905c2adacbeaf60857cae39e8801251ba4e8dc5faca77b1f5ffca2e24b50fbf522e589b7e2023fd6fdd6cb4ca67acd0bf51e1e7f12ca985182981862f7af6a2f4d9143280b7dca6a4d27bb42084e3bee391088"
  : "8ffa711ab23a87ff205f13f88811b7262d799a62d0e3c73a9db5c5475655199fd06cf536c248a691ed258093c864fc27f6fa02d0a05c3b8eeaad7f1f0c83dba4fff54ee5f287283e83a9547cd15bba1f2962c562776adf0248ba26fb715602ce12f8103ab753f010f5582412aa385640b1daa3bdb847330589903013441a797a";
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
