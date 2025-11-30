export const API_URL = import.meta.env.PROD
  ? "https://final-project-pgm-akdeniaz.onrender.com/api"
  : "http://localhost:1337/api";
export const API_TOKEN = import.meta.env.PROD
  ? "79279130516b46cc59be7b3da13869acca08f28ae956de4e05b0e33e63e23f12d0c8086b27c957686be9234aecfb45b29994a89e0aa98d90c7e9266eaabc05d72b22c4024cfc4555c0285f6ba9c34833103ffa24bc1ca22f6f45eb405a45bbaaa7a2b44333cff444090003d71c7a65c6a41dad92befb8becebae355bf0420dd3"
  : "272ed86d94b45690cc7391e8a71bc4e62127f97fe841aa33deea2175623c8fdbe7c6a6b22cb7647ef7182642b4472d704771dcf80f9ad1e8cffcb189d0c4951008c5eeb275f44959b31386321ca7ae726a2983ed37cbbc052022a66973e60adb78a6326cd725b3ed61f104ce80b1ac21e52dbd866acd58877929e24aa09e8e4e";
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
