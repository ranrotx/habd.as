---
title:  "My backup strategy"
date:   2016-01-08
categories: Disaster Recovery, Home IT, FreeNAS, S3, Glacier
comments: true
---

Having been working in IT almost all of my adult life, I have come to appreciate the importance of a solid backup and recovery strategy. While it would be easy to stick it in the cloud using something like Dropbox or Google Drive, I've been around long enough to know that there is still value in having data in a location that you truly have control over.

I've seen formats get abandoned and leading vendors' products languish over time. Also, with the proliferation of different cloud services for different needs (Dropbox for files, Evernote for notes, etc.), you can easily end up with your data scattered to the wind. My approach embraces standards, minimizes cost, and allows me to retain control over my data (for the most part).

There are three guiding principles to my backup strategy:

1. Maintain at least 3 copies of data (two copies on-site, one copy offsite).
2. Strive for open standards and formats.
3. Have a plan in place for what to do in case one of your copies fails and needs to be rebuilt.

Keeping the above in mind, it's helpful to categorize your data. Mine is as follows:

1. Working documents that change frequently. I will store the current year and 1-2 years' of previous documents in Dropbox.
2. Media files. These tend to be large and don't change as frequently. When working on these, they are on my laptop. When done, they are moved to my NAS (more on that later).
3. Full system backups of my workstations. For these, I use Time Machine to the NAS.

## Working Documents

These are files that change often. Also, it is handy to be able to access them remotely. For these files, I am comfortable using Dropbox as the primary location on my laptop. However, I'm mindful to only keep about two years' worth of working documents on Dropbox.

Why? Keeping two years worth of data (current year and previous) forces me remain within the free tier of Dropbox. Also, as a non-paying customer, I really have no recourse against Dropbox in the event there were to be an issue with their service.

Don't get me wrong--Dropbox is a valuable service that is very useful for a lot of people (myself included). However, being an IT professional I highly value my data and still feel the need to exercise control over it. Any file in my home folder on my laptop (Dropbox included) get rsync'ed periodically to my NAS. So now I am up to 2 copies of data that I control (Laptop and NAS). Dropbox provides an extra copy (3 if it has been rsync'ed, 2 if it hasn't yet).

## Media Files

The bulk of my media files (if not all) mainly reside on my NAS. I will usually start out with working copies on my laptop that are then rsync'ed to the NAS and periodically updated. When I'm done with my edits, the working copies from the laptop are deleted to free up space and I remain with the NAS-based copies.

## Full System Backups

Since I run OSX, I'm utilizing Time Machine backups to a network volume hosted on my NAS. Nothing special here--it's been pretty solid except for one case where I had to rebuild the Time Machine volume. This seems to [occur](https://discussions.apple.com/thread/3684176?tstart=0) for some people with decent frequency. Thankfully, with ZFS-based snapshots on my NAS (more on that in a minute), if it does occur I can roll-back the volume to a state without corruption and hopefully resume backups.

## My NAS

Ah, the part that I'm most proud of. Originally, I had intended to use a Drobo for this, but it proved too limiting (limited ecosystem of 3rd party plug-ins you could run). Also, I wasn't comfortable with the fact that it ran a proprietary RAID/filesystem on the disks. This would likely mean that in the event of hardware failure, I'd have to purchase another Drobo to be able to read the data off of my disks.

I evaluated three different solutions for the NAS:

1. Run my own NAS on top of [SmartOS](https://smartos.org/).
2. Use a distribution such as [FreeNAS](http://www.freenas.org/).

I settled on [FreeNAS](http://www.freenas.org/) as it had the best combination or community support, functionality, and ease of getting started. For those that aren't familiar, FreeNAS is the basis for a larger enterprise-based NAS offering sold by [iXsystems](https://www.ixsystems.com/). As far as I can tell, FreeNAS is very capable and I don't know what else I would want--it really does feel almost enterprise grade (and likely overkill for your average home user). However, I am not your average home user.

Probably the biggest attraction to FreeNAS is the fact that it uses ZFS (which is extremely well suited to data protection and redundancy). In the event of problems with my hardware, I should expect to be able to import the disks for the zpool (more ZFS-speak) using a FreeBSD-based OS and read the data back. Also, FreeNAS (the OS portion) is capable of being installed and booted from a USB flash drive, which allows me to dedicate all of the space on my physical disks to acual data storage.

The FreeNAS server is also capable of doing something that the Drobo wasn't (at least without a lot of work): Running 3rd party workloads. FreeNAS (since it's based on FreeBSD) supports jails (which is basically container-based virtualization but for BSD). I'm able to run a jail and run my own processes inside of that jail, independent of the NAS OS. FreeNAS is capable of presenting mountpoints to the jail and this is what I use to enable offsite backups from the NAS to AWS S3.

## Offsite Backups

For my offsite backups, initially I was running Crashplan inside of a jail. However, I noticed that over time the Crashplan Java backup daemon would start to consume a lot of memory. This was a concern, since the memory used by the jails reduces the available amount of memory for FreeNAS. In the end, I decided to replace Crashplan and manage my own backups to Amazon S3 after doing a cost/benefit analysis.

To manage the backups to S3, I stumbled across [Duply](http://duply.net/) which is a frontend to [Duplicity](http://duplicity.nongnu.org/). This is the tool that I use to do full and incremental backups of my working files (documents that change frequently) to S3.

For files that don't change (photos, movies, etc.), I'm just doing a sync to S3 using the AWS CLI to an S3 bucket location that has a lifecycle policy to archive to Glacier. These files are the bulk of my storage usage and my expectation is that I'll only have to retrieve them from Glacier in the event of a catastrophic event.

## Summary

I know that a lot of this is high level. At some point, I may do into more depth on the particulars of how or why I made certain decisions. Let me know via the comments if there is anything you'd be interested in knowing more about.

