# Deployment Guide

## 🚀 Automated Deployment (Recommended)

The portfolio automatically deploys to AWS S3 via GitHub Actions when you push to the main branch.

### Required GitHub Secrets

Set these in your repository settings → Security → Secrets and variables → Actions:

- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- `AWS_REGION` - AWS region (e.g., us-east-1)
- `S3_BUCKET` - S3 bucket name (e.g., ziad-portfolio)
- `CLOUDFRONT_DISTRIBUTION_ID` - (Optional) CloudFront distribution ID

### Deployment Pipeline

1. **Code Validation** - HTML, CSS, JS linting
2. **Security Scan** - Check for sensitive data
3. **Build & Test** - Create optimized build
4. **Deploy to S3** - Sync files to AWS S3
5. **Verification** - Health checks and validation

## 🛠️ Manual Deployment

### Prerequisites

1. **Install AWS CLI**
   ```bash
   aws configure
   # Enter your AWS credentials
   ```

2. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://ziad-portfolio --region us-east-1
   ```

3. **Configure Static Website Hosting**
   ```bash
   aws s3 website s3://ziad-portfolio \
     --index-document index.html \
     --error-document index.html
   ```

### Deploy Files

```bash
# Basic deployment
aws s3 sync . s3://ziad-portfolio \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --exclude "node_modules/*" \
  --exclude "config/*" \
  --exclude "docs/*" \
  --delete

# With cache optimization
aws s3 sync . s3://ziad-portfolio \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.json" \
  --delete

aws s3 sync . s3://ziad-portfolio \
  --cache-control "no-cache, no-store, must-revalidate" \
  --include "*.html" \
  --include "*.json"
```

### Apply Bucket Policy

```bash
aws s3api put-bucket-policy --bucket ziad-portfolio --policy file://deployment/policy.json
```

## 🌐 CloudFront Setup (Optional)

1. **Create CloudFront Distribution**
   - Origin: Your S3 bucket website endpoint
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Compress Objects Automatically: Yes

2. **Configure Custom Domain (Optional)**
   - Add CNAME record in Route53
   - Configure SSL certificate with ACM

3. **Invalidate Cache on Deployment**
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```

## 🔍 Verification

After deployment, verify:

1. **Site Accessibility**
   ```bash
   curl -I http://ziad-portfolio.s3-website-us-east-1.amazonaws.com
   ```

2. **Content Validation**
   - Check all pages load correctly
   - Verify images and assets load
   - Test responsive design on mobile

3. **Performance Check**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Verify CDN performance

## 🚨 Troubleshooting

### Common Issues

1. **403 Forbidden Error**
   - Check bucket policy is applied
   - Verify public read access

2. **404 Not Found**
   - Ensure index.html exists
   - Check static website hosting configuration

3. **CloudFront Issues**
   - Clear browser cache
   - Invalidate CloudFront distribution
   - Check origin settings

### Debug Commands

```bash
# Check bucket policy
aws s3api get-bucket-policy --bucket ziad-portfolio

# List bucket contents
aws s3 ls s3://ziad-portfolio --recursive

# Check website configuration
aws s3api get-bucket-website --bucket ziad-portfolio
```