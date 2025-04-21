# Changelog

## [1.3.0] - 2025-04-21

### Added

- Option: `colors` which defines whether to enable or disable default colors or use custom color schemes

## [1.2.0] - 2025-04-20

### Added

- Option: `writer` a `Writer`-compatible class that handles the output functionality
- new writer option: `ConsoleWriter`
- new writer option: `FileWriter`

## [1.1.1] - 2025-04-19

### Fixed

- printing issue

## [1.1.0] - 2025-04-19

### Added

- Option: `host` which includes the host as passed by user in the output of urls
- `FastifyRoutePrinter` class unit tests

### Removed

- test and test-related files from published version

## [1.0.0] - 2025-04-12

### Added

- Option: `sortRoutes` function that can be used to sort routes
- Default `sortRoutes` function
- Option: `filterRoutes` function that can be used to filter out routes
- Option: `disabled` that can be used to opt-in disable the plugin
- Option: `printer` a `Printer`-compatible class that handles the print functionality
- `TablePrinter` unit tests
- Documentation section to README

### Changed

- Default table look

## [0.1.0] - 2025-04-01

### Added

- Minimal plugin functionality
- `Printer` interface and `TablePrinter` implementation
- TS config
- ESLint
- Prettier
- Github publish workflow
- Publish helper script
- LICENSE file
- README file
- CHANGELOG file
