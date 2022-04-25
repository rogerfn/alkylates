# -*- coding: utf-8 -*-
"""
Created on Sun Apr 10 15:50:48 2022

@author: hufnaglm
"""


import numpy as np


def str2nan(x):
    """
    converts a string into a nan if it cannot be converted to a float
    Parameters
    ----------
    x : TYPE
        DESCRIPTION.

    Returns
    -------
    TYPE
        DESCRIPTION.

    """
    try:
        float(x)
        return x
    except:
        return np.nan

    
    