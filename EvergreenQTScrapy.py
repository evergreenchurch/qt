#!/usr/bin/python
#-*- coding: utf-8 -*-
"""

Web scrapy for gathering the qt schedule data from the evergreen church web page

"""
import os, sys, re
import urllib2
import datetime
from bs4 import BeautifulSoup

# Korean to English translations for bible books 
BookNames = {
    '벧전': '1 Peter',
    '벧후': '2 Peter',
    '요일': '1 John',
    '요이': '2 John',
    '요삼': '3 John',
    '유다': 'Jude',
    '요한': 'Revelation'
}

# QT schedule [date, Book name in English + reading scope]
QTSchedule = {} 

# Target link 
evergreen_url = "http://www.evergreenpromising.org/devotional/"


page = urllib2.urlopen(evergreen_url)
soup = BeautifulSoup(page, "lxml")

entries = soup.find_all("p")
entries_length = len(entries)

# remove the header and 2 lines of footer from the qt schedule 
entries = entries[1:entries_length-2]

for entry in entries:
    uentry = entry.text
    uentry = re.sub(ur'%s'%unichr(0x00A0), u' ', uentry)
    itemA = uentry.encode('utf-8').strip().split()
    day_column = re.sub(r'(\d+)/(\d+)/.*', r'\1-\2-', itemA[0])
    day_column = day_column + str(datetime.datetime.now().year) # append current year
    mm = re.match(r'([^\d]+)(\d.*)$', itemA[1])

    if mm:
        book_name = mm.group(1)
        chap_sect = mm.group(2)
    else:
        print 'WARNING: illegal format %s' % entry
        continue
    if not BookNames.has_key(book_name):
        print "dictionary needs to be updated: missing key " + book_name
	
    QTSchedule[day_column] = BookNames[book_name] + " " + chap_sect

# print the final result 
for new_date, new_val in QTSchedule.iteritems():
    print new_date + " " + new_val
