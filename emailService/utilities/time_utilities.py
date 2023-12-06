"""
    Module containing time utilities that are needed for this service
"""

from datetime import datetime, timedelta
# import pytz


def get_time_range_str(tz='America/Toronto', time_range=10):
    """
    Getting the time based on %Y-%m-%dT%H:%M:%SZ format
    :param tz:
    :param time_range:
    :return:
    """

    # use this to get the datetime based on local server
    # local_tz = pytz.timezone(tz)
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(hours=time_range)
    start_time_str = start_time.strftime('%Y-%m-%dT%H:%M:%SZ')
    end_time_str = end_time.strftime('%Y-%m-%dT%H:%M:%SZ')
    return start_time_str, end_time_str
