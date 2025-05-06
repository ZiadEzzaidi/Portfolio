# AWS S3 Static Website Deployment Guide

## Deployment Steps

### 1. AWS CLI Setup

```bash
aws configure
# Enter your AWS credentials when prompted
```

### 2. Create S3 Bucket

```bash
aws s3 mb s3://ziad-portfolio --region us-east-1
```

### 3. Configure Static Website Hosting

```bash
aws s3 website s3://ziad-portfolio \
  --index-document index.html \
  --error-document index.html
```

### 4. Upload Files

```bash
aws s3 sync . s3://ziad-portfolio \
  --exclude ".git/*" \
  --exclude ".vscode/*"
```

### 5. Set Bucket Policy

Create `policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::ziad-portfolio/*"
    }
  ]
}
```

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
