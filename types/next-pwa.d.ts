declare module "next-pwa" {
  import type { NextConfig } from "next";

  export interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    scope?: string;
    sw?: string;
    skipWaiting?: boolean;
    runtimeCaching?: unknown[];
    buildExcludes?: (string | RegExp)[];
    publicExcludes?: string[];
    [key: string]: unknown;
  }

  export default function withPWA(
    config?: PWAConfig
  ): (nextConfig?: NextConfig) => NextConfig;
}
