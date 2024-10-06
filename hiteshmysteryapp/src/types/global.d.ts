declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    RESEND_API_KEY: string;
    NEXTAUTH_SECRET: string;
    OPENAI_API_KEY: string;
  }
}
