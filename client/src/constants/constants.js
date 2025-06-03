export const API_URL = import.meta.env.PROD
  ? "https://final-project-pgm-akdeniaz.onrender.com/api"
  : "http://localhost:1337/api";
export const API_TOKEN = import.meta.env.PROD
  ? "0460f5cc4b2a45050cdfc7f1eb32919185ce05bd6c6b722fd5a9af77716288934818962242c6cae8fd89e051c0291bcc858ca9607e93ee3e7771a2287ba9d9f1308583a7b89a2a0933080e96a2aec920ffbebad3e7230f3153d2a9786a85e00234d8016202f8a5e1ddc40f2b405863d954b293ba4e5eebe47115a64461c846ad"
  : "272ed86d94b45690cc7391e8a71bc4e62127f97fe841aa33deea2175623c8fdbe7c6a6b22cb7647ef7182642b4472d704771dcf80f9ad1e8cffcb189d0c4951008c5eeb275f44959b31386321ca7ae726a2983ed37cbbc052022a66973e60adb78a6326cd725b3ed61f104ce80b1ac21e52dbd866acd58877929e24aa09e8e4e";
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
