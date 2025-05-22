export const API_URL = import.meta.env.PROD
  ? "https://jammin-playground.onrender.com/api"
  : "http://localhost:1337/api";
export const API_TOKEN =import.meta.env.PROD
  ? "PROD token"
  : "a78b19ea610f99913032e6eeb0108b63cff073b48984a3eed283d670339c3adbcaac1edf487b688f89de02b8b51bfacdf74a27b68be3e1f99f6d9fc8fa104caaedf97ede5a651d5ed6e0eebe2c73da1c58a80b7b7ebcdad4a6ac85329ba87116e695cb5e91734db3d85514dd72be1894393ad361ab9f8b504a4023ee500a6902";
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
