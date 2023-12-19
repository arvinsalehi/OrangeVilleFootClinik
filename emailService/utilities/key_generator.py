import os


def generate_random_secret_key(length=24):
    """
    Generate a random secret key.

    Parameters:
    - length: Length of the secret key. Default is 24.

    Returns:
    - str: Random secret key.
    """
    return os.urandom(length).hex()
