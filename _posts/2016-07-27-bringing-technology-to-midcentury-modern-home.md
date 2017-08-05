---
title:  "Bringing Technology to a Midcentury Modern Home"
date:   2016-07-30
categories: AWS, wifi, cloudformation, ansible
comments: true
---

Those of you know me know that I am passionate about technology. In fact, I like to apply a lot of the technology principles in enterprise IT to technology at my house. We also recently purchased a 1950s midcentury modern house that had been renovated in 2012 and this has provided me with a playground for home IT projects.

## Internet Connectivity
For Internet connectivity, my acceptable options were limited. At our previous apartment, we had AT&T's Gigapower service where we got 300mbps up and down. I would have liked to keep my fiber-based service from AT&T, but evidently the neighborhood we bought our house in appears to be stuck with what seems like U-verse speeds that may have been considered fast in 2006.

Fortunately, Time Warner has kept up with the times and we were able to get a package with 300mbps down, 30mbps up. Another nice benefit to Time Warner is that we're able to purchase our own modem and save about $10 a month on the TWC bill by not having to rent their modem. I actually like this better since I was able to purchase a simple modem (basically a bridge) without all of the extras like NAT and wireless. AT&T's modem is a pain to configure in that it's almost impossible to turn off the NAT functionality.

## The Firewall
From the cable modem, traffic enters my firewall appliance which is [pfSense](https://pfsense.org/) installed on an SD card in an appliance similar to [this one](http://netgate.com/products/sg-2220.html). I built this about a year ago and it has been very trouble-free.

The pfSense distribution is a versatile firewall implementation and implements a lot of enterprise-grade features. One of the most helpful things it implements is VLAN tagging. This is how I'm able to have a separate guest VLAN that only gets Internet access.

## The NAS
I'm still using the FreeNAS server that I built as described in my [backup strategy]({% post_url 2016-01-08-backup-strategy %}) post. FreeNAS is capable of running BSD-based jails (think containers) and I was using a container to run the controller software for my wireless network (more on that later). However, a recent upgrade to the controller software broke the implementation since it required new dependencies that weren't satisfied in BSD.

For now, the NAS is used as a local file server that is backed up to S3. I'm currently exploring [bhyve](http://bhyve.org/) on FreeNAS as a hypervisor. I've successfully installed a Ubuntu VM for the purposes of doing [iperf3](https://iperf.fr/) speed tests to stress my local wireless network.

## The Wifi
My wireless network is based on access points from [Ubiquiti](https://www.ubnt.com/). Prior to the house, I started out with a single UAP-AC (which has since been discontinued) and the controller software running as a jail on FreeNAS. Moving into the house, we've found that a single AP in my office closet (aka the server room or wiring closet) isn't enough to cover this house. Specifically, we find that wifi on our iPhones suffers in the master bedroom. In an effort to fix this, I'm going to be deploying a second AP in the guest bedroom closet.

In order to do this deployment, I'm going to be running a Cat5e cable underneath the house through the crawlspace. I've never worked in a crawlspace before but it should be fun. Unfortunately, there is no crawlspace under the master bedroom (it is a converted garage) so the closest closet that makes sense is the guest bedroom. The nice thing about the Ubiquiti gear is that it is enterprise-grade and supports power over Ethernet (PoE) so I don't have to worry about having power in that closet.

The controller software is now running on an AWS EC2 Reserved Instance in the cloud. I've modeled the whole deployment using CloudFormation and Ansible, and I hope to publish this work soon once I tidy up the code. The nice thing about Ubiquiti is it supports this kind of cloud-based controller. All I have to do is set a DNS entry for the "unifi" hostname on my local network and point it to the Elastic IP of my cloud-based controller. Then, any new access points on my network will phone home to the controller where I can choose to adopt them and push configuration.

## Conclusion
That's my configuration in a nutshell. I can only imagine what the original 1950s builder and owners would think if they saw this kind of technology in a midcentury modern home. Please feel free to post any questions you have about this implementation in the comments section below--I know I covered this all pretty briefly but I'll be glad to go in-depth where needed.