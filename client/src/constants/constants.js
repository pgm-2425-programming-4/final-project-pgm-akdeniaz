export const API_URL = import.meta.env.PROD
  ? "https://final-project-pgm-akdeniaz.onrender.com/api"
  : "http://localhost:1337/api";
export const API_TOKEN = import.meta.env.PROD
  ? "b0a87217b941572e81e13bc20c50dbbd655ad020c4431848dd9da2c0571e47e675d0c6ee5bfb4dfc28606751570af231b4c19a2c098a2a2983dcf030e6b7820987f824c4d601f9f69145f7d936103305404108b43a44808c24ae522029cdfb3b3b085deccf0f58dd02c00d3fd6ad5cad7aabfc35afeb61da1c0598dab1e4b839"
  : "272ed86d94b45690cc7391e8a71bc4e62127f97fe841aa33deea2175623c8fdbe7c6a6b22cb7647ef7182642b4472d704771dcf80f9ad1e8cffcb189d0c4951008c5eeb275f44959b31386321ca7ae726a2983ed37cbbc052022a66973e60adb78a6326cd725b3ed61f104ce80b1ac21e52dbd866acd58877929e24aa09e8e4e";
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
