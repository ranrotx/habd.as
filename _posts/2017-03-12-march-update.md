---
title:  "March Update"
date:   2017-03-12
categories: career, personal
comments: true
---

I haven't been very dilligent about keeping this blog up to date. I figured I'd provide a quick update on what I've been doing so far in 2017.

## Career

For those that don't follow me on LinkedIn, I recently accepted an internal transfer to a Solutions Architect position here at AWS in Dallas. Moving into an architect role has been a long-term goal of mine, so I'm excited at this new opportunity. I've already started working on some internal content and will be working with Enterprise Customers in the Dallas area very shortly.

## Crossfit

This past February, my company had our annual internal conference in Las Vegas. I got to drop in at one of my favorite boxes when traveling, [Crossfit Max Effort](http://maxeffort.fitness/). It was also great to have two other co-workers who do Crossfit to join me. We had a great time and hope to do it again next year.

## Home IT

I've got several projects on the backlog and have completed a few. I recently did a memory upgrade to my NAS server to bring it up to 32GB of RAM. My next project will involve an ELK stack running under Docker on a VM on the NAS server. The goal for this is to start ingesting syslog and netflow data from the Edgerouter. Once logging is in place from the Ubiquiti Edgerouter, I plan on re-enabling VPN for myself back to my home network.

Other projects:

- Configure network monitoring for the cable modem. I've been getting reports of my connection dropping between my Ubiquiti access points and the cloud controller. My plan is to write a script that runs on the Edgerouter and publish metrics to [CloudWatch](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html). Then I can use a CloudWatch alarm to alert when the connection goes down.
- Set up a home Plex server (yeah, I know I'm late to the game on this).
- Build an iCal parser. My goal for this is to have a service that can poll an [iCal feed (TripIt)](https://www.tripit.com/uhp/calendarsync) and generate a notification whenever anything new is added to the feed. I did some initial research and was able to find a parser in Python, however nothing that can take care of the full use case including detecting changes and notifying.
- Big Data: This is a long-term goal to get stronger in this space. I need an interesting project here.
- Create a CI/CD pipeline to automate the generation of the blog HTML and publishing to S3.

