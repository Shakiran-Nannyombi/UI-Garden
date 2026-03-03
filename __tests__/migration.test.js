/**
 * Unit Tests for Vercel Deployment Migration
 * 
 * These tests validate the file system changes made during the migration
 * from GCP Docker-based deployment to Vercel serverless platform.
 * 
 * Validates: Examples 1, 2, 7, 8 from the design document
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

describe('Vercel Deployment Migration - File System Changes', () => {

    describe('Example 1: Docker Files Removed', () => {

        test('Dockerfile should not exist', () => {
            const dockerfilePath = path.join(projectRoot, 'Dockerfile');
            const exists = fs.existsSync(dockerfilePath);
            assert.strictEqual(exists, false, 'Dockerfile should not exist after migration');
        });

        test('.dockerignore should not exist', () => {
            const dockerignorePath = path.join(projectRoot, '.dockerignore');
            const exists = fs.existsSync(dockerignorePath);
            assert.strictEqual(exists, false, '.dockerignore should not exist after migration');
        });
    });

    describe('Example 2: Vercel Configuration Exists and Is Valid', () => {

        test('vercel.json should exist', () => {
            const vercelJsonPath = path.join(projectRoot, 'vercel.json');
            const exists = fs.existsSync(vercelJsonPath);
            assert.strictEqual(exists, true, 'vercel.json should exist after migration');
        });

        test('vercel.json should contain valid JSON', () => {
            const vercelJsonPath = path.join(projectRoot, 'vercel.json');
            const content = fs.readFileSync(vercelJsonPath, 'utf-8');

            assert.doesNotThrow(() => {
                JSON.parse(content);
            }, 'vercel.json should contain valid JSON');
        });

        test('vercel.json should have buildCommand set to "npm run build"', () => {
            const vercelJsonPath = path.join(projectRoot, 'vercel.json');
            const content = fs.readFileSync(vercelJsonPath, 'utf-8');
            const config = JSON.parse(content);

            assert.strictEqual(
                config.buildCommand,
                'npm run build',
                'buildCommand should be "npm run build"'
            );
        });

        test('vercel.json should have outputDirectory set to "dist"', () => {
            const vercelJsonPath = path.join(projectRoot, 'vercel.json');
            const content = fs.readFileSync(vercelJsonPath, 'utf-8');
            const config = JSON.parse(content);

            assert.strictEqual(
                config.outputDirectory,
                'dist',
                'outputDirectory should be "dist"'
            );
        });

        test('vercel.json should have installCommand set to "npm install"', () => {
            const vercelJsonPath = path.join(projectRoot, 'vercel.json');
            const content = fs.readFileSync(vercelJsonPath, 'utf-8');
            const config = JSON.parse(content);

            assert.strictEqual(
                config.installCommand,
                'npm install',
                'installCommand should be "npm install"'
            );
        });

        test('vercel.json should have SPA rewrite rule', () => {
            const vercelJsonPath = path.join(projectRoot, 'vercel.json');
            const content = fs.readFileSync(vercelJsonPath, 'utf-8');
            const config = JSON.parse(content);

            assert.ok(Array.isArray(config.rewrites), 'rewrites should be an array');
            assert.ok(config.rewrites.length > 0, 'rewrites array should not be empty');

            const spaRule = config.rewrites.find(
                rule => rule.source === '/(.*)' && rule.destination === '/index.html'
            );

            assert.ok(
                spaRule,
                'vercel.json should contain SPA rewrite rule: { source: "/(.*)", destination: "/index.html" }'
            );
        });
    });

    describe('Example 7: Deployment Documentation Updated', () => {

        test('README.md should exist', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const exists = fs.existsSync(readmePath);
            assert.strictEqual(exists, true, 'README.md should exist');
        });

        test('README.md should contain Deployment section', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            assert.ok(
                content.includes('## Deployment') || content.includes('# Deployment'),
                'README.md should contain a Deployment section'
            );
        });

        test('README.md should mention Vercel', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            assert.ok(
                content.toLowerCase().includes('vercel'),
                'README.md should mention Vercel in deployment instructions'
            );
        });

        test('README.md should mention GEMINI_API_KEY configuration', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            assert.ok(
                content.includes('GEMINI_API_KEY') || content.includes('GOOGLE_API_KEY'),
                'README.md should mention API key configuration'
            );
        });

        test('README.md should provide environment variable instructions', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            const hasEnvVarSection =
                content.includes('Environment Variables') ||
                content.includes('environment variables') ||
                content.includes('Environment Variable');

            assert.ok(
                hasEnvVarSection,
                'README.md should provide instructions for configuring environment variables'
            );
        });

        test('README.md should mention automatic deployments', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            const hasAutoDeployInfo =
                content.includes('automatic') ||
                content.includes('git push') ||
                content.includes('main branch');

            assert.ok(
                hasAutoDeployInfo,
                'README.md should mention automatic deployments on git push'
            );
        });

        test('README.md should mention Vercel CLI deployment', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            const hasVercelCLI =
                content.includes('vercel') &&
                (content.includes('CLI') || content.includes('command') || content.includes('npm install -g vercel'));

            assert.ok(
                hasVercelCLI,
                'README.md should include Vercel CLI deployment instructions'
            );
        });

        test('README.md should NOT contain Docker references', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            // Check for common Docker-related terms
            const dockerTerms = ['Dockerfile', 'docker build', 'docker run', 'docker-compose'];
            const foundDockerTerms = dockerTerms.filter(term =>
                content.toLowerCase().includes(term.toLowerCase())
            );

            assert.strictEqual(
                foundDockerTerms.length,
                0,
                `README.md should not contain Docker references. Found: ${foundDockerTerms.join(', ')}`
            );
        });

        test('README.md should NOT contain GCP references', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            // Check for common GCP-related terms
            const gcpTerms = [
                'Google Cloud Platform',
                'GCP',
                'Cloud Run',
                'gcloud',
                'Google Cloud Console'
            ];

            const foundGcpTerms = gcpTerms.filter(term =>
                content.toLowerCase().includes(term.toLowerCase())
            );

            assert.strictEqual(
                foundGcpTerms.length,
                0,
                `README.md should not contain GCP references. Found: ${foundGcpTerms.join(', ')}`
            );
        });
    });

    describe('Example 8: Existing Documentation Sections Preserved', () => {

        test('README.md should preserve "The Game Experience" section', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            assert.ok(
                content.includes('The Game Experience') || content.includes('Game Experience'),
                'README.md should preserve "The Game Experience" section'
            );
        });

        test('README.md should preserve "The Vibe Matrix" section', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            assert.ok(
                content.includes('The Vibe Matrix') || content.includes('Vibe Matrix'),
                'README.md should preserve "The Vibe Matrix" section'
            );
        });

        test('README.md should preserve "Tech Stack" section', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            assert.ok(
                content.includes('Tech Stack') || content.includes('Tech Stack & Workflow'),
                'README.md should preserve "Tech Stack" section'
            );
        });

        test('README.md should preserve "ENTER THE VOID" section', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            assert.ok(
                content.includes('ENTER THE VOID'),
                'README.md should preserve "ENTER THE VOID" section'
            );
        });

        test('README.md should preserve project description and badges', () => {
            const readmePath = path.join(projectRoot, 'README.md');
            const content = fs.readFileSync(readmePath, 'utf-8');

            assert.ok(
                content.includes('UI Garden') || content.includes('gamified design playground'),
                'README.md should preserve project description'
            );
        });
    });
});

describe('Example 3 & 4: Build System Remains Functional and Local Development Workflow Preserved', () => {

    test('npm install should complete successfully', async () => {
        const { execSync } = await import('node:child_process');

        assert.doesNotThrow(() => {
            execSync('npm install', {
                cwd: projectRoot,
                stdio: 'pipe',
                timeout: 120000 // 2 minute timeout
            });
        }, 'npm install should complete without errors');
    });

    test('npm run build should complete successfully', async () => {
        const { execSync } = await import('node:child_process');

        assert.doesNotThrow(() => {
            execSync('npm run build', {
                cwd: projectRoot,
                stdio: 'pipe',
                timeout: 120000 // 2 minute timeout
            });
        }, 'npm run build should complete without errors');
    });

    test('dist/ directory should exist after build', () => {
        const distPath = path.join(projectRoot, 'dist');
        const exists = fs.existsSync(distPath);
        assert.strictEqual(exists, true, 'dist/ directory should exist after build');
    });

    test('dist/index.html should exist as entry point', () => {
        const indexPath = path.join(projectRoot, 'dist', 'index.html');
        const exists = fs.existsSync(indexPath);
        assert.strictEqual(exists, true, 'dist/index.html should exist as entry point');
    });

    test('dist/index.html should contain script and link tags', () => {
        const indexPath = path.join(projectRoot, 'dist', 'index.html');
        const content = fs.readFileSync(indexPath, 'utf-8');

        assert.ok(
            content.includes('<script') || content.includes('<link'),
            'dist/index.html should contain script or link tags for assets'
        );
    });

    test('package.json should contain all expected npm scripts', () => {
        const packageJsonPath = path.join(projectRoot, 'package.json');
        const content = fs.readFileSync(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(content);

        assert.ok(packageJson.scripts, 'package.json should have scripts section');
        assert.ok(packageJson.scripts.dev, 'package.json should have "dev" script');
        assert.ok(packageJson.scripts.build, 'package.json should have "build" script');
        assert.ok(packageJson.scripts.preview, 'package.json should have "preview" script');
    });
});

describe('Example 6: Public Assets Copied to Build Output', () => {

    test('public/ directory should exist', () => {
        const publicPath = path.join(projectRoot, 'public');
        const exists = fs.existsSync(publicPath);
        assert.strictEqual(exists, true, 'public/ directory should exist');
    });

    test('files from public/ should be copied to dist/', () => {
        const publicPath = path.join(projectRoot, 'public');
        const distPath = path.join(projectRoot, 'dist');

        // Check if public directory exists and has files
        if (!fs.existsSync(publicPath)) {
            assert.fail('public/ directory does not exist');
        }

        const publicFiles = fs.readdirSync(publicPath);

        // If there are files in public/, verify they're in dist/
        if (publicFiles.length > 0) {
            const distFiles = fs.readdirSync(distPath);

            // Check if at least some public files are in dist
            const copiedFiles = publicFiles.filter(file =>
                distFiles.includes(file)
            );

            assert.ok(
                copiedFiles.length > 0,
                `Files from public/ should be copied to dist/. Found ${copiedFiles.length} copied files.`
            );
        }
    });
});
