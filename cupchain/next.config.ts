import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { isServer }) => {
    // Garante que config.externals é um array
    if (!Array.isArray(config.externals)) {
      config.externals = config.externals ? [config.externals] : []
    }

    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'hardhat')

    return config
  },
}

export default nextConfig
