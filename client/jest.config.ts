import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

const presetCjs = createCjsPreset(
    {
        tsconfig: 'tsconfig.spec.json',
        collectCoverage: true,
        coverageDirectory: 'coverage/my-app',
        coverageReporters: ['text', 'html'],
        setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
        transform: {
            '^.+\\.m?[jt]sx?$': 'babel-jest',
            '^.+\\.(ts|html)$': 'jest-preset-angular/build/transform',
        },
    }
);

export default {
  ...presetCjs,
  testMatch: ['<rootDir>/src/app/**/*.spec.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|@ngrx|@swimlane|d3-|internmap|ngx-papaparse))',
  ],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;