"""Setup for quesrespmodule7sec4xblock XBlock."""

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
    name='quesrespmodule7sec4xblock-xblock',
    version='0.1',
    description='quesrespmodule7sec4xblock XBlock',   # TODO: write a better description.
    license='UNKNOWN',          # TODO: choose a license: 'AGPL v3' and 'Apache 2.0' are popular.
    packages=[
        'quesrespmodule7sec4xblock',
    ],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'quesrespmodule7sec4xblock = quesrespmodule7sec4xblock:QuesRespModule7Sec4XBlock',
        ]
    },
    package_data=package_data("quesrespmodule7sec4xblock", ["static", "public"]),
)
