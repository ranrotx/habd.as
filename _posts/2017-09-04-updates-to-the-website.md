---
title: Updates to the Website
author: Ronnie Eichler
date: 2017-09-04
excerpt: A brief update on the development and hosting of this site.
categories: [updates]
tags: [aws, jekyll, https]
header:
  overlay_image: code.jpg
  overlay_filter: 0.5
  teaser: laptop-teaser.jpg
---

The last several months have been busy here. However, I have accomplished a long-running task which has been to update my personal website. I've also integrated some other AWS services into the workflow which I'll go into more detail as well.

## New Jekyll Theme

For those of you that don't know, this website is powered by [Jekyll](https://jekyllrb.com/), which is a Ruby gem that generates fully-functional static websites. The beauty of static websites is that they cost next to nothing to host. In fact, this site is entirely hosted on AWS [S3](https://aws.amazon.com/s3/) and [CloudFront](https://aws.amazon.com/cloudfront/) (more on that later). S3 has a generous [free tier](https://aws.amazon.com/s3/pricing/) so it's entirely possible to host this site for just the cost of a domain registration.

When you host a static website on S3, there is no server to manage. The downside to this is that blog content management systems such as Wordpress can't run on S3. The good news is that with no server to manage, the vulnerability surface of a static website is very minimal--there is no software to patch. However, it would be very tedious to have to author HTML for every site page and ensure consistent formatting. This is where Jekyll comes in.

With Jekyll, all of the content is written in [Markdown](https://en.wikipedia.org/wiki/Markdown). I've been using Markdown personally for at least the past 5 years. I actually started out using it for note taking (since I grew frustrated with Word and it wanting to 2nd-guess my formatting). The beauty of Markdown is that it allows my ideas to easily flow to the keyboard and screen without having to stop and worry about formatting. If I do want to do formatting, the syntax is pretty easy and it's all keyboard-driven.

I've made it a goal to start developing more content such as this. The thing I quickly realized is that while the default Jekyll theme was OK, it came across as pretty basic. In my search for themes, I came across [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/). I liked this theme (I can't honestly remember why I didn't use it), and in researching other themes I ran across [Josh Habdas](https://habd.as/) and his site. He's made a lot of additions to the Minimal Mistakes theme and it was more ready-made for what I needed. Using his [code](https://github.com/jhabdas/habd.as) on Github, I forked it and set about modifying it for my use (you can see my code [here](https://github.com/ranrotx/ronnieeichler-site)).

## New AWS Services

The static content for this site has always been hosted on AWS S3. Recently, there has been a community effort to see more websites enabled as HTTPS. S3 does have the ability to host static websites directly, however it does not support HTTPS. However, we can easily accomplish this by putting CloudFront (AWS's CDN) in front of S3. AWS also has [Certificate Manager](https://aws.amazon.com/certificate-manager/) which provides SSL/TLS certificates and is integrated with CloudFront. All you have to do is confirm ownership of your domain and AWS will take care of provisioning and updating the certificate for you on CloudFront.

![AWS CloudFront and S3 Architecture]({{ site.url }}/images/CloudFrontS3Architecture.png)

## Future Work

Now that the website has a new look and feel, my next focus will be on improving the operations of the site. My next near-term goal will be to build a CI/CD pipeline using AWS CodeBuild to take the content changes that get committed to Github, run Jekyll to build the static site, run a validation (to check for dead links, etc.), and push to S3.

There's also probably a few other loose ends here and there. I'm sure I'll come across them sooner or later. Let me know your thoughts and if you are curious about how I'm using any of the services mentioned above.
