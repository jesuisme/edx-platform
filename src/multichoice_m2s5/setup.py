"""Setup for multichoice_m2s5 XBlock."""

from __future__ import absolute_import

import os

from setuptools import setup


def package_data(pkg, roots):
    """Generic function to find package_data.

    All of the files under each of the `roots` will be declared as package
    data for package `pkg`.

    """
    data = []
    for root in roots:
        for dirname, _, files in os.walk(os.path.join(pkg, root)):
            for fname in files:
                data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}


setup(
    name='multichoice_m2s5-xblock',
    version='0.1',
    description='multichoice_m2s5 XBlock',   # TODO: write a better description.
    license='UNKNOWN',          # TODO: choose a license: 'AGPL v3' and 'Apache 2.0' are popular.
    packages=[
        'multichoice_m2s5',
    ],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'multichoice_m2s5 = multichoice_m2s5:MultichoiceM2S5XBlock',
        ]
    },
    package_data=package_data("multichoice_m2s5", ["static", "public"]),
)
