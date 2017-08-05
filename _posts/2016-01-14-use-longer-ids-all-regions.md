---
title:  "Use longer AWS resource IDs in all regions"
date:   2016-01-14
categories: AWS, bash, scripting
comments: true
---

Today, AWS [announced](https://aws.amazon.com/blogs/aws/theyre-here-longer-ec2-resource-ids-now-available/) that it is now possible to opt-in to receiving EC2 instance and reservation IDs in a longer format. Unfortunately, there is not an easy way at this time to do this across an entire account--the change must be applied in every region.

While this is good for testing purposes (you can designate one region you don't use for product to test), doing this for all regions via the console can be a tedious process. Also, there is a caveat that if you do this via an IAM user, the change is only for the current user (again, I can see some pros to this, but also some cons in that the change may not be consistent for all of your users).

To counteract this, I wrote a simple [script](https://gist.github.com/ranrotx/9b2839b9a3b2dbc04bc8) today to do this for all regions.

My recommendation would be to run this script on an EC2 instance that has an IAM role that allows permissions to make the API calls to EC2. Why? For consistency, the only two methods that will apply the setting for the entire account in a region is either via an IAM role or the root user. It's not recommended to use root credentials for normal access (I would strongly recommend not even generating an access key/secret key combination for the root account). Based on this, I feel that the EC2 instance running an IAM role is the best option.

Here's the script:

{% gist ranrotx/9b2839b9a3b2dbc04bc8 %}

As you can see, the first thing the script does is get a list of regions. Then, for each region it sets the flag to use long IDs for both the instance resource type and the reservation resource type. You can modify the script to do either or both. In the future, you may need to make other modifications when other resource types transition to longer IDs.

Also know that the script is expected to run using credentials in the default location for the CLI. If the CLI will eventually default to using temporary credentials on an EC2 instance running an IAM role (which is what we want).