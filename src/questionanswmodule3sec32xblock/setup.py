"""Setup for questionanswmodule3sec32xblock XBlock."""

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
    name='questionanswmodule3sec32xblock-xblock',
    version='0.1',
    description='questionanswmodule3sec32xblock XBlock',   # TODO: write a better description.
    license='UNKNOWN',          # TODO: choose a license: 'AGPL v3' and 'Apache 2.0' are popular.
    packages=[
        'questionanswmodule3sec32xblock',
    ],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'questionanswmodule3sec32xblock = questionanswmodule3sec32xblock:QuesAnswModule3Sec32XBlock',
        ]
    },
    package_data=package_data("questionanswmodule3sec32xblock", ["static", "public"]),
)
