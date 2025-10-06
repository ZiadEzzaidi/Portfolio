# 🚀 Ziad Ez-Zaidi - Cloud & DevOps Portfolio

A modern, responsive portfolio showcasing cloud infrastructure and DevOps expertise, featuring automated CI/CD deployment to AWS S3.

## 🏗️ Architecture

- **Frontend**: Modern HTML5, CSS3, and Vanilla JavaScript
- **Hosting**: AWS S3 Static Website Hosting
- **CDN**: CloudFront (optional)
- **CI/CD**: GitHub Actions with multi-stage pipeline
- **Code Quality**: Automated linting and validation

## 🔄 CI/CD Pipeline

The project features a comprehensive 5-stage CI/CD pipeline:

### Stage 1: Code Validation & Quality Checks
- HTML validation with HTMLHint
- CSS validation with Stylelint
- JavaScript validation with JSHint
- Code formatting checks with Prettier
- Project structure validation

### Stage 2: Security & Performance Scan
- Security scan for sensitive data
- File size optimization checks
- Performance validation

### Stage 3: Build & Test
- Creates optimized build artifacts
- CSS minification (optional)
- Build validation and testing
- Artifact storage for deployment

### Stage 4: Deploy to AWS S3
- Automated deployment to S3 (main branch only)
- Cache optimization for static assets
- CloudFront invalidation (if configured)
- Environment-specific deployments

### Stage 5: Post-deployment Verification
- Health checks on deployed site
- Content verification
- Deployment success confirmation

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ (for development tools)
- Git
- AWS CLI (for manual deployments)

### Setup
```bash
# Clone the repository
git clone https://github.com/ZiadEzzaidi/Portfolio.git
cd Portfolio

# Install development dependencies
npm install

# Run local validation (optional)
npm run lint
npm run format
```

### Development Workflow
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test locally by opening `index.html` in a browser
4. Commit changes: `git commit -m "Your message"`
5. Push to GitHub: `git push origin feature/your-feature`
6. Create a Pull Request

## 🚀 Deployment

### Automatic Deployment
- **Main Branch**: Automatically deploys to production on push
- **Feature Branches**: Runs validation and testing only
- **Pull Requests**: Full validation pipeline runs

### Manual Deployment

#### 1. AWS CLI Setup
```bash
aws configure
# Enter your AWS credentials when prompted
```

#### 2. Create S3 Bucket
```bash
aws s3 mb s3://ziad-portfolio --region us-east-1
```

#### 3. Configure Static Website Hosting
```bash
aws s3 website s3://ziad-portfolio \
  --index-document index.html \
  --error-document index.html
```

#### 4. Apply Bucket Policy
```bash
aws s3api put-bucket-policy --bucket ziad-portfolio --policy file://policy.json
```

#### 5. Deploy Files
```bash
aws s3 sync . s3://ziad-portfolio \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --exclude "node_modules/*" \
  --delete
```

## ⚙️ Configuration

### GitHub Secrets Required
Set these in your GitHub repository settings:

```
AWS_ACCESS_KEY_ID       # AWS access key
AWS_SECRET_ACCESS_KEY   # AWS secret key  
AWS_REGION             # AWS region (e.g., us-east-1)
S3_BUCKET             # S3 bucket name
CLOUDFRONT_DISTRIBUTION_ID  # CloudFront ID (optional)
```

### Bucket Policy
The `policy.json` file contains:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::ziad-portfolio/*"
    }
  ]
}
```

## 🧪 Testing & Validation

### Code Quality Tools
- **HTMLHint**: HTML validation and best practices
- **Stylelint**: CSS linting with standard configuration
- **JSHint**: JavaScript validation and error detection
- **Prettier**: Code formatting consistency

### Run Validation Locally
```bash
# HTML validation
npx htmlhint index.html

# CSS validation  
npx stylelint css/*.css

# JavaScript validation
npx jshint js/*.js

# Format check
npx prettier --check "*.html" "css/*.css" "js/*.js"
```

## 📁 Project Structure
```
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
├── css/
│   └── style.css              # Main stylesheet
├── js/
│   └── main.js                # Main JavaScript
├── images/                    # Static images
├── index.html                 # Main HTML file
├── policy.json               # S3 bucket policy
├── .htmlhintrc              # HTML linting config
├── .stylelintrc.json        # CSS linting config
├── .jshintrc                # JS linting config
├── .prettierrc              # Code formatting config
└── README.md                # This file
```

## 🌐 Live Site

Portfolio is available at:
- **S3 Website**: http://ziad-portfolio.s3-website-us-east-1.amazonaws.com
- **Custom Domain**: (Configure Route53 + CloudFront if needed)

## 🔧 Advanced Features

### CloudFront CDN (Optional)
1. Create CloudFront distribution pointing to S3 bucket
2. Add `CLOUDFRONT_DISTRIBUTION_ID` to GitHub secrets
3. Pipeline will automatically invalidate cache on deployment

### Custom Domain (Optional)
1. Purchase domain in Route53
2. Create CloudFront distribution with custom domain
3. Configure SSL certificate with ACM
4. Update DNS records

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Load Time**: < 2 seconds
- **Global CDN**: CloudFront for worldwide performance
- **Optimized Assets**: Minified CSS, optimized images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Apply policy:

```bash
aws s3api put-bucket-policy --bucket ziad-portfolio --policy file://policy.json
```

## Access Your Website

Your portfolio is now live at:
http://ziad-portfolio.s3-website-us-east-1.amazonaws.com

## Troubleshooting

- **ACL Errors**: Modern S3 buckets block ACLs by default - use bucket policies instead
- **403 Forbidden**: Verify bucket policy is correctly applied
- **404 Errors**: Check index document configuration

## Next Steps

- Add CloudFront CDN for better performance
- Configure custom domain with Route53
- Set up CI/CD pipeline
