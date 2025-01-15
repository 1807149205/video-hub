declare namespace NodeJS {
    interface ProcessEnv {
      MYSQL_USERNAME: string;
      MYSQL_PASSWORD: string;
      MYSQL_DATABASE: string;
      MYSQL_HOST: string;
      MYSQL_PORT: number;
    }
  }
  