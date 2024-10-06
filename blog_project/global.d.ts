declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_DB_USERNAME: string;
    MONGO_DB_PASSWORD: string;
    MONGO_DB_DATABASE: string;
  }
}
