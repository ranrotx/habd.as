---
title:  "Monitoring for Edgerouter"
date:   2017-03-26
categories: homeit, ubnt, edgerouter
comments: true
---

I've recently been having some issues where I suspect my cable modem at home is going offline a decent amount of the time. However, without robust monitoring I don't know the frequency or duration of these outages. I decided to put some monitoring on my Edgerouter Lite to push a simple custom metric to [AWS CloudWatch](https://aws.amazon.com/cloudwatch/) so that I can set up alarms to notify me as well as graph historical data.

Head over to my [Github project](https://github.com/ranrotx/edgerouter-cloudwatch) to check it out.
