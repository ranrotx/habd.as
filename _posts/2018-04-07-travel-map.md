---
title: Travel map
author: Ronnie Eichler
date: 2018-04-07
excerpt: A modern take on the travel map
categories: [personal]
tags: [personal, travel]
author_profile: true
comments: true
share: true
featured: true
header:
    overlay_image: travelmap.jpg
    overlay_filter: 0.2
    teaser: travel-teaser.jpg

---
A lot of people are probably familiar with the travel maps that people have on their wall. You know, the ones with push pins in all of the locations that they've visited? I decided to take this idea and make the modern-day equivalent for my website.

{% include travels.html %}

I always thought these kind of maps were cool. It was interesting when I'd come across these since it was inspiring seeing the types of places that my friends have visited. However, I never got around to creating one for myself. Now that I'm older, the question is more of what would I put on my travel map. I decided to focus on places where I've spent a meaningful amount of time (no, connecting airports or places I've driven though don't count).

## A map for the modern era

My motivation for creating this was to take advantage of web technologies and the APIs provided by [Mapbox](https://www.mapbox.com/developers/). Mapbox is a mapping technology company (running on AWS as well). I've gotten plenty of exposure to the work that they do since I get to hear about the work they do from an AWS perspective. I decided to use their Javascript [library](https://www.mapbox.com/mapbox-gl-js/api/) to embed an interactive map on my site.

Getting a working proof of concept up and running with the Mapbox API was pretty easy--the hardest part was integrating it with Jekyll (more on that later). Mapbox was very easy to work with--you can either use their website or [http://geojson.io/](http://geojson.io/) to build a [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) file with all of your places/coordinates:

      {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "place_name": "Madrid, Spain"
            },
            "geometry": {
              "coordinates": [
                -3.703269,
                40.417321
              ],
              "type": "Point"
            }
          }
        ]
      }

After that is done, you embed the map in your HTML. I did this in Jekyll by using an [include](https://github.com/ranrotx/ronnieeichler-site/blob/master/_includes/travels.html). This worked great on my laptop in development, but I kept running into problems every time I would publish. After a lot of troubleshooting, I discovered that the culprit was the Jekyll HTML compression that was set up for the production stage. The issue was that compression would remove all of the whitespace (including newlines). This was causing issues for any Javascript comments embedded in a `<script>` tag. The fix was to change single line comments (those with `//`) to use the block-style comments. Once I did this, the page rendered properly.

## Keeping it up to date

The beauty of this setup is that the only thing I need to do to keep the map updated is to update the GeoJSON [file](https://github.com/ranrotx/ronnieeichler-site/blob/master/resources/travels.geojson?short_path=ec4c418). Once this file is live on the site, the map will be updated automatically. I can also include additional metadata--at some point in the future I may link these pages to photo albums from my travels.

I'm sure that I may have missed a few locations--I'll fill those in as I remember by adding new locations to the JSON file. In the meantime, I'd love to hear your thoughts below or if you've done something similar.
