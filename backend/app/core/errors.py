class AppError(Exception):
    pass


class ConfigurationError(AppError):
    pass


class StorageError(AppError):
    pass
