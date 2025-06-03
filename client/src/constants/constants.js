export const API_URL = import.meta.env.PROD
  ? "https://final-project-pgm-akdeniaz.onrender.com/api"
  : "http://localhost:1337/api";
export const API_TOKEN = import.meta.env.PROD
  ? "719d1074cd669b1c2f2e1b901f8505d6420bd47cd9c81beef19ffd2a2ac2b1ea7cc2e5369a49404ca3328a8851905c2adacbeaf60857cae39e8801251ba4e8dc5faca77b1f5ffca2e24b50fbf522e589b7e2023fd6fdd6cb4ca67acd0bf51e1e7f12ca985182981862f7af6a2f4d9143280b7dca6a4d27bb42084e3bee391088"
  : "0460f5cc4b2a45050cdfc7f1eb32919185ce05bd6c6b722fd5a9af77716288934818962242c6cae8fd89e051c0291bcc858ca9607e93ee3e7771a2287ba9d9f1308583a7b89a2a0933080e96a2aec920ffbebad3e7230f3153d2a9786a85e00234d8016202f8a5e1ddc40f2b405863d954b293ba4e5eebe47115a64461c846ad";
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
