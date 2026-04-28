/// <reference types="vite/client" />

declare module "*.css";
declare module "*.scss";
declare module "*.sass";

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
