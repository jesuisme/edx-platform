# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Cohort(models.Model):
    name = models.CharField(max_length=200)


class Student(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    cohort = models.ForeignKey('Cohort')


class Facilitator(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    cohort = models.ForeignKey('Cohort')
